document.addEventListener("DOMContentLoaded", () => {});

const URL =
  "https://g.tenor.com/v1/search?q=funny-fail&key=RPJ2769J8BEG&limit=8";

fetch(URL)
  .then((resp) => resp.json())
  .then(loadImages);


  const newForm = document.getElementById("newGifEntry")
  newForm.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const imageGif = document.createElement("img");
    imageGif.setAttribute("id", "card-image");
    imageGif.setAttribute("class", "image");
    imageGif.src = e.target.newImageId.value
    imageGif.alt = `image URL ${e.target.newImageId.value}`
    renderImage(imageGif)
    e.target.reset()
  })
  
function loadImages(gifImage) {
  const entries = Object.entries(gifImage);
  const array = entries[0][1];
  array.forEach(renderGif);
}

function renderGif (gifImage) {
  const imageGif = document.createElement("img");
  imageGif.setAttribute("id", "card-image");
  imageGif.setAttribute("class", "image");
  imageGif.src = gifImage.media[0].gif.url;
  imageGif.alt = gifImage.content_description;
  renderImage(imageGif)
}

function renderImage(imageGif) {
  const captionButton = document.createElement("button");
  const captionForm = document.createElement("form");
  const imageCard = document.createElement("div");
  const bodyOfPage = document.getElementById("body");
  const formInput = document.createElement("input");
  const captionScroll = document.createElement("div")
  const captionList = document.createElement("ul");
  const imageDiv = document.createElement("div")
  const topCaption = document.createElement("h2")

  captionButton.innerText = "Post";
  captionButton.setAttribute("type", "submit");
  captionButton.setAttribute("class", "caption-button");

  formInput.setAttribute("placeHolder", "Cap me...");
  formInput.setAttribute("type", "text");
  formInput.setAttribute("name", "caption");
  formInput.setAttribute("id", "captionInput");

  captionForm.setAttribute("class", "caption-form");
  imageCard.setAttribute("class", "image-card");
  imageDiv.setAttribute("class", "gifAndCaption")
  captionList.setAttribute("class", "caption-ul")
  captionScroll.setAttribute("class", "captionScroll")

  bodyOfPage.append(imageCard);
  imageDiv.append(imageGif);
  imageCard.append(imageDiv)
  imageCard.append(captionForm);
  captionForm.appendChild(formInput);
  captionForm.appendChild(captionButton);
  imageCard.append(captionScroll);
  captionScroll.append(captionList)
  imageDiv.append(topCaption);


  captionForm.addEventListener("submit", (e) => {
	e.preventDefault()
    const eachCaption = document.createElement("li");
    eachCaption.setAttribute("class", "newCaptions")
    captionList.append(eachCaption);
    const newCaptionEntry = e.target.captionInput.value
    eachCaption.textContent = newCaptionEntry;
    e.target.reset()
    console.log(newCaptionEntry)

    const likeBtn = document.createElement("button")
    likeBtn.setAttribute("class", "like-button")
    likeBtn.textContent = "♥"
    eachCaption.appendChild(likeBtn)

    const numOfLikes = document.createElement("span")
    numOfLikes.setAttribute("class", "likeCount")
    eachCaption.append(numOfLikes)
   
    let i = 0

    likeBtn.addEventListener("click", (e) => {
      ++i 
      numOfLikes.textContent = i
      renderTopCaption (newCaptionEntry, numOfLikes)
        
      })
  
    function renderTopCaption (newCaptionEntry, numOfLikes) {
      
    }

    })

    




}
