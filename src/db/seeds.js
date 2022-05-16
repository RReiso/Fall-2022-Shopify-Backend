const seedProducts = [
  {
    name: "Samsung Galaxy A53",
    description: "Lorem Ipsum",
    warehouse: "ABC123",
    money: { price: 529.99, currency: "CAD" },
    inStock: 20,
  },
  {
    name: "Apple iPad 10.2",
    description: "Lorem Ipsum",
    warehouse: "CDF456",
    money: { price: 429.99, currency: "USD" },
    inStock: 15,
    deletionComments: "Deleted by accident. Restored.",
  },
  {
    name: "ASUS TUF Dash 15 15.6",
    warehouse: "GHI789",
    money: { price: 1599.99, currency: "CAD" },
    inStock: 7,
  },
  {
    name: "ASUS C523 15.6",
    description: "Lorem Ipsum",
    warehouse: "GHI789",
    money: { price: 249.99, currency: "CAD" },
    inStock: 9,
    isDeleted: true,
    deletionComments: "Lorem ipsum sit dolor",
  },
  {
    name: 'Samsung 65" 4K UHD HDR LED Tizen Smart',
    description: "Lorem Ipsum",
    warehouse: "ABC123",
    money: { price: 899.99, currency: "USD" },
    inStock: 0,
    isDeleted: true,
  },
];

const warehouses = ["ABC123", "CDF456", "GHI789"];
const currencies = ["USD", "CAD", ""];

module.exports = { seedProducts, warehouses, currencies };
