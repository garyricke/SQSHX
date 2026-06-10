# SQSHX

Custom JavaScript / CSS for Squarespace sites (FTNN and others), hosted here
and served via Netlify. This repo is the migration target for code that used
to live on CodePen assets.

## Files

| File | Purpose |
|------|---------|
| `sqs-dynamic-code-include-v3.js` | Header loader. Loads jQuery (only if not already present), then the dependent scripts and styles below, in order. |
| `sqshx-v3-16jun2025.js` / `.css` | Core SQSHX: section IDs, subhead index, header styling, summary link handling, etc. |
| `quickvideo-autoload-20231107.js` / `.css` | QuickVideo modal — auto-opens a video from a URL query string. |
| `quickvideo-3-individual-summary.js` | QuickVideo support for individual summary items. |
| `sqs-custom-video-button-20231108.js` / `.css` | Custom play-button styling on video summary items. |
| `sqs-summary-block-arrows-wide-20231108.css` | Wide summary-block carousel arrows. |
| `sqs-general-style-20231108.css` | Misc. general site styles. |
| `*.svg` | Play / close-modal button icons used by the QuickVideo and video-button styles. |

## Usage

Reference the hosted file from the Squarespace **Code Injection → Header**:

```html
<script src="https://sqshx.netlify.app/sqs-dynamic-code-include-v3.js"></script>
```

Served via Netlify (site: https://sqshx.netlify.app/), which deploys
automatically on every push to `main`.

## Notes

- The loader self-guards against running twice and reuses an existing jQuery,
  so jQuery is fetched only once across the header + footer injections.
- All dependencies have been migrated off CodePen into this repo; the loader
  and the CSS/JS files now reference `https://sqshx.netlify.app/...`.
- The only remaining external dependencies are intentional third-party
  libraries on jsDelivr (jQuery and the Will-Myers plugins: BlogPostBanner,
  VideoElement, sectionLoader).
