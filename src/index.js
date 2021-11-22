document.addEventListener("DOMContentLoaded", () => {});

const URL =
  "https://g.tenor.com/v1/search?q=funny-fail&key=RPJ2769J8BEG&limit=8";

let x = 0;

fetch(URL)
  .then((resp) => resp.json())
  .then(loadImages)
  .then(handleNewImageForm);

////////// Load Images
function loadImages(gifImage) {
  const entries = Object.entries(gifImage);
  const array = entries[0][1];
  array.forEach(renderGif);

}

////////// Render Gifs (For Each)
function renderGif(gifImage) {
  const imageGif = document.createElement("img");
  imageGif.setAttribute("id", "card-image");
  imageGif.setAttribute("class", "image");
  imageGif.src = gifImage.media[0].gif.url;
  imageGif.alt = gifImage.content_description;
  renderImage(imageGif);
}

////////// Handle New Image Submit Form
function handleNewImageForm() {
  const newForm = document.getElementById("newGifEntry");
  newForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const imageGif = document.createElement("img");
    imageGif.setAttribute("id", "card-image");
    imageGif.setAttribute("class", "image");
    imageGif.src = event.target.newImageId.value;
    imageGif.alt = `image URL ${event.target.newImageId.value}`;
    renderImage(imageGif);
    event.target.reset();
  });
}


////////// Load Image Cards
function renderImage(imageGif) {
  const captionButton = document.createElement("button");
  const captionForm = document.createElement("form");
  const imageCard = document.createElement("div");
  const bodyOfPage = document.getElementById("body");
  const formInput = document.createElement("input");
  const captionScroll = document.createElement("div");
  const captionList = document.createElement("ul");
  const imageDiv = document.createElement("div");
  const topCaption = document.createElement("h2");

  captionButton.innerText = "Post";
  captionButton.setAttribute("type", "submit");
  captionButton.setAttribute("class", "caption-button");

  formInput.setAttribute("placeHolder", "Cap me...");
  formInput.setAttribute("type", "text");
  formInput.setAttribute("name", "caption");
  formInput.setAttribute("id", "captionInput");

  captionForm.setAttribute("class", "caption-form");
  captionForm.setAttribute("id", x);
  imageCard.setAttribute("class", "image-card-" + x);
  imageCard.setAttribute("id", "image-card");
  imageDiv.setAttribute("class", "gifAndCaption");
  captionList.setAttribute("class", "caption-ul");
  captionScroll.setAttribute("class", "captionScroll");
  topCaption.setAttribute("id", "topCaption-" + x)

  bodyOfPage.prepend(imageCard);
  imageDiv.append(imageGif);
  imageCard.append(imageDiv);
  imageCard.append(captionForm);
  captionForm.appendChild(formInput);
  captionForm.appendChild(captionButton);
  imageCard.append(captionScroll);
  captionScroll.append(captionList);
  imageDiv.append(topCaption);
  x++;

  handleCaptionForm(captionForm, captionList);

}

////////// Handle Caption Form
function handleCaptionForm(captionForm, captionList) {
  captionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const eachCaption = document.createElement("li");
    eachCaption.setAttribute("class", "newCaptions caption-" + event.target.id);
    const newCaptionEntry = event.target.captionInput.value;
    eachCaption.textContent = newCaptionEntry;
    captionList.append(eachCaption);

    event.target.reset();
    renderLikeBtn(eachCaption, event.target.id);
  });
}

////////// Render Like Button
function renderLikeBtn(eachCaption, id) {
  const likeBtn = document.createElement("button");
  likeBtn.setAttribute("class", "like-button");
  likeBtn.setAttribute("id", id);
  likeBtn.textContent = "♥";
  
  eachCaption.appendChild(likeBtn);

  handleLikeBtn(eachCaption, likeBtn);
  
}

////////// Handle Like Button & Display Like Count
function handleLikeBtn(eachCaption, likeBtn) {
  const numOfLikes = document.createElement("div");
  numOfLikes.setAttribute("class", "likeCount");
  

  let i = 0;
  likeBtn.addEventListener("click", (event) => {
    ++i;
    numOfLikes.textContent = i;

    let likesArray = [];
    let captionsArray = [];
    let captions = document.getElementsByClassName("caption-" + event.target.id);
    
    eachCaption.append(numOfLikes);
    
    for (let y = 0; y < captions.length; y++) {
      let caption = captions[y].textContent;
      let pair = caption.split("♥");
      captionsArray.push(pair[0]);
      let likeCounter = parseInt(pair[1]);
      if (isNaN(likeCounter)) {
        likeCounter = 0;
      }
      likesArray.push(likeCounter);
      console.log (likeCounter);
    }
    console.log(likesArray);
    let indexOfMaxLikes = likesArray.indexOf(Math.max(...likesArray));
    console.log("topCaption-" + event.target.id)
    document.getElementById("topCaption-" + event.target.id).textContent = captionsArray[indexOfMaxLikes]; 
  });
}


