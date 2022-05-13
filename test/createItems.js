let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/server");

chai.should();
chai.use(chaiHttp);

describe("Items", () => {
  describe("Test POST route /api/v1/items", () => {
    it("It should POST an item", (done) => {
      let item = {
        name: "Samsung Galaxy A53",
        type: "Smartphone",
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

    it("It should not POST an item without the name field", (done) => {
      let item = {
        type: "Smartphone",
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
            .property("message")
            .eql(
              "Missing one or more required fields: (name, type, warehouse, inStock)"
            );
          done();
        });
    });

    it("It should not POST an item if inStock count is lesss than 0", (done) => {
      let item = {
        name: "Samsung Galaxy A53",
        type: "Smartphone",
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
            .property("message")
            .eql("The amount of items in stock must be greater or equal to 0");
          done();
        });
    });
  });

  it("It should not POST an item if item price is lesss than 0", (done) => {
    let item = {
      name: "Samsung Galaxy A53",
      type: "Smartphone",
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
          .property("message")
          .eql("Price must be greater or equal to 0");
        done();
      });
  });
  // describe("Test GET route /api/v1/items", () => {
  //   it("It should return all items", (done) => {
  //     chai
  //       .request(server)
  //       .get("/api/v1/items")
  //       .end((err, response) => {
  //         response.should.have.status(200);
  //         response.body.should.be.a("array");
  //         response.body.length.should.not.be.eq(0);
  //         done();
  //       });
  //   });
  // });
});
