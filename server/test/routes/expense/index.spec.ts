import "mocha";
import request from "supertest";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import createServer from "../../../src/server";

chai.use(chaiHttp);
const app = new createServer().app;

describe("API EXPENSE", () => {
    it("GET: EXPENSE /", async () => {
        const res = await request(app).get("/expense");
        expect(res).to.have.status(200);
    });

    it("should add a EXPENSE on /expense POST", async () => {
        try {
            const res = await request(app).post("/expense").send({
                expense_name: "TEST_CREATE_EXPENSE1",
                category_id: 1,
                amount: 5000,
                img_link: "http:/img.com",
                expense_date: "2021-01-15 16:24:40",
                user_id: 1,
            });
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            expect(res).to.be.an("object");
            expect(res.body.data.message).to.equals("success");
        } catch (error) {
            console.log("ERROR: POST a new EXPENSE: ", error);
        }
    });

    it("should list ALL EXPENSES on /expense GET", async () => {
        try {
            const res = await request(app).get("/expense/1");
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res).to.be.an("object");
            expect(res.body.data[0]).to.have.property("expense_id");
            expect(res.body.data[0]).to.have.property("category_id");
            expect(res.body.data[0]).to.have.property("expense_name");
            expect(res.body.data[0]).to.have.property("amount");
            expect(res.body.data[0]).to.have.property("img_link");
            expect(res.body.data[0]).to.have.property("expense_date");
        } catch (error) {
            console.log("ERROR: GET ALL EXPENSES: ", error);
        }
    });

    it("should a EXPENSE by ID on /expense/:user_id/:expense_id GET", async () => {
        const res = await request(app).get("/expense/1/11");
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.be.an("object");
        expect(res.body.data[0]).to.have.property("expense_id").to.be.equal(11);
    });

    it("should update the status of a EXPENSE on /expense PUT", async () => {
        const res = await request(app).put("/expense").send({
            expense_id: 12,
            category_id: 1,
            expense_name: "TEST_UPDATED_EXPENSE89",
            amount: 151,
            img_link: "http://asd",
            expense_date: "2021-01-10 11:12:10",
            user_id: 1,
        });
        expect(res).to.have.status(200);
        expect(res.body.data.message).to.equals("success");
    });

    it("should delete an Expense on /expense/:user_id/:expense_id DELETE without Auth Token", async () => {
        const res = await request(app).delete("/expense/1/11");
        expect(res).to.have.status(200);
        expect(res.body.data.message).to.equals("success");
    });
});
