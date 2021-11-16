document.addEventListener("DOMContentLoaded", () => {});

const URL =
  "https://g.tenor.com/v1/search?q=funny-fail&key=RPJ2769J8BEG&limit=8";

fetch(URL)
  .then((resp) => resp.json())
  .then(loadImages);

function loadImages(gifImage) {
  const entries = Object.entries(gifImage);
  const array = entries[0][1];
  array.forEach(renderImage);
}

function renderImage(gifImage) {
  const captionButton = document.createElement("button");
  const captionForm = document.createElement("form");
  const imageCard = document.createElement("div");
  const bodyOfPage = document.getElementById("body");
  const formInput = document.createElement("input");
  const captionList = document.createElement("ol");

  captionButton.innerText = "post";
  captionButton.setAttribute("type", "submit");
  captionButton.setAttribute("class", "caption-button");
  formInput.setAttribute("placeHolder", "cap me...");
  formInput.setAttribute("type", "text");
  formInput.setAttribute("name", "caption");
  formInput.setAttribute("id", "caption");
  formInput.setAttribute("class", "caption-input");
  captionForm.setAttribute("id", "caption-form");
  imageCard.setAttribute("class", "image-card");
  const imageGif = document.createElement("img");
  imageGif.setAttribute("id", "card-image");
  imageGif.setAttribute("class", "image");
  imageGif.src = gifImage.media[0].gif.url;
  imageGif.alt = gifImage.content_description;

  bodyOfPage.append(imageCard);
  imageCard.append(imageGif);
  imageCard.append(captionForm);
  captionForm.append(formInput);
  captionForm.append(captionButton);
  imageCard.append(captionList);

  console.log(imageCard);

  captionForm.addEventListener("submit", (e) => {
	e.preventDefault()
    const eachCaption = document.createElement("li");
    captionList.append(eachCaption);
    console.log(e.target.value);
  });
}
