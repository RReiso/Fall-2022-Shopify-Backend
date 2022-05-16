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
      description: "Lorem Ipsum",
      warehouse: "ABC123",
      money: { price: 529.99, currency: "CAD" },
      inStock: 20,
    });
    item.save().then(() => done());
  });

  describe("Test GET route /api/v1/items/:id", () => {
    it("It should find item", (done) => {
      chai
        .request(server)
        .get(`/api/v1/items/${item._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("name");
          res.body.should.have.property("description");
          res.body.should.have.property("inStock");
          res.body.should.have.property("money");
          res.body.should.have.property("warehouse");
          done();
        });
    });

    it("It should not find item if it does nto exist", (done) => {
      const fakeID = "111111111111111111111111";

      chai
        .request(server)
        .get(`/api/v1/items/${fakeID}`)
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
