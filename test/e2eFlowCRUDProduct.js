const { expect } = require("chai");
const request = require("supertest");
const { baseUrl } = require("../env/config.js");
const jsonPayload = require("../test-data/productData.js");

describe("e2e product flow", () => {
  var token;
  var productName;
  var productId;

  before(async () => {
    const response = request(baseUrl)
      .post("/authentications")
      .send(jsonPayload.login);

    expect((await response).status).to.equal(201);
    expect((await response).body.data.accessToken).not.to.be.null;

    token = (await response).body.data.accessToken;
  });

  it("Admin add new product with valid data", async () => {
    const response = request(baseUrl)
      .post("/products") //http method +
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send(jsonPayload.addProduct);

    //assert response body
    expect((await response).status).to.equal(201);
    expect((await response).body.status).to.equal("success");
    expect((await response).body.data.name).to.equal(jsonPayload.addProduct.name);

    productName = (await response).body.data.name;
  });

  it("Get list of products", async () => {
    const response = request(baseUrl)
      .get("/products")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect((await response).status).to.equal(200);
    expect((await response).body.data.products[0].name).to.equal(productName);

    productId = (await response).body.data.products[0].id;
  });

  it("Get product detail with valid id", async () => {
    const response = request(baseUrl)
      .get("/products/" + productId)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect((await response).status).to.equal(200);
    expect((await response).body.data.product.name).to.equal("taro ball");
    expect((await response).body.data.product.price).to.equal(3500);
    expect((await response).body.data.product.category_id).to.equal(jsonPayload.addProduct.category_id);
  });

  it("Update product data with valid data", async () => {
    const response = request(baseUrl)
      .put("/products/" + productId)
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send(jsonPayload.updateProduct);

    expect((await response).status).to.equal(200);
    expect((await response).body.status).to.equal("success");
    expect((await response).body.data.name).to.equal(jsonPayload.updateProduct.name);
  });

  it("Delete product", async () => {
    const response = request(baseUrl)
      .delete("/products/" + productId)
      .set({
        Authorization: `Bearer ${token}`,
      });
      
    expect((await response).status).to.equal(200);
    expect((await response).body.status).to.equal("success");
  });
});
