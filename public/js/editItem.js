const { default: axios } = require("axios");

const handleClick = (event) => {
  event = event || window.event;
  event.target = event.target || event.srcElement;

  let element = event.target;

  // Climb up the document tree from the target of the event
  while (element) {
    if (
      element.nodeName === "BUTTON" &&
      /edit-save-btn/.test(element.className)
    ) {
      // The user clicked on a <button> or clicked on an element inside a <button>
      // with a class name called "edit-save-btn"
      handleSave(event);
      break;
    }

    element = element.parentNode;
  }
};

const handleSave = async (event) => {
  event.preventDefault();
  const modal = event.target.closest(".modal");
  const itemId = modal.id;
  const itemName = modal.querySelector(`#item-name-${itemId}`).value;
  const description = modal.querySelector(`#description-${itemId}`).value;
  const type = modal.querySelector(`#type-${itemId}`).value;
  const warehouse = modal.querySelector(`#warehouses-${itemId}`).value;
  const price = modal.querySelector(`#price-${itemId}`).value;
  const currency = modal.querySelector(`#currencies-${itemId}`).value;
  const amount = modal.querySelector(`#amount-${itemId}`).value;

  const requestBody = {
    name: itemName,
    description,
    type,
    warehouse,
    money: { price, currency },
    inStock: amount,
  };
  try {
    await axios.put(`/api/v1/items/${itemId}`, requestBody);
    window.location.reload();
  } catch (error) {
    console.error(error.message);
    alert(`${error.message}. ${error.response?.data?.error || ""}`);
  }
};

if (document.addEventListener) {
  document.addEventListener("click", handleClick, false);
} else if (document.attachEvent) {
  document.attachEvent("onclick", handleClick);
}
