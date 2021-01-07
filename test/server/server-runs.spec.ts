import request from "supertest";

import createServer from "../../src/server";
const app = new createServer().app;

describe("server checks", function () {
    it("server is created witouth error", function (done) {
        request(app).get("/").expect(200, done);
    });
});
