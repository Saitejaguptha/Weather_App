const weatherForm = document.querySelector("form");
const messageone = document.querySelector("#message-1");
const messagetwo = document.querySelector("#message-2");

console.log("Client Side JavaScript is loaded");

const render = async function (address) {
  try {
    const res = await fetch(`http://localhost:3000/weather?address=${address}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();

    if (data.error) {
      messageone.textContent = "No data received, Please retry another address";
      return;
    }

    messageone.textContent = `location:${data.location}`;
    messagetwo.textContent = `Forecast Data:${data.forecastdata}`;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const address = document.querySelector(".input_address").value;
  messageone.textContent = "";
  messagetwo.textContent = "";

  if (address) {
    render(address);
  } else {
    console.log("Please enter an address");
  }
});
