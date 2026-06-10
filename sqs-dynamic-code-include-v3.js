/*
  SQS Load External Files — V3 (cleaned 10 JUN 2026)
  sqs-load-external-files-header

  Loads jQuery (only if not already present) and then the dependent
  scripts/styles, in order, after jQuery is available.

  Changes from the previous V3:
  - jQuery is no longer loaded unconditionally. If the page already has
    jQuery (e.g. the copy in the footer code injection), it is reused, so
    jQuery is fetched only once instead of multiple times.
  - The loader is guarded so it can only run once per page, even if the
    script tag is accidentally included twice.
*/

(function () {
  // Guard: never run the loader more than once.
  if (window.__sqsExternalFilesLoaded) return;
  window.__sqsExternalFilesLoaded = true;

  // Files that depend on jQuery. Loaded in array order.
  const dependentFiles = [
    { type: 'script', src: 'https://sqshx.netlify.app/sqshx-v3-16jun2025.js' },
    { type: 'style',  href: 'https://sqshx.netlify.app/sqshx-v3-16jun2025.css' },
    { type: 'script', src: 'https://sqshx.netlify.app/quickvideo-autoload-20231107.js' },
    { type: 'style',  href: 'https://sqshx.netlify.app/quickvideo-autoload-20231107.css' },
    { type: 'script', src: 'https://sqshx.netlify.app/quickvideo-3-individual-summary.js' },
    { type: 'script', src: 'https://sqshx.netlify.app/sqs-custom-video-button-20231108.js' },
    { type: 'style',  href: 'https://sqshx.netlify.app/sqs-custom-video-button-20231108.css' },
    { type: 'style',  href: 'https://sqshx.netlify.app/sqs-summary-block-arrows-wide-20231108.css' },
    { type: 'style',  href: 'https://sqshx.netlify.app/sqs-general-style-20231108.css' },
    { type: 'style',  href: 'https://cdn.jsdelivr.net/gh/willmyethewebsiteguy/sectionLoader@1/sectionLoader.min.css' },
    { type: 'script', src: 'https://cdn.jsdelivr.net/gh/willmyethewebsiteguy/BlogPostBanner@3.1/javascript.min.js' },
    { type: 'script', src: 'https://cdn.jsdelivr.net/gh/willmyethewebsiteguy/VideoElement@1.2.005/javascript.min.js' },
    { type: 'script', src: 'https://cdn.jsdelivr.net/gh/willmyethewebsiteguy/sectionLoader@1/sectionLoader.min.js' },
  ];

  function appendDependentFiles() {
    dependentFiles.forEach(file => {
      let element;
      if (file.type === 'script') {
        element = document.createElement('script');
        element.src = file.src;
      } else if (file.type === 'style') {
        element = document.createElement('link');
        element.rel = 'stylesheet';
        element.type = 'text/css';
        element.href = file.href;
      }
      if (element) document.head.appendChild(element);
    });
  }

  function loadExternalFiles() {
    // Reuse jQuery if it's already on the page; otherwise load it once.
    if (window.jQuery) {
      appendDependentFiles();
      return;
    }

    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.js';
    jqueryScript.onload = appendDependentFiles;
    document.head.appendChild(jqueryScript);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadExternalFiles);
  } else {
    loadExternalFiles();
  }
})();
