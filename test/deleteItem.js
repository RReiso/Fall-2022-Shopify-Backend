let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
const Item = require("../src/v1/models/ItemsModel");

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

  describe("Test PUT route /api/v1/items/:id/delete", () => {
    it("It should change isDeleted status to true", (done) => {
      chai
        .request(server)
        .put(`/api/v1/items/${item._id}/delete`)
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("isDeleted").eql(true);
          done();
        });
    });

    it("It should add deletion comments", (done) => {
      chai
        .request(server)
        .put(`/api/v1/items/${item._id}/delete`)
        .send({ deletionComments: "Deleting" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("deletionComments").eql("Deleting");
          done();
        });
    });

    it("It should not delete item that does not exist", (done) => {
      const fakeID = "111111111111111111111111";
      chai
        .request(server)
        .put(`/api/v1/items/${fakeID}/delete`)
        .send()
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error").eql("Item does not exist");
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
