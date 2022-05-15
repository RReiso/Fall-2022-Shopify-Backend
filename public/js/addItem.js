const { default: axios } = require("axios");

const handleSubmit = async (event) => {
  event.preventDefault();
  const itemName = document.querySelector("#item-name").value;
  const description = document.querySelector("#description").value;
  const type = document.querySelector("#type").value;
  const warehouse = document.querySelector("#warehouses").value;
  const price = document.querySelector("#price").value;
  const currency = document.querySelector("#currencies").value;
  const amount = document.querySelector("#amount").value;
  console.log("itemName", warehouse);

  const requestBody = {
    name: itemName,
    description,
    type,
    warehouse,
    money: { price, currency },
    inStock: amount,
  };
  try {
    await axios.post("/api/v1/items", requestBody);
    window.location.reload();
  } catch (error) {
    console.error(error.message);
    alert(`${error.response.data.error}. ${error.message}.`);
  }
};

const form = document.querySelector("#new-item-form");
form.addEventListener("submit", handleSubmit);
