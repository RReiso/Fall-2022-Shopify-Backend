let chai = require("chai");
let chaiHttp = require("chai-http");
const seedProducts = require("../src/db/seeds");
let server = require("../src/server");
const Item = require("../src/v1/models/ItemsModel");

chai.should();
chai.use(chaiHttp);

describe("Items", () => {
  //Before tests add items to the testing database
  before((done) => {
    Item.insertMany(seedProducts, (err) => {
      done();
    });
  });

  describe("Test GET route /api/v1/items", () => {
    it("It should return all items", (done) => {
      chai
        .request(server)
        .get("/api/v1/items")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.not.be.eq(0);
          response.body.length.should.be.eq(seedProducts.length);
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
