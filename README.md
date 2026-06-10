# SQSHX

Custom JavaScript / CSS for Squarespace sites (FTNN and others), hosted here
and served via Netlify. This repo is the migration target for code that used
to live on CodePen assets.

## Files

| File | Purpose |
|------|---------|
| `sqs-dynamic-code-include-v3.js` | Header loader. Loads jQuery (only if not already present), then the dependent SQSHX / QuickVideo / Will-Myers scripts and styles, in order. |

## Usage

Reference the hosted file from the Squarespace **Code Injection → Header**:

```html
<script src="https://YOUR-NETLIFY-SITE/sqs-dynamic-code-include-v3.js"></script>
```

Replace `YOUR-NETLIFY-SITE` with the Netlify domain (or custom domain) once
the site is connected to this repo.

## Notes

- The loader self-guards against running twice and reuses an existing jQuery,
  so jQuery is fetched only once across the header + footer injections.
- The dependent files it pulls in are still hosted on CodePen
  (`assets.codepen.io/3457845/...`). They can be migrated into this repo over
  time; update the URLs in the loader as each one moves.
