import "mocha";
import request from "supertest";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import createServer from "../../../src/server";

chai.use(chaiHttp);
const app = new createServer().app;

describe("AUTH APIs", function () {
    it("should responds with 200 in /auth GET", async () => {
        try {
            const res = await request(app).get("/auth");
            expect(res).to.have.status(200);
            expect(res.body.message).to.equals("success");
        } catch (error) {
            console.log("ERROR: /auth: ", error);
        }
    });

    it("should Register user /auth/signup POST", async () => {
        try {
            // register request and send user information
            const res = await request(app).post("/auth/signup").send({
                first_name: "first name TEST",
                last_name: "last name TEST",
                phone: 123123123,
                username: "testuserTEST",
                password: "123123123",
                repeat_password: "123123123",
                email: "testTEST@mail.com",
                description: "decription TEST",
                roles: "Admin",
            });
            // the res object should have a status of 201
            expect(res).to.have.status(201);
        } catch (error) {
            console.log("ERROR: REGISTERING an USER, ", error);
        }
    });

    it("shoud login user /auth/signin POST", async () => {
        try {
            const res = await request(app).post("/auth/signin").send({
                username: "testuserTEST",
                password: "123123123",
            });
            expect(res).to.have.status(200);
            console.log("It's already LOGGED IN");
            expect(res.body.data).to.have.property("isAuthenticated");
            expect(res.body.data).to.have.property("token");
            expect(res.body.data.isAuthenticated).equals(true);
            // const token = res.body.token;
            // console.log("TOKEN: ", token);
        } catch (error) {
            console.log("ERROR: LOGIN USER, ", error);
        }
    });

    it("should SIGNUP user, SINGIN user, check token and DELETE a EXPENSE on /expense/:expense_id DELETE", async () => {
        try {
            // START SING-UP
            console.log("[TEST: SIGN-UP...]");
            const signup = await request(app).post("/auth/signup").send({
                first_name: "first name TEST2",
                last_name: "last name TEST2",
                phone: 123123123,
                username: "testuserTEST2",
                password: "123123123",
                repeat_password: "123123123",
                email: "testTEST2@mail.com",
                description: "decription TEST2",
                roles: "Admin",
            });
            // the res object should have a status of 201
            expect(signup).to.have.status(201);

            // // START SIGN-IN
            console.log("[TEST: LOGIN...]");
            const signin = await request(app).post("/auth/signin").send({
                username: "testuserTEST2",
                password: "123123123",
            });
            expect(signin).to.have.status(200);
            expect(signin.body.data).to.have.property("token");
            const token = signin.body.data.token;
            const user_id = signin.body.data.user.user_id;
            console.log("[TEST: It's already LOGGED IN..]");

            // DELETE a EXPENSE
            console.log("[TEST: Deleting a expense...]");
            const expense_id = 90; // Change manually
            const expenseDeleted = await request(app).delete(`/expense/${user_id}/${expense_id}`).set("Authorization", `JWT ${token}`);
            expect(expenseDeleted).to.have.status(200);
            expect(expenseDeleted.body.data.message).to.equals("success");
            console.log(`[TEST: Expense deleted ID: ${expense_id}]`);
        } catch (error) {
            console.log("ERROR: REGSITER, LOGIN and DELETE a product, ", error);
        }
    });
});
