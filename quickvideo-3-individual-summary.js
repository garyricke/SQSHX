/* ~~~~~~ 
                     Install into assets from here down 
  ~~~~~~~ */
  function createVideoModal() {
    const modalHtml = `
            <div id="videoModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:10000;">
                <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);">
                    <video id="videoPlayer" controls autoplay style="max-height:95vh; max-width:95vw;"></video>
                    <button onclick="closeVideoModal()" style="position:absolute; top:10px; right:10px; padding:5px; background:none; border:none; cursor:pointer;">
                        <svg width="46" height="45" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#a)" stroke="#fff" stroke-width="2.925">
                            <path d="M22.871 42.816c11.254 0 20.378-9.124 20.378-20.378S34.124 2.061 22.87 2.061 2.494 11.184 2.494 22.438s9.123 20.378 20.377 20.378Z" fill="#000" fill-opacity=".3"/>
                            <path d="m13.093 12.789 19.556 19.299m-19.556 0 19.556-19.3"/>
                          </g>
                          <defs>
                            <clipPath id="a">
                              <path fill="#fff" d="M0 0h45.24v44.46H0z"/>
                            </clipPath>
                          </defs>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    document.body.insertAdjacentHTML("beforeend", modalHtml);
  }

  // Common modal closing function
  window.closeVideoModal = function () {
    const videoModal = document.getElementById("videoModal");
    videoModal.style.display = "none";
    const videoPlayer = document.getElementById("videoPlayer");
    videoPlayer.pause();
    videoPlayer.src = "";
  };

  // Function to add a play icon to the video link
  function addPlayIcon(element) {
    if (!element.querySelector(".play-icon")) {
      const playIconHtml = `
                <div class="play-icon" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); color:white; pointer-events:none;">
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="rgba(0,0,0,.3)" stroke="white" stroke-width="2"></circle>
                        <polygon points="10,8 16,12 10,16" fill="white"></polygon>
                    </svg>
                </div>
            `;
      element.insertAdjacentHTML("beforeend", playIconHtml);
    }
  }

  // Function to open and play video
  function openVideo(href) {
    const videoModal = document.getElementById("videoModal");
    const videoPlayer = document.getElementById("videoPlayer");
    videoPlayer.src = href;
    videoModal.style.display = "block";
    videoPlayer.play();
  }

  // Function to setup video links
  function setupVideoLink(link, imageElement) {
    if (!link.classList.contains("video-setup-done")) {
      let clickTarget = link;
      if (imageElement) {
        addPlayIcon(imageElement.parentElement);
        clickTarget = imageElement.parentElement;
      } else {
        addPlayIcon(link);
      }
      clickTarget.style.cursor = 'pointer';
      clickTarget.addEventListener("click", function (event) {
        event.preventDefault();
        openVideo(link.href);
      });
      link.classList.add("video-setup-done");
      
      // Hide the link if it's not being used as the click target
      if (clickTarget !== link) {
        link.style.display = "none";
      }
    }
  }


  // Create modal
  createVideoModal();

  // Apply setupVideoLink to all video links in the specified SELECTORS
const containerSelectors =
  ".fluid-image-container a, .summary-thumbnail-outer-container a, .sqs-block-content a.sqs-block-image-link, div.slide a.content-fill, div.image-wrapper a";
document.querySelectorAll(containerSelectors).forEach((link) => {
  if (link.href && link.href.includes(".mp4")) {
    const thumbImage = link.querySelector("img.thumb-image");
    setupVideoLink(link, thumbImage);
  }
});

  // New functionality for list items
  document.querySelectorAll("li.list-item").forEach((listItem) => {
    const button = listItem.querySelector("a.list-item-content__button");
    const image = listItem.querySelector("img.list-image");

    if (button && button.href.includes(".mp4")) {
      setupVideoLink(button, image);
      
      // Hide or remove the button
      const buttonWrapper = button.closest(".list-item-content__button-wrapper");
      if (buttonWrapper) {
        buttonWrapper.style.display = "none";
      }
    }
  });

  // Additional CSS for responsive play icon size
  const style = document.createElement("style");
  document.head.appendChild(style);
  style.textContent = `
        @media (min-width: 1024px) {
            .play-icon svg {
                width: 80px;
                height: 80px;
            }
        }
        .play-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .play-icon svg {
            fill: white;
            stroke: white;
        }
    `;
  /* 
    ~~~~~~ End asset install ~~~~~ 
  */