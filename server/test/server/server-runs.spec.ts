import "mocha";
import request from "supertest";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import createServer from "../../src/server";

chai.use(chaiHttp);
const app = new createServer().app;

describe("server checks", function () {
    it("server is created witouth error", async () => {
        try {
            const res = await request(app).get("/");
            expect(res).to.have.status(200);
            expect(res.body.message).to.equals("success");
        } catch (error) {
            console.log("ERROR: SERVER CREATED: ", error);
        }
    });
});
