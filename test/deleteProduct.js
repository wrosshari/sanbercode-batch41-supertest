const { expect } = require("chai");
const request = require("supertest");
const {baseUrl, token, productId} = require("../env/config.js");

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