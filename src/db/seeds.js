const seedProducts = [
  {
    name: "Samsung Galaxy A53",
    type: "Smartphone",
    description: "Lorem Ipsum",
    warehouse: "ABC123",
    money: { price: 529.99, currency: "CAD" },
    inStock: 20,
  },
  {
    name: "Apple iPad 10.2",
    type: "Tablet",
    description: "Lorem Ipsum",
    warehouse: "CDF456",
    money: { price: 429.99, currency: "USD" },
    inStock: 15,
  },
  {
    name: "ASUS C523 15.6",
    type: "Chromebook",
    description: "Lorem Ipsum",
    warehouse: "GHI789",
    money: { price: 249.99, currency: "CAD" },
    inStock: 9,
    isDeleted: true,
    deletionComments: "Lorem ipsum sit dolor",
  },
];

const warehouses = ["ABC123", "CDF456", "GHI789"];
const currencies = ["USD", "CAD"];

module.exports = { seedProducts, warehouses, currencies };
