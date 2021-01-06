import "mocha";
import request from "supertest";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import createServer from "server";

chai.use(chaiHttp);
const app = createServer();

describe("API PRODUCT", () => {
    it("GET: Product /", async () => {
        const res = await request(app).get("/product");
        expect(res).to.have.status(200);
    });

    it("GET: get all Products", async () => {
        const res = await request(app).get("/product/getall");
        expect(res).to.have.status(200);
        expect(res).to.be.an("object");
        expect(res.body.data[0])
            .to.be.an("object")
            .that.has.keys(
                "product_id",
                "category_id",
                "product_name",
                "in_stock",
                "price",
                "createdAt",
                "updatedAt",
            );
    });

    it("POST: create a Product", async () => {
        const res = await request(app).post("/product/create").send({
            product_name: "TEST_CREATE_PRODUCT1",
            category_id: 1,
            in_stock: 100,
            price: 5000,
        });
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals("success");
    });

    it("GET: Product By ID", async () => {
        const res = await request(app).get("/product/get/1");
        expect(res).to.have.status(200);
        expect(res.body.data[0]).to.have.property("product_id").to.be.equal(1);
        // expect(res.body.data[0]).to.have.property("product_name").to.be.equal("new_name3");
    });

    it("PUT: Update info Product ", async () => {
        const res = await request(app).put("/product/update").send({
            product_id: 1,
            category: 1,
            product_name: "TEST_UPDATED_PRODUCT2",
            in_stock: 151,
            price: 6499,
        });
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals("success");
    });

    it("DEL: remove Product", async () => {
        const res = await request(app).delete("/product/delete/11");
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals("success");
    });
});
