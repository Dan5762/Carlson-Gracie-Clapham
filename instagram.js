/*
 * Instagram feed - Carlson Gracie Clapham
 * =======================================
 *
 * Renders the gym's latest Instagram posts into #instagram.
 *
 * SOURCE
 * ------
 * instagram.json in this repo, refreshed daily by the "Sync Instagram feed"
 * GitHub Action (.github/workflows/instagram-feed.yml). The images it points
 * at are committed alongside it under images/instagram/.
 *
 * Nothing here talks to Instagram or any third party at runtime: it is a
 * same-origin fetch of a small JSON file, so there are no view limits, no
 * third-party script, no cost, and the CSP stays at 'self'.
 *
 * See INSTAGRAM.md for the one-off setup.
 *
 * If the manifest is missing, empty or unreadable, the grid stays hidden and
 * the section falls back to the "Follow us on Instagram" button already in the
 * markup - so the section is never broken, just quieter.
 *
 * Captions are inserted with DOM text APIs (never innerHTML), so caption text
 * cannot inject markup.
 */

(function () {
	"use strict";

	var DEFAULT_SOURCE = "instagram.json";
	var FETCH_TIMEOUT_MS = 8000;
	var DEFAULT_LIMIT = 8;

	function init() {
		var container = document.querySelector(".instagram-feed");
		if (!container) return;

		var source = (container.getAttribute("data-feed-src") || "").trim() || DEFAULT_SOURCE;

		var limit = parseInt(container.getAttribute("data-post-limit"), 10);
		if (!limit || limit < 1) limit = DEFAULT_LIMIT;

		fetchFeed(source)
			.then(function (data) {
				var posts = extractPosts(data).slice(0, limit);
				if (!posts.length) return;
				render(container, posts);
			})
			.catch(function () {
				/* Not generated yet, offline or malformed - keep the fallback. */
			});
	}

	function fetchFeed(source) {
		var options = {};
		var controller = null;
		var timer = null;

		if (typeof AbortController === "function") {
			controller = new AbortController();
			options.signal = controller.signal;
			timer = setTimeout(function () {
				controller.abort();
			}, FETCH_TIMEOUT_MS);
		}

		return fetch(source, options)
			.then(function (response) {
				if (timer) clearTimeout(timer);
				if (!response.ok) throw new Error("Manifest responded " + response.status);
				return response.json();
			})
			.catch(function (error) {
				if (timer) clearTimeout(timer);
				throw error;
			});
	}

	function extractPosts(data) {
		if (Array.isArray(data)) return data;
		if (data && Array.isArray(data.posts)) return data.posts;
		return [];
	}

	/* Each manifest entry carries one locally committed square webp. */
	function pickImage(post) {
		if (!post.image) return null;
		return { mediaUrl: post.image, width: post.width, height: post.height };
	}

	function altFor(post) {
		var caption = (post.caption || "")
			.replace(/\s+/g, " ")
			.trim();

		if (!caption) return "Instagram post from Carlson Gracie Clapham";
		if (caption.length > 120) return caption.slice(0, 117).trim() + "…";
		return caption;
	}

	function badgeFor(mediaType) {
		if (mediaType === "VIDEO") {
			return {
				label: "Video",
				path: "M8 5v14l11-7z"
			};
		}
		if (mediaType === "CAROUSEL_ALBUM") {
			return {
				label: "Multiple photos",
				path: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2z"
			};
		}
		return null;
	}

	function buildTile(post) {
		var image = pickImage(post);
		if (!image) return null;

		var link = document.createElement("a");
		link.className = "instagram-tile";
		link.href = post.permalink || "https://www.instagram.com/carlsongracieclapham";
		link.target = "_blank";
		link.rel = "noopener noreferrer";

		var img = document.createElement("img");
		img.src = image.mediaUrl;
		img.alt = altFor(post);
		img.loading = "lazy";
		img.decoding = "async";
		// Explicit dimensions where the feed supplies them, to avoid layout shift.
		if (image.width) img.width = image.width;
		if (image.height) img.height = image.height;
		link.appendChild(img);

		var badge = badgeFor(post.mediaType);
		if (badge) {
			var wrap = document.createElement("span");
			wrap.className = "instagram-tile-badge";

			var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			svg.setAttribute("viewBox", "0 0 24 24");
			svg.setAttribute("fill", "currentColor");
			svg.setAttribute("aria-hidden", "true");
			svg.setAttribute("width", "16");
			svg.setAttribute("height", "16");

			var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
			path.setAttribute("d", badge.path);
			svg.appendChild(path);

			var label = document.createElement("span");
			label.className = "visually-hidden";
			label.textContent = badge.label;

			wrap.appendChild(svg);
			wrap.appendChild(label);
			link.appendChild(wrap);
		}

		return link;
	}

	function render(container, posts) {
		var grid = document.createElement("div");
		grid.className = "instagram-grid";

		var added = 0;
		posts.forEach(function (post) {
			var tile = buildTile(post);
			if (tile) {
				grid.appendChild(tile);
				added++;
			}
		});

		if (!added) return;

		container.appendChild(grid);
		container.hidden = false;
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
})();
