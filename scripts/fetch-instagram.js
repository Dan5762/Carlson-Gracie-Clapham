#!/usr/bin/env node
/*
 * fetch-instagram.js
 * ==================
 *
 * Pulls the latest posts from the gym's Instagram account, saves a resized
 * copy of each image into images/instagram/, and writes instagram.json.
 *
 * Both outputs are committed to the repo by .github/workflows/instagram-feed.yml,
 * so the live site serves its own images and never talks to Instagram at
 * runtime. No view limits, no third-party script, no cost.
 *
 * Uses the Instagram API with Instagram Login (graph.instagram.com), which
 * needs a Business or Creator account but NOT a linked Facebook Page.
 *
 * Environment:
 *   IG_ACCESS_TOKEN  (required)  long-lived Instagram user access token
 *   IG_POST_LIMIT    (optional)  how many posts to pull, default 12, max 50
 *
 * Run locally with:  IG_ACCESS_TOKEN=... node scripts/fetch-instagram.js
 */

"use strict";

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const IMAGE_DIR = path.join(ROOT, "images", "instagram");
const MANIFEST = path.join(ROOT, "instagram.json");
const TILE_SIZE = 640; // Square tiles; 640 is comfortably retina for a ~280px slot.

const TOKEN = process.env.IG_ACCESS_TOKEN;
const LIMIT = Math.min(
	Math.max(parseInt(process.env.IG_POST_LIMIT || "12", 10) || 12, 1),
	50
);

if (!TOKEN) {
	console.error("IG_ACCESS_TOKEN is not set. Nothing to do.");
	process.exit(1);
}

/* The token is a credential - never let it reach stdout or a thrown URL. */
function redact(text) {
	return String(text).split(TOKEN).join("<token>");
}

async function fetchMedia() {
	const fields = [
		"id",
		"caption",
		"media_type",
		"media_url",
		"permalink",
		"thumbnail_url",
		"timestamp"
	].join(",");

	const url =
		"https://graph.instagram.com/me/media" +
		"?fields=" + fields +
		"&limit=" + LIMIT +
		"&access_token=" + encodeURIComponent(TOKEN);

	const response = await fetch(url);
	const body = await response.json().catch(function () {
		return {};
	});

	if (!response.ok) {
		var detail = body && body.error ? JSON.stringify(body.error) : String(response.status);
		throw new Error("Instagram API error: " + redact(detail));
	}

	return Array.isArray(body.data) ? body.data : [];
}

/*
 * Meta omits media_url when a post is flagged for copyright, and thumbnail_url
 * only exists on videos. Treat both as optional and skip anything unusable
 * rather than writing a broken tile.
 */
function sourceUrl(post) {
	if (post.media_type === "VIDEO") {
		return post.thumbnail_url || post.media_url || null;
	}
	return post.media_url || post.thumbnail_url || null;
}

/* First meaningful line, hashtags stripped - this becomes the img alt text. */
function pruneCaption(caption) {
	if (!caption) return "";

	const firstLine =
		caption
			.split("\n")
			.map(function (line) {
				return line.trim();
			})
			.filter(Boolean)[0] || "";

	const withoutTags = firstLine
		.replace(/#[\wÀ-ɏ]+/g, "")
		.replace(/\s+/g, " ")
		.trim();

	const text = withoutTags || firstLine.replace(/\s+/g, " ").trim();
	return text.length > 140 ? text.slice(0, 137).trim() + "…" : text;
}

async function ensureImage(post, url) {
	const relative = "images/instagram/" + post.id + ".webp";
	const file = path.join(ROOT, relative);

	// Post IDs are stable and the image never changes, so an existing file is
	// already correct. Skipping keeps daily runs cheap and the git diff clean.
	if (fs.existsSync(file)) return relative;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("Could not download media for " + post.id + ": " + response.status);
	}

	const buffer = Buffer.from(await response.arrayBuffer());
	await sharp(buffer)
		.resize(TILE_SIZE, TILE_SIZE, { fit: "cover", position: "attention" })
		.webp({ quality: 80 })
		.toFile(file);

	console.log("Downloaded " + relative);
	return relative;
}

/* Drop images for posts that have since been deleted or fallen off the feed. */
function pruneOldImages(keepIds) {
	let removed = 0;
	for (const name of fs.readdirSync(IMAGE_DIR)) {
		if (!name.endsWith(".webp")) continue;
		if (keepIds.has(name.replace(/\.webp$/, ""))) continue;
		fs.unlinkSync(path.join(IMAGE_DIR, name));
		removed++;
	}
	if (removed) console.log("Removed " + removed + " stale image(s).");
}

async function main() {
	fs.mkdirSync(IMAGE_DIR, { recursive: true });

	const media = await fetchMedia();
	console.log("Instagram returned " + media.length + " post(s).");

	const posts = [];
	for (const post of media) {
		const url = sourceUrl(post);
		if (!url) {
			console.warn("Skipping " + post.id + " - no usable media URL.");
			continue;
		}

		try {
			const image = await ensureImage(post, url);
			posts.push({
				id: post.id,
				permalink: post.permalink,
				mediaType: post.media_type,
				caption: pruneCaption(post.caption),
				timestamp: post.timestamp,
				image: image,
				width: TILE_SIZE,
				height: TILE_SIZE
			});
		} catch (error) {
			// One bad post must not sink the whole sync.
			console.warn("Skipping " + post.id + ": " + redact(error.message));
		}
	}

	if (!posts.length) {
		console.error("No usable posts. Leaving the existing feed untouched.");
		process.exit(1);
	}

	pruneOldImages(new Set(posts.map(function (post) {
		return post.id;
	})));

	const manifest = {
		generatedAt: new Date().toISOString(),
		profile: "carlsongracieclapham",
		posts: posts
	};

	fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
	console.log("Wrote instagram.json with " + posts.length + " post(s).");
}

main().catch(function (error) {
	console.error(redact(error.stack || error.message));
	process.exit(1);
});
