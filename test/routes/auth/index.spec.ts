import "mocha";
import request from "supertest";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import createServer from "../../../src/server";

chai.use(chaiHttp);
const app = new createServer().app;

describe("AUTH APIs", function () {
    it("should esponds with 200 in /auth GET", function (done) {
        request(app).get("/auth").expect(200, done);
    });

    it("should Register user, login user, check token and delete a todo on /todo/<id> DELETE", async () => {
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
            console.log("ERROR: REGSITER, ", error);
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
            expect(res.body).to.have.property("isAuthenticated");
            expect(res.body).to.have.property("token");
            expect(res.body.isAuthenticated).equals(true);
            // const token = res.body.token;
            // console.log("TOKEN: ", token);
        } catch (error) {
            console.log("ERROR: LOGIN USER, ", error);
        }
    });

    it("should SIGNUP user, SINGIN user, check token and DELETE a PROUDCT on /product/:product_id DELETE", async () => {
        try {
            // START SING-UP
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

            // START SIGN-IN
            const signin = await request(app).post("/auth/signin").send({
                username: "testuserTEST2",
                password: "123123123",
            });
            expect(signin).to.have.status(200);
            console.log("It's already LOGGED IN");
            expect(signin.body).to.have.property("token");
            const token = signin.body.token;
            const user_id = signin.body.user.user_id;

            // DELETE a PRODUCT
            const productDeleted = await request(app).delete(`/product/${user_id}/2`).set("Authorization", `JWT ${token}`);
            expect(productDeleted).to.have.status(200);
            expect(productDeleted.body.message).to.equals("success");
        } catch (error) {
            console.log("ERROR: REGSITER, LOGIN and DELETE a product, ", error);
        }
    });
});
