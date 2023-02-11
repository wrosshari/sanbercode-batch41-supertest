const { expect } = require("chai");
const request = require("supertest");
const {baseUrl, token} = require("../env/config.js")
const jsonPayload = require("../test-data/productData.js")

const productId = "b064328f-158a-4fb6-adca-ccee89534ef3";

describe("Delete product", () => {
    it("should delete a product", async () => {
        const response = request(baseUrl)
        .delete("/products/" + productId)
        .set({
          "Authorization": `Bearer ${token}`
        })
        expect((await response).status).to.equal(200);     
        expect((await response).body.status).to.equal("success");

    })
})