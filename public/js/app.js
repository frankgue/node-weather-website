console.log("JS Files");

const findLocationCordinates = (location) => {
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
          console.log(data.message);
          messageOne.innerText = data.error + "\n";
          messageTwo.textContent = data.message + "\n";
        } else {
          console.log(data.location);
          console.log(data.forecast);
          console.log(data.address);
          messageOne.innerText = data.forecast + "\n";
          messageTwo.textContent = data.location + "\n";
        }
      });
    }
  );
};
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.innerText = "Loading...";
  messageTwo.textContent = "";
  findLocationCordinates(location);
});
