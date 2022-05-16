let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../server");
const { currencies } = require("../../src/db/seeds");
const Item = require("../../src/v1/models/ItemsModel");

chai.should();
chai.use(chaiHttp);

describe("Items", () => {
  describe("Test POST route /api/v1/items", () => {
    it("It should not POST an item without the name field", (done) => {
      let item = {
        description: "Lorem Ipsum",
        warehouse: "ABC123",
        money: { price: 529.99, currency: "CAD" },
        inStock: 20,
      };
      chai
        .request(server)
        .post("/api/v1/items")
        .send(item)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("error")
            .eql(
              "Missing one or more required fields: (name, warehouse, inStock)"
            );
          done();
        });
    });

    it("It should not POST an item without the warehouse field", (done) => {
      let item = {
        name: "Samsung Galaxy A53",
        description: "Lorem Ipsum",
        money: { price: 529.99, currency: "CAD" },
        inStock: 20,
      };
      chai
        .request(server)
        .post("/api/v1/items")
        .send(item)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("error")
            .eql(
              "Missing one or more required fields: (name, warehouse, inStock)"
            );
          done();
        });
    });

    it("It should not POST an item without the inStock field", (done) => {
      let item = {
        name: "Samsung Galaxy A53",
        warehouse: "ABC123",
        description: "Lorem Ipsum",
        money: { price: 529.99, currency: "CAD" },
      };
      chai
        .request(server)
        .post("/api/v1/items")
        .send(item)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("error")
            .eql(
              "Missing one or more required fields: (name, warehouse, inStock)"
            );
          done();
        });
    });

    it("It should not POST an item if inStock count is less than 0", (done) => {
      let item = {
        name: "Samsung Galaxy A53",
        description: "Lorem Ipsum",
        warehouse: "ABC123",
        money: { price: 529.99, currency: "CAD" },
        inStock: -2,
      };
      chai
        .request(server)
        .post("/api/v1/items")
        .send(item)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("error")
            .eql("The amount of items in stock must be greater or equal to 0");
          done();
        });
    });

    it("It should not POST an item if item price is less than 0", (done) => {
      let item = {
        name: "Samsung Galaxy A53",
        description: "Lorem Ipsum",
        warehouse: "ABC123",
        money: { price: -529.99, currency: "CAD" },
        inStock: 2,
      };
      chai
        .request(server)
        .post("/api/v1/items")
        .send(item)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("error")
            .eql("Price must be greater or equal to 0");
          done();
        });
    });

    it("It should not POST an item with wrong warehouse id", (done) => {
      let item = {
        name: "Samsung Galaxy A53",
        warehouse: "ABC123456",
        inStock: 2,
      };
      chai
        .request(server)
        .post("/api/v1/items")
        .send(item)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("error")
            .eql("Warehouse does not exist");
          done();
        });
    });

    it("It should not POST an item with wrong currency", (done) => {
      let item = {
        name: "Samsung Galaxy A53",
        warehouse: "ABC123",
        money: { price: 529.99, currency: "GBP" },
        inStock: 2,
      };
      chai
        .request(server)
        .post("/api/v1/items")
        .send(item)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("error")
            .eql(
              `Wrong currency. Only ${currencies.join(
                ", "
              )} or empty string allowed`
            );
          done();
        });
    });

    it("It should not POST an item if only currency is given", (done) => {
      let item = {
        name: "Samsung Galaxy A53",
        warehouse: "ABC123",
        money: { currency: "GBP" },
        inStock: 2,
      };
      chai
        .request(server)
        .post("/api/v1/items")
        .send(item)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("error")
            .eql("Must have price if adding currency or leave both blank.");
          done();
        });
    });

    it("It should not POST an item if only price is given", (done) => {
      let item = {
        name: "Samsung Galaxy A53",
        warehouse: "ABC123",
        money: { price: 77 },
        inStock: 2,
      };
      chai
        .request(server)
        .post("/api/v1/items")
        .send(item)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("error")
            .eql("Must have currency if adding a price or leave both blank.");
          done();
        });
    });

    it("It should POST an item", (done) => {
      let item = {
        name: "Samsung Galaxy A53",
        description: "Lorem Ipsum dolor",
        warehouse: "ABC123",
        money: { price: 529.99, currency: "CAD" },
        inStock: 20,
      };
      chai
        .request(server)
        .post("/api/v1/items")
        .send(item)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Inventory item successfully added!");
          res.body.item.should.have.property("name");
          res.body.item.should.have.property("description");
          res.body.item.should.have.property("inStock");
          res.body.item.should.have.property("warehouse");
          done();
        });
    });
  });

  // After finishing tests, empty the testing database
  after(async () => {
    try {
      await Item.deleteMany({});
    } catch (err) {
      console.error(err);
    }
  });
});
