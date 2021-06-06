const SequelizeMock = require("sequelize-mock");
const expect = require("chai").expect;

const dbMock = new SequelizeMock();

const UserMock = dbMock.define(
    "users",
    {
        user_id: 1,
        first_name: "Jose",
        last_name: "Peres",
        email: "jose.mail.com",
        username: "jose10",
        password: "123123",
        active: true,
    },
    {
        instanceMethods: {
            myTestFunc: function () {
                return this.get("user_id") + " : " + this.get("username");
            },
        },
    },
);

// From there we can start using it like a normal model
const getUser = function (userId) {
    return UserMock.findOne({
        where: {
            user_id: userId,
        },
    }).then(function (user) {
        return user.myTestFunc();
    });
};

describe("#getUser", function () {
    it("should return [user_id : username]", function (done) {
        getUser(1)
            .then(function (user) {
                expect(user).to.equals("1 : jose10");

                done();
            })
            .catch(done);
    });
});
