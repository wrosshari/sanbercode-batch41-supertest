const { expect } = require("chai");
const request = require("supertest");

let token = "";

describe("Login test suite", () => {
  it("User login with valid data", async () => {
    const response = request("https://kasir-api.belajarqa.com")
      .post("/authentications")
      .send({
        "email": "samplexx@ex.com",
        "password": "123adsfadf@",
      });

      token = (await response).body.data.accessToken;
      //assert response body
      expect((await response).status).to.equal(201);
      expect((await response).body.status).to.equal("success");
      expect((await response).body.data.user.email).to.equal("samplexx@ex.com");
  });

});
