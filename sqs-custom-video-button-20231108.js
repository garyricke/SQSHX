document.addEventListener('DOMContentLoaded', (function() {
  var scopedFindAllTags = function() {
    var tagsAndCats = document.querySelectorAll('.summary-metadata-container--below-content .summary-metadata-item--tags, .summary-metadata-container--below-content .summary-metadata-item--cats');
    tagsAndCats.forEach(function(item){
      if(item.textContent.toLowerCase().includes('video')){
        item.closest('.summary-item').classList.add('sqs-video');
      }
    });
  };

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // Document is already ready to go
    scopedFindAllTags();
  } else {
    // Wait for the document to be fully parsed
    document.addEventListener('DOMContentLoaded', scopedFindAllTags);
  }
})());