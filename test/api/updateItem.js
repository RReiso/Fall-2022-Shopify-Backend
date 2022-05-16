let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../server");
const Item = require("../../src/v1/models/ItemsModel");

chai.should();
chai.use(chaiHttp);

describe("Items", () => {
  //Before tests add new item to the testing database
  let item;
  beforeEach((done) => {
    item = new Item({
      name: "Samsung Galaxy A53",
      type: "Smartphone",
      description: "Lorem Ipsum",
      warehouse: "ABC123",
      money: { price: 529.99, currency: "CAD" },
      inStock: 20,
    });
    item.save().then(() => done());
  });

  describe("Test PUT route /api/v1/items/:id", () => {
    it("It should not update item if request body is empty", (done) => {
      chai
        .request(server)
        .put(`/api/v1/items/${item.id}`)
        .send()
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("error")
            .eql("Request body is empty. You must specify a field.");
          done();
        });
    });

    it("It should not update item that does not exist", (done) => {
      const fakeID = "111111111111111111111111";
      const updatedData = { description: "Lorem ipsum sit dolor" };

      chai
        .request(server)
        .put(`/api/v1/items/${fakeID}`)
        .send(updatedData)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error").eql("Item does not exist");
          done();
        });
    });

    it("It should not update deleted item", (done) => {
      item.isDeleted = true;
      item.save();
      const updatedData = { description: "Lorem ipsum sit dolor" };

      chai
        .request(server)
        .put(`/api/v1/items/${item.id}`)
        .send(updatedData)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("error")
            .eql("Cannot update deleted item");
          done();
        });
    });

    it("It should not update item's 'isDeleted' field", (done) => {
      const updatedData = { isDeleted: true };

      chai
        .request(server)
        .put(`/api/v1/items/${item.id}`)
        .send(updatedData)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("error")
            .eql("Update not allowed for field 'isDeleted'");
          done();
        });
    });

    it("It should update item", (done) => {
      const updatedData = { description: "Lorem ipsum sit dolor" };

      chai
        .request(server)
        .put(`/api/v1/items/${item.id}`)
        .send(updatedData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("description")
            .eql("Lorem ipsum sit dolor");
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
