import "mocha";
import request from "supertest";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import createServer from "../../../src/server";

chai.use(chaiHttp);
const app = new createServer().app;

describe("API PRODUCT", () => {
    it("GET: PRODUCT /", async () => {
        const res = await request(app).get("/product");
        expect(res).to.have.status(200);
    });

    it("should add a PRODUCT on /product POST", async () => {
        try {
            const res = await request(app).post("/product").send({
                product_name: "TEST_CREATE_PRODUCT1",
                category_id: 1,
                in_stock: 100,
                price: 5000,
                user_id: 2,
            });
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            expect(res).to.be.an("object");
            // expect(res.body.message).to.equals("success");
        } catch (error) {
            console.log("ERROR: POST a new PRODUCT: ", error);
        }
    });

    it("should list ALL PRODUCTS on /product GET", async () => {
        try {
            const res = await request(app).get("/product/2");
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res).to.be.an("object");
            expect(res.body.data[0]).to.have.property("product_id");
            expect(res.body.data[0]).to.have.property("category_id");
            expect(res.body.data[0]).to.have.property("product_name");
            expect(res.body.data[0]).to.have.property("in_stock");
            expect(res.body.data[0]).to.have.property("price");
            expect(res.body.data[0]).to.have.property("createdAt");
            expect(res.body.data[0]).to.have.property("updatedAt");
            expect(res.body.data[0]).to.have.property("deletedAt");
            // expect(res.body.data[0]).to.be.an("object").that.has.keys("product_id", "category_id", "product_name", "in_stock", "price", "createdAt", "updatedAt", "deletedAt");
        } catch (error) {
            console.log("ERROR: GET ALL PRODUCTS: ", error);
        }
    });

    it("should a PRODUCT by ID on /product/:user_id/:product_id GET", async () => {
        const res = await request(app).get("/product/2/2");
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.be.an("object");
        expect(res.body.data[0]).to.have.property("product_id").to.be.equal(2);
        // expect(res.body.data[0]).to.have.property("product_name").to.be.equal("new_name3");
    });

    it("should update the status of a Product on /product PUT", async () => {
        const res = await request(app).put("/product").send({
            product_id: 2,
            category_id: 1,
            product_name: "TEST_UPDATED_PRODUCT2",
            in_stock: 151,
            price: 6499,
            user_id: 2,
        });
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals("success");
    });

    it("should delete a Product on /product/:user_id/:product_id DELETE without Auth Token", async () => {
        const res = await request(app).delete("/product/2/12");
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals("success");
    });
});
