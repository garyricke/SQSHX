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
<script src="https://sqshx.netlify.app/sqs-dynamic-code-include-v3.js"></script>
```

Served via Netlify (site: https://sqshx.netlify.app/), which deploys
automatically on every push to `main`.

## Notes

- The loader self-guards against running twice and reuses an existing jQuery,
  so jQuery is fetched only once across the header + footer injections.
- The dependent files it pulls in are still hosted on CodePen
  (`assets.codepen.io/3457845/...`). They can be migrated into this repo over
  time; update the URLs in the loader as each one moves.
