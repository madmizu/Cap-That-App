document.addEventListener("DOMContentLoaded", () => {
  fetch(URL)
  .then((resp) => resp.json())
  .then(loadImages);
});

const URL =
  "https://g.tenor.com/v1/search?q=funny-fail&key=RPJ2769J8BEG&limit=8";



const newEl = element => document.createElement(element);



const newForm = document.getElementById("newGifEntry");
newForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const imageGif = newEl("img");
  imageGif.setAttribute("id", "card-image");
  imageGif.setAttribute("class", "image");
  imageGif.src = e.target.newImageId.value;
  imageGif.alt = `image URL ${e.target.newImageId.value}`;
  renderImage(imageGif);
  e.target.reset();
});

function loadImages(gifImage) {
  const entries = Object.entries(gifImage);
  const array = entries[0][1];
  array.forEach(renderGif);
}

function renderGif(gifImage) {
  const imageGif = newEl("img");

  imageGif.setAttribute("id", "card-image");
  imageGif.setAttribute("class", "image");
  imageGif.src = gifImage.media[0].gif.url;
  imageGif.alt = gifImage.content_description;

  renderImage(imageGif);
}

function renderImage(imageGif) {
  const bodyOfPage = document.getElementById("body");
  const imageCard = newEl("div");
  const imageDiv = newEl("div");


  imageCard.setAttribute("class", "image-card");
  imageDiv.setAttribute("class", "gifAndCaption");
  
  imageCard.append(imageDiv);
  bodyOfPage.append(imageCard);
  imageDiv.append(imageGif);

  renderCaptions(imageCard);
}

function renderCaptions(imageCard) {
  const captionForm = newEl("form");   
   
  captionForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const captionList = newEl("ul");
    const eachCaption = newEl("li");
    const captionButton = newEl("button");

    const formInput = newEl("input");
    const topCaption = newEl("h2");

    captionButton.innerText = "Post";
    captionButton.setAttribute("type", "submit");
    captionButton.setAttribute("class", "caption-button");

    formInput.setAttribute("placeHolder", "Cap me...");
    formInput.setAttribute("type", "text");
    formInput.setAttribute("name", "caption");
    formInput.setAttribute("id", "captionInput");

    captionForm.setAttribute("class", "caption-form");
    captionForm.appendChild(formInput);
    captionForm.appendChild(captionButton);
    imageCard.append(captionForm);
    imageCard.append(captionList);
    imageDiv.append(topCaption);

    eachCaption.setAttribute("class", "newCaptions");
    captionList.append(eachCaption);
    const newCaptionEntry = e.target.captionInput.value;
    eachCaption.textContent = newCaptionEntry;
    e.target.reset();
    console.log(newCaptionEntry);

    const likeBtn = newEl("button");
    likeBtn.setAttribute("class", "like-button");
    likeBtn.textContent = "♥";
    eachCaption.appendChild(likeBtn);

    const numOfLikes = newEl("span");
    numOfLikes.setAttribute("class", "likeCount");
    eachCaption.append(numOfLikes);

    let i = 0;

    likeBtn.addEventListener("click", (e) => {
      ++i;
      numOfLikes.textContent = i;
      renderTopCaption(newCaptionEntry, numOfLikes);
    });

    function renderTopCaption(newCaptionEntry, numOfLikes) {}
  });
}
