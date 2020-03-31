console.log("running");

const input = document.getElementById("share-input");
const button = document.getElementById("share-submit");
const shares = document.getElementById("shares");

//when the page first loads
//whenever the user submits a new submission

window.addEventListener("DOMContentLoaded", getAllShares);
button.addEventListener("click", handleSubmit);


function handleSubmit() {
 //get the text from the input
 const shareText = input.value;
 //clear the user input after getting it
 input.value = "";
 //send it to the server using axios
 axios.post("/share-submit", { shareText: shareText }).then(getAllShares);
}

function getAllShares() {
  //request all data from server
  axios.get("/all-submissions").then(res => {
    const shareList = res.data;
    shares.innerHTML = "";
    for(let i = 0; i < shareList.length; i++) {
      const style = "position: absolute; top: random(); left: random()"

      const share = '<div class="share" style="' + style + '">' + shareList[i].entry + '</div>';

      shares.innerHTML += share;
    }
  })
}