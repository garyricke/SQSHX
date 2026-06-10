/*
  sqshx v3 16 Jun 2025
*/

window.addEventListener('load', function () {
  summaryRedirectLinksFunc();
  headerStyle();
  blogSectionColor();
  contentCharacterStylesV2();
  noClick();
  subHeadIndex();
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ noClick ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function noClick(){
  let summaryBlockLinks = document.querySelectorAll('.summary-item a');
  summaryBlockLinks.forEach(
    element => {
        if(element.href.indexOf('#noclick') != -1){
          console.log('ele',element.href)
          element.classList.add('noclick')
          element.style.cursor = 'default';
        }
      }
    );
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ summaryRedirectLinks ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/*
  Loop through summary excerpts 
  Find any links with a tilde (~) in the text
  If found, apply the link in that excerpt to all links in the summary
  -Image & title
  
  https://codepen.io/garyricke/pen/mdqNxPq?editors=0110

  const summaryRedirectLinks = true;
*/
function summaryRedirectLinksFunc(){
  if(typeof summaryRedirectLinks !== 'undefined' && summaryRedirectLinks !== null){
    let summaryBlockLinks = document.querySelectorAll('.summary-excerpt p a');
    summaryBlockLinks.forEach(function(item){
      if(item.innerText.indexOf('~') != -1){
        item.innerText = item.innerText.replace('~','');
        item.classList.add('SQSHX-link-to-redirect-to');
        var linkRedirectHref = item.getAttribute('href');
        let parentOfRedirectLink = item.parentElement.parentElement.parentElement.parentElement;
        let getAllChildLinks = parentOfRedirectLink.querySelectorAll('a');
        getAllChildLinks.forEach(function(item){
          if(item.classList.contains('summary-thumbnail-container') ||
             item.classList.contains('summary-title-link')
            ){
            item.classList.add('SQSHX-link-redirect');
            item.href = linkRedirectHref;
          }
        });
      }
    });    
  }  
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ headerStyle ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function headerStyle(){
  /*
    Check to see if the first section has a background
    If it does, add a class to the header
    If not, add a class indicating no background
    https://codepen.io/garyricke/pen/mdqZBmW?editors=0110

    Check color of first section for puposes of logo
  */
  let sections = document.querySelectorAll('section.page-section');
  let sectionVideo = document.querySelectorAll('.section-background');

  // Check if sections exist before proceeding
  if (sections.length === 0) {
    console.warn('No sections with class "page-section" found');
    return;
  }

  // First Section Color 
  let firstSectionColor = sections[0].classList[8];
  
  // Check for undefined and set to 'none'
  if (typeof firstSectionColor === "undefined") {
    firstSectionColor = 'none';
  }

  document.body.classList.add('sqshx-first-sec-color-' + firstSectionColor);

  // Additional check for section video to prevent similar errors
  let hasVideoBackground = false;
  if (sectionVideo.length > 0 && sectionVideo[0].querySelector('[data-controller="VideoBackgroundNative"]') != null) {
    hasVideoBackground = true;
  }

  // Don't add new classes until after we check for color
  if(sections[0].classList.contains('has-background') == true || hasVideoBackground){
    document.body.classList.add('sqshx-has-background'); // So we can easily see in the body classes
    
    // Check if header exists before adding class
    const header = document.getElementById('header');
    if (header) {
      header.classList.add('sqshx-has-background'); // for the logo
    }
  }else{
    document.body.classList.add('sqshx-no-background');
    
    // Check if header exists before adding class
    const header = document.getElementById('header');
    if (header) {
      header.classList.add('sqshx-no-background');
    }
  }  
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ subHeadIndex ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// ChatGPT, rewrite with JS best practicies

const subHeadIndex = () => {
  //console.log('running subHeadIndex after full page load');
  const runSubheadIndex = document.querySelectorAll(".sqs-block-content p");
  let placeLinksHere;
  const linkSet = new Set();

  const stringToHTML = (str) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    return doc.body.firstChild;
  };

  runSubheadIndex.forEach((item) => {
    if(item.textContent.includes('~subheadIndex-links')){
      placeLinksHere = item;
    }

    if(item.textContent.includes('~subheadIndex-h')){
      const whichSubhead = item.textContent.substr(item.textContent.indexOf('~subheadIndex')+14,2);

      document.getElementById('page').append(stringToHTML('<a class="subheadLinksBackToTop" href="#topsubheadlinks"></a>'));

      item.remove();

      const getSubheads = document.querySelectorAll(`.sqs-block-content ${whichSubhead}`);
      let html = '<ul class="subheadlinks"><a name="topsubheadlinks"></a>';

      let parentOfSubheads;

      getSubheads.forEach((item, index) => {
        let linkText = item.textContent.includes('<br') ? 
          item.textContent.substring(0, item.textContent.indexOf('<br')) : 
          item.textContent;

        const link = item.textContent.toLowerCase().replace(/ /g,'-');

        if (!linkSet.has(link)) {
          html += `<li><a href="#${link}">${linkText}</a></li>`;
          item.prepend(stringToHTML(`<a name="${link}" class="aname-${index}"></a>`));         
          parentOfSubheads = item.parentElement;
          linkSet.add(link);
        }
      });

      html += '</ul>';

      const newContentNode = document.createElement('div');
      newContentNode.innerHTML = html;      

      if(placeLinksHere !== null){
        placeLinksHere.innerHTML = '';
        placeLinksHere.insertBefore(newContentNode, placeLinksHere.firstChild);
      } else {
        parentOfSubheads.insertBefore(newContentNode, parentOfSubheads.firstChild);
      }
    }
  });

  const elem = document.querySelector('.aname-0');
  if(elem !== null){
    const rect = elem.getBoundingClientRect();

    const showElement = () => document.querySelector(".subheadLinksBackToTop").classList.add("visible");
    const hideElement = () => document.querySelector(".subheadLinksBackToTop").classList.remove("visible");
    document.addEventListener("scroll", (e) => window.scrollY < rect.y ? hideElement() : showElement());
  }
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Content Character Style ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function contentCharacterStylesV2(){
  var charStyles = document.querySelectorAll("p");

  charStyles.forEach(function(el){
    if(el.innerText.indexOf('^') != -1){
      el.classList.add('ele-cnt-caret');
      var cleanCharStyle = el.innerHTML;
      cleanCharStyle = cleanCharStyle.replace('^','');
      el.innerHTML = cleanCharStyle;
      el.parentElement.classList.add('ele-cnt-caret');  //Go up to the excerpt container
      el.parentElement.parentElement.parentElement.parentElement.classList.add('ele-cnt-caret'); // Go all the way up to the summary block
    }
  });
}


/* ~~~~~~~~~~~~~ [ blogSectionColor ] ~~~~~~~~~~~~~~~ */
/*
    For blogs
*/
function blogSectionColor(){
  var getColor = document.querySelectorAll('p.sqsrte-small');
  if(typeof getColor !== 'undefined' && getColor !== null){
    getColor.forEach(function(item){
      if(item.innerText.indexOf('::clr') != -1){
        var setColor = item.innerText.substring(6);
        item.remove();

        var currentColors = document.querySelectorAll('article.sections section.page-section');

        currentColors.forEach(function(el){
          if(typeof el.getAttribute("data-section-theme") !== 'undefined' && el.getAttribute("data-section-theme") !== null){
            var currentColor = el.getAttribute("data-section-theme");
            el.classList.remove(currentColor);
            el.classList.add(setColor);
          }
        });
        //console.log(currentColor);
      }
    });
  }
}