const SequelizeMock = require("sequelize-mock");
const expect = require("chai").expect;

const dbMock = new SequelizeMock();

const RoleMock = dbMock.define(
    "roles",
    {
        role_id: 1,
        role_name: "Admin",
    },
    {
        instanceMethods: {
            myTestFunc: function () {
                return this.get("role_id") + " : " + this.get("role_name");
            },
        },
    },
);

// From there we can start using it like a normal model
const getRole = function (roleId) {
    return RoleMock.findOne({
        where: {
            role_id: roleId,
        },
    }).then(function (role) {
        return role.myTestFunc();
    });
};

describe("#getRole", function () {
    it("should return [role_id : role_name]", function (done) {
        getRole(1)
            .then(function (role) {
                expect(role).to.equals("1 : Admin");

                done();
            })
            .catch(done);
    });
});
