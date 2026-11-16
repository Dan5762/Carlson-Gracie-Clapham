#!/usr/bin/env node
/*
 * refresh-instagram-token.js
 * ==========================
 *
 * Instagram long-lived tokens expire after 60 days. Meta's refresh endpoint
 * issues a replacement good for another 60 days, but only while the current
 * token is still valid (and at least 24 hours old). Let one lapse and there is
 * no recovery - you have to go through the Meta app flow by hand again.
 *
 * So this runs on every sync: refresh the token, then write the new value
 * straight back into the IG_ACCESS_TOKEN repo secret.
 *
 * The new token is never printed. It is masked in the workflow log and handed
 * to `gh secret set` over stdin, so it does not appear in the process list or
 * in any log output.
 *
 * Environment:
 *   IG_ACCESS_TOKEN          (required)  current long-lived token
 *   GH_TOKEN                 (required)  PAT with "Secrets: Read and write"
 *   GITHUB_REPOSITORY        (required)  owner/repo, set by Actions
 *   IG_SKIP_TOKEN_REFRESH    (optional)  "true" to opt out entirely
 */

"use strict";

const { spawnSync } = require("child_process");

const TOKEN = process.env.IG_ACCESS_TOKEN;
const GH_TOKEN = process.env.GH_TOKEN;
const REPO = process.env.GITHUB_REPOSITORY;
const SECRET_NAME = "IG_ACCESS_TOKEN";

if (process.env.IG_SKIP_TOKEN_REFRESH === "true") {
	console.log("IG_SKIP_TOKEN_REFRESH is set - skipping. Refresh the token by hand before day 60.");
	process.exit(0);
}

if (!TOKEN) {
	console.error("IG_ACCESS_TOKEN is not set.");
	process.exit(1);
}

if (!GH_TOKEN) {
	console.error(
		"GH_TOKEN is not set, so the refreshed token cannot be saved.\n" +
		"Without it the feed stops working within 60 days.\n" +
		"Add a PAT with 'Secrets: Read and write' as the GH_PAT_SECRETS secret,\n" +
		"or set IG_SKIP_TOKEN_REFRESH=true to manage the token yourself."
	);
	process.exit(1);
}

async function main() {
	const url =
		"https://graph.instagram.com/refresh_access_token" +
		"?grant_type=ig_refresh_token" +
		"&access_token=" + encodeURIComponent(TOKEN);

	const response = await fetch(url);
	const body = await response.json().catch(function () {
		return {};
	});

	if (!response.ok || !body.access_token) {
		const detail = body && body.error ? JSON.stringify(body.error) : String(response.status);
		throw new Error("Token refresh failed: " + detail.split(TOKEN).join("<token>"));
	}

	const newToken = body.access_token;

	// Mask first, so an accidental log line later cannot expose it.
	console.log("::add-mask::" + newToken);

	const days = Math.round((body.expires_in || 0) / 86400);
	console.log("Refreshed. New token valid for roughly " + days + " days.");

	const result = spawnSync(
		"gh",
		["secret", "set", SECRET_NAME, "--repo", REPO],
		{
			input: newToken,
			env: Object.assign({}, process.env, { GH_TOKEN: GH_TOKEN }),
			stdio: ["pipe", "inherit", "inherit"]
		}
	);

	if (result.status !== 0) {
		throw new Error(
			"gh secret set failed (exit " + result.status + "). " +
			"Check that GH_PAT_SECRETS has 'Secrets: Read and write' on " + REPO + "."
		);
	}

	console.log("Stored the new token in the " + SECRET_NAME + " secret.");
}

main().catch(function (error) {
	console.error(error.message);
	process.exit(1);
});
