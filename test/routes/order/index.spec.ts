import "mocha";
import request from "supertest";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import createServer from "../../../src/server";

chai.use(chaiHttp);
const app = new createServer().app;

describe("API ORDER", () => {
    it("GET: ORDER /", async () => {
        try {
            const res = await request(app).get("/order");
            expect(res).to.has.status(200);
        } catch (error) {
            console.log("ERROR: GET: ORDER / , ", error);
        }
    });

    it("should add ORDER on /order POST", async () => {
        try {
            const res = await request(app)
                .post("/order")
                .send({
                    user_id: 2,
                    products: [
                        { quantity: 18, product_id: 2 },
                        { quantity: 8, product_id: 4 },
                    ],
                });
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            expect(res).to.be.an("object");
        } catch (error) {
            console.log("ERROR: POST a new ORDER: ", error);
        }
    });

    it("shoud list ALL ORDERS on /order GET", async () => {
        try {
            const res = await request(app).get("/order/2");
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res).to.be.an("object");
            expect(res.body.data[0]).to.have.property("order_id");
            expect(res.body.data[0]).to.have.property("order_date");
            expect(res.body.data[0]).to.have.property("createdAt");
            expect(res.body.data[0]).to.have.property("updatedAt");
            expect(res.body.data[0]).to.have.property("deletedAt");
            expect(res.body.data[0]).to.have.property("user_id");
        } catch (error) {
            console.log("ERROR: GET ALL ORDERS, : ", error);
        }
    });

    it("should a ORDER by ID on /order/:user_id/:order_id GET", async () => {
        const res = await request(app).get("/order/2/8");
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.be.an("object");
        expect(res.body.data[0].order).to.have.property("order_id").to.be.equal(8);
    });

    it("should update the status an ORDER on /order PUT", async () => {
        const res = await request(app).put("/order").send({
            odetail_id: 41,
            quantity: 23,
            user_id: 2,
        });
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals("success");
    });

    it("should delete a PRODUCT from an Order on /order/product/:user_id/:odetail_id DELETE", async () => {
        const res = await request(app).delete("/order/product/2/34");
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals("success");
    });

    it("should delete a ORDER on /order/:user_id/:order_id DELETE", async () => {
        const res = await request(app).delete("/order/2/25");
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals("success");
    });
});
