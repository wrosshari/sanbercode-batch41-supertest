const { expect } = require("chai");
const request = require("supertest");
const {baseUrl, token} = require("../env/config.js");

const productId = "b064328f-158a-4fb6-adca-ccee89534ef3";

describe("Get product detail", () => {
    it("Get product detail with valid id", async () => {
        const response = request(baseUrl)
        .get("/products/" + productId)
        .set({
          "Authorization": `Bearer ${token}`
        })
        expect((await response).status).to.equal(200);     
        expect((await response).body.data.product.name).to.equal("taro ball");
        expect((await response).body.data.product.price).to.equal(3500); 
        expect((await response).body.data.product.category_id).to.equal("7c4d44ff-1904-47e2-86ea-053c8e07461f"); 
    })

    it("Get product detail with invalid id", async () => {
        const response = request(baseUrl)
        .get("/products/xxxx")
        .set({
          "Authorization": `Bearer ${token}`
        })
        expect((await response).status).to.equal(404);     
        expect((await response).body.status).to.equal("fail");
        expect((await response).body.message).to.equal("id tidak valid"); 
    })
})

