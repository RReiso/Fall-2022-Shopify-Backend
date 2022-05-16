const { default: axios } = require("axios");

const handleSubmit = async (event) => {
  event.preventDefault();
  const modalCheckbox = document.querySelector("#new-item-modal");
  let itemName = document.querySelector("#item-name");
  let description = document.querySelector("#description");
  let warehouse = document.querySelector("#warehouses");
  let price = document.querySelector("#price");
  let currency = document.querySelector("#currencies");
  let amount = document.querySelector("#amount");
  const requestBody = {
    name: itemName.value,
    description: description.value,
    warehouse: warehouse.value,
    inStock: amount.value,
  };

  if (price.value && !currency.value) {
    requestBody.money = { price: price.value };
  } else if (currency.value && !price.value) {
    requestBody.money = { currency: currency.value };
  } else if (price.value && currency.value) {
    requestBody.money = { price: price.value, currency: currency.value };
  }

  try {
    await axios.post("/api/v1/items", requestBody);
    window.location.reload();
    modalCheckbox.checked = false;
    itemName.value = "";
    description.value = "";
    price.value = "";
    currency.value = "";
    amount.value = "";
  } catch (error) {
    console.error(error.message);
    alert(`${error.message}. ${error.response?.data?.error || ""}`);
  }
};

const form = document.querySelector("#new-item-form");
if (form) {
  form.addEventListener("submit", handleSubmit);
}
