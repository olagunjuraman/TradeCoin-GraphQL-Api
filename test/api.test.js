const request = require("supertest");
const dotenv = require("dotenv");

dotenv.config({
  path: "../config/config.env",
});

let server;

describe("GraphQL", () => {
  beforeEach(() => {
    server = require("../server");
  });
  afterEach(() => {
    server.close();
  });

  it("Should return the price for type buy", async () => {
    const res = await request(server).post("/graphql").send({
      query:
        '{calculatePrice(type: "buy", margin: 0.2, exchangeRate: "USD") { price currency type } }',
    });

    expect(res.body.data.calculatePrice).toHaveProperty("price");
    expect(res.body.data.calculatePrice).toHaveProperty("currency");
    expect(res.body.data.calculatePrice).toHaveProperty("type");
  });

  it("Should return the price for type sell", async () => {
    const res = await request(server).post("/graphql").send({
      query:
        '{calculatePrice(type: "sell", margin: 0.2, exchangeRate: "USD") { price currency type } }',
    });

    expect(res.body.data.calculatePrice).toHaveProperty("price");
    expect(res.body.data.calculatePrice).toHaveProperty("currency");
    expect(res.body.data.calculatePrice).toHaveProperty("type");
  });
});
