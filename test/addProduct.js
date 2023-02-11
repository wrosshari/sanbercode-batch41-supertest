const { expect } = require("chai");
const request = require("supertest");
const {baseUrl, token} = require("../env/config.js")
const jsonPayload = require("../test-data/productData.js")


describe("Add Product positive test case", () => {
  it("Admin add new product with valid data", async () => {
    const response = request(baseUrl)
      .post("/products") //http method + 
      .set({
        "Authorization": `Bearer ${token}`
      })
      .send(jsonPayload.addProduct);
      //assert response body
      expect((await response).status).to.equal(201);
      expect((await response).body.status).to.equal("success");     
      expect((await response).body.data.name).to.equal(`taro ball`);  
  });
});

describe("Add Product negative test case", () => {
  it("Admin add new product without token", async () => {
    const response = request(baseUrl)
      .post("/products") //http method + 
      .send({
        "category_id" : "7c4d44ff-1904-47e2-86ea-053c8e07461f",
        "code": "A314ASD",
        "name": `taro ball`,
        "description": "makanan yang sangat lezat",
        "price": "3500",
        "cost": "3000",
        "stock": "5"
     });
      //assert response body
      expect((await response).status).to.equal(401);
      expect((await response).body.error).to.equal("Unauthorized");          
  });
  
  it("Admin add new product with price = 0", async () => {
    const response = request(baseUrl)
      .post("/products") //http method + 
      .set({
        "Authorization": `Bearer ${token}`
      })
      .send({
        "category_id" : "7c4d44ff-1904-47e2-86ea-053c8e07461f",
        "code": "A314ASD",
        "name": `taro ball`,
        "description": "makanan yang sangat lezat",
        "price": "0",
        "cost": "3000",
        "stock": "5"
     });
      //assert response body
      expect((await response).status).to.equal(400);
      expect((await response).body.status).to.equal("fail");          
  });

  it("Admin add new product with invalid category id", async () => {
    const response = request(baseUrl)
      .post("/products") //http method + 
      .set({
        "Authorization": `Bearer ${token}`
      })
      .send({
        "category_id" : "XXX123",
        "code": "A314ASD",
        "name": "taro ball",
        "description": "makanan yang sangat lezat",
        "price": "4500",
        "cost": "3000",
        "stock": "5"
     });
      //assert response body
      expect((await response).status).to.equal(400);
      expect((await response).body.status).to.equal("fail");         
  });
});





