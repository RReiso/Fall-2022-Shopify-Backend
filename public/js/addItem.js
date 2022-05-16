const { default: axios } = require("axios");

const handleSubmit = async (event) => {
  event.preventDefault();
  const modalCheckbox = document.querySelector("#new-item-modal");
  const itemName = document.querySelector("#item-name").value;
  const description = document.querySelector("#description").value;
  const type = document.querySelector("#type").value;
  const warehouse = document.querySelector("#warehouses").value;
  const price = document.querySelector("#price").value;
  const currency = document.querySelector("#currencies").value;
  const amount = document.querySelector("#amount").value;
  const requestBody = {
    name: itemName,
    description,
    type,
    warehouse,
    inStock: amount,
  };

  if (price && !currency) {
    requestBody.money = { price };
  } else if (currency && !price) {
    requestBody.money = { currency };
  } else if (price && currency) {
    requestBody.money = { price, currency };
  }

  try {
    await axios.post("/api/v1/items", requestBody);
    window.location.reload();
    modalCheckbox.checked = false;
  } catch (error) {
    console.error(error.message);
    alert(`${error.message}. ${error.response?.data?.error || ""}`);
  }
};

const form = document.querySelector("#new-item-form");
if (form) {
  form.addEventListener("submit", handleSubmit);
}
