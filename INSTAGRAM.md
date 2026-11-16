# Instagram feed — setup

The "From the Mats" section on the homepage shows the latest posts from
[@carlsongracieclapham](https://www.instagram.com/carlsongracieclapham).

## How it works

A GitHub Action runs once a day, pulls the latest posts from Instagram,
resizes each image to a 640px square WebP, and commits them into this repo:

```
.github/workflows/instagram-feed.yml   the daily job
scripts/fetch-instagram.js             pulls posts + images, writes the manifest
scripts/refresh-instagram-token.js     rotates the access token
instagram.json                         generated — the manifest the page reads
images/instagram/*.webp                generated — one square image per post
instagram.js                           renders the grid in the browser
```

The live site never calls Instagram. It fetches its own `instagram.json` and
its own images, so there are **no view limits, no third-party scripts, no
monthly cost**, and the Content-Security-Policy stays at `'self'`.

If `instagram.json` is missing or unreadable the grid stays hidden and the
section falls back to the "Follow @carlsongracieclapham" button. It degrades
quietly rather than breaking.

## One-off setup

### 1. Instagram account type

The account must be a **Business** or **Creator** account — a personal account
will not work. In the Instagram app: *Settings → Account type and tools →
Switch to professional account*. No linked Facebook Page is required.

### 2. Create a Meta app

1. Go to [developers.facebook.com/apps](https://developers.facebook.com/apps)
   and create an app. Choose **Other** → **Business**.
2. In the app, add the **Instagram** product, then choose
   **Instagram API setup with Instagram login**.
3. Under *Generate access tokens*, connect the `@carlsongracieclapham`
   account and generate a token with the `instagram_business_basic` permission.
4. Copy the token. This is a long-lived token, valid 60 days — the Action
   rotates it from here on, so this should be the only time you do this by hand.

### 3. Add the repo secrets

In **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Value |
|---|---|
| `IG_ACCESS_TOKEN` | the token from step 2 |
| `GH_PAT_SECRETS` | a fine-grained PAT (see below) |

For `GH_PAT_SECRETS`, create a token at
**Settings → Developer settings → Personal access tokens → Fine-grained
tokens**, scoped to this repository only, with **Secrets: Read and write**.
The Action needs it to write each rotated token back into `IG_ACCESS_TOKEN` —
the default `GITHUB_TOKEN` cannot modify secrets.

### 4. Run it

**Actions → Sync Instagram feed → Run workflow.** It should commit
`instagram.json` and the images within a minute or two.

## Things worth knowing

**Token rotation is the one thing that can break this.** Instagram long-lived
tokens expire after 60 days and an expired one **cannot be recovered** — you
would have to repeat step 2 by hand. The Action refreshes it on every run and
stores the new value, so it only matters if the job stops running. If you get
GitHub's "workflow failed" emails, don't ignore them.

**The first run may report a token refresh failure.** Meta requires a token to
be at least 24 hours old before it can be refreshed. If you run the workflow
immediately after generating the token, the fetch will succeed and the rotation
step will fail. It resolves itself on the next day's run.

**Scheduled workflows are disabled after 60 days of repo inactivity.** This one
commits to the repo when the feed changes, which counts as activity, so it
normally keeps itself alive. If the gym stops posting for two months, check that
the schedule is still enabled.

**If the site is on GitHub Pages:** pushes made with the default `GITHUB_TOKEN`
do not always trigger a Pages rebuild. If the repo updates but the live site
doesn't, swap the checkout step to use `GH_PAT_SECRETS` as its `token:` so the
push is attributed to your account instead. On Netlify or Vercel this isn't an
issue — any push triggers a build.

## Changing things

**How many posts show:** `IG_POST_LIMIT` in the workflow controls how many are
pulled (default 12); `data-post-limit` on `.instagram-feed` in `index.html`
controls how many are displayed (default 8). The grid is 4 across on desktop,
3 on tablet, 2 on mobile, so multiples of 4 look tidiest.

**Image size/quality:** `TILE_SIZE` and the `webp({ quality: 80 })` call in
`scripts/fetch-instagram.js`.

**Run it locally** to test without waiting for the schedule:

```bash
npm install --no-save sharp
IG_ACCESS_TOKEN=your_token node scripts/fetch-instagram.js
```
