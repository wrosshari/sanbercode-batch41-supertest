const { expect } = require("chai");
const request = require("supertest");
const {baseUrl, token} = require("../env/config.js")
const jsonPayload = require("../test-data/productData.js")

const productId = "b064328f-158a-4fb6-adca-ccee89534ef3";

describe("Update product data positive case", () => {
    it("Update product data with valid data", async () => {
        const response = request(baseUrl)
        .put("/products/" + productId)
        .set({
          "Authorization": `Bearer ${token}`
        })
        .send(jsonPayload.updateProduct)
        expect((await response).status).to.equal(200);     
        expect((await response).body.status).to.equal("success");
        expect((await response).body.data.name).to.equal("taro");
    })
})

describe("Update product data negative case", () => {
    it("Update product data with invalid category id", async () => {
        const response = request(baseUrl)
        .put("/products/" + productId)
        .set({
          "Authorization": `Bearer ${token}`
        })
        .send({
            "category_id" : "xxx",
            "code": "A314ASDDFIER3432",
            "name": "taro",
            "price": "4000",
            "cost": "3000",
            "stock": "1"
         }
         )
        expect((await response).status).to.equal(400);     
        expect((await response).body.status).to.equal("fail");
    })

    it("Update product data with invalid stock", async () => {
        const response = request(baseUrl)
        .put("/products/" + productId)
        .set({
          "Authorization": `Bearer ${token}`
        })
        .send({
            "category_id" : "7c4d44ff-1904-47e2-86ea-053c8e07461f",
            "code": "A314ASDDFIER3432",
            "name": "taro",
            "price": "3500",
            "cost": "3000",
            "stock": "empty"
         }
         )
        expect((await response).status).to.equal(400);     
        expect((await response).body.status).to.equal("fail");
    })
})