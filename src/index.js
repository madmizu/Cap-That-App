document.addEventListener("DOMContentLoaded", () => {});

const URL =
  "https://g.tenor.com/v1/search?q=funny-fail&key=RPJ2769J8BEG&limit=8";

fetch(URL)
  .then((resp) => resp.json())
  .then(loadImages);

function loadImages(gifImage) {
  const entries = Object.entries(gifImage)
  const array = entries[0][1]
  array.forEach(renderImage);
}


function renderImage(gifImage) {
  const imageCard = document.createElement ("div")
  const bodyOfPage = document.getElementById("body")

  imageCard.setAttribute('class','image-card')
  const imageGif = document.createElement ("img")
  imageGif.setAttribute('id','card-image')
  imageGif.setAttribute('class','image')
  imageGif.src = gifImage.media[0].gif.url;
  imageGif.alt = gifImage.content_description;


  bodyOfPage.append(imageCard)
  imageCard.append(imageGif)

  console.log(imageCard)
}
