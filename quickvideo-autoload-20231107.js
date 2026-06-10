/*  

Can you combine the following two code bases into one function so that the modal pop up can run automatically if a query string parameter is found in the URL and the video is properly found in the summary item list

QuickVideo Query String Code
https://codepen.io/garyricke/pen/xxMgNqq?editors=0010

QuickVideo Execute Code
https://codepen.io/garyricke/pen/Rwvodea

See also QuickVideo Redirect Code
https://codepen.io/garyricke/pen/QWYGRbe

Final
https://codepen.io/garyricke/pen/MWLJMRG

ChatGPT -- not working fully
https://chat.openai.com/share/114f75f5-dd24-41d6-b9b0-9b71af7dc1e3

ChatGPT — working
https://chat.openai.com/share/549a4302-c72b-4241-a9ac-c80fd7d1cf97

V2
NOT on home page: 65429de113f47b2918522678
https://www.ultimatewebsite.co/?quickvideo=65429de113f47b2918522678


*/

// Helper function to extract a query parameter from the URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Function to scroll to the element with the given ID
function scrollToElementById(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

// Function to create the play button
function createPlayButton() {
  let playButton = document.createElement("div");
  playButton.classList.add("play-button");
  playButton.style.backgroundImage =
    'url("https://sqshx.netlify.app/quick-play-button-squarespace-custom.svg")';

  return playButton;
}

// Function to create and show the modal
function showModal(videoId) {
  // Check if the modal already exists in the DOM
  let existingModal = document.querySelector(".modal-background");
  if (existingModal) {
    // If modal exists, we don't create another one
    return;
  }
  // Create the modal background
  let modalBackground = document.createElement("div");
  modalBackground.classList.add("modal-background");

  // Create the modal content with the dynamic video ID in the iframe source
  let modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // Add the iframe to modalContent first
  modalContent.insertAdjacentHTML(
    "beforeend",
    `
    <div style="height: 533.33px; width: 300.00px; position:relative;">
        <iframe allow="autoplay; gyroscope;" allowfullscreen height="100%" referrerpolicy="strict-origin" src="https://www.kapwing.com/e/${videoId}" style="border:0; height:100%; left:0; overflow:hidden; position:absolute; top:0; width:100%" title="Embedded content made on Kapwing" width="100%"></iframe>
    </div>
  `
  );

  // Create the close button with the SVG background
  let closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  closeButton.setAttribute("aria-label", "Close modal");
  closeButton.onclick = function () {
    modalBackground.remove();
  };
  // Append the close button after setting the innerHTML
  modalContent.appendChild(closeButton);

  modalBackground.appendChild(modalContent);

  // Append the modal background to the body
  document.body.appendChild(modalBackground);

  // Close modal when clicking outside the content area
  modalBackground.addEventListener("click", function (event) {
    if (event.target === modalBackground) {
      modalBackground.remove();
    }
  });

  // Stop propagation to prevent closing when clicking inside the modal
  modalContent.addEventListener("click", function (event) {
    event.stopPropagation();
  });
}

// Combined function to handle everything after DOM is loaded
function initializeQuickVideo() {
  const quickvideoId = getQueryParam("quickvideo");
  let isQuickvideoScrolled = false;

  if (quickvideoId) {
    isQuickvideoScrolled = scrollToMatchingQuickvideoId(quickvideoId);
    if (!isQuickvideoScrolled) {
      console.log("No matching element found to scroll to.");
      // If no matching element is found, show the modal with the quickvideo ID
      showModal(quickvideoId);
    }
  }

  const summaryItemsWithThumbnails = document.querySelectorAll(
    ".summary-item-has-thumbnail"
  );

  summaryItemsWithThumbnails.forEach((item) => {
    const anchor = item.querySelector("a");
    if (anchor && anchor.href.toLowerCase().includes("kapwing.com/videos")) {
      const thumbnail = item.querySelector(".summary-thumbnail");
      if (thumbnail) {
        item.classList.add("sqshx-quickvideo-summary");
        const playButton = createPlayButton();
        playButton.addEventListener("click", function (event) {
          event.preventDefault(); // This will prevent the default navigation
          const hrefParts = anchor.href.split("/videos/");
          if (hrefParts.length === 2) {
            const videoId = hrefParts[1].split("/")[0];
            showModal(videoId);
          }
        });
        thumbnail.appendChild(playButton);
      }
    }
  });
}

// Function to check if the quickvideo ID is within any of the kapwing anchor links
function scrollToMatchingQuickvideoId(quickvideoId) {
  const anchors = document.querySelectorAll(
    '.sqs-block-summary-v2 a[href*="kapwing"]'
  );
  let isScrolled = false;

  anchors.forEach((anchor) => {
    const hrefParts = anchor.href.split("/videos/");
    if (hrefParts.length === 2) {
      const kapwingId = hrefParts[1].split("/")[0];
      if (kapwingId === quickvideoId) {
        const summaryBlock = anchor.closest(".sqs-block-summary-v2");
        if (summaryBlock && summaryBlock.id) {
          scrollToElementById(summaryBlock.id);
          isScrolled = true;
          // After scrolling, we call showModal to display the modal pop-up
          showModal(kapwingId);
        }
      }
    }
  });

  return isScrolled;
}

// Ensure that the code runs after the DOM has fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeQuickVideo);
} else {
  initializeQuickVideo();
}
