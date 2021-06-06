const SequelizeMock = require("sequelize-mock");
const expect = require("chai").expect;

const dbMock = new SequelizeMock();

const BudgetMock = dbMock.define(
    "budget",
    {
        budget_id: 1,
        amount: 20000,
        user_id: 2,
        budget_date: "2020-12-01 12:10:01",
    },
    {
        instanceMethods: {
            myTestFunc: function () {
                return "Budget: " + this.get("amount");
            },
        },
    },
);

// From there we can start using it like a normal model
const getBudget = function (budgetId) {
    return BudgetMock.findOne({
        where: {
            budget_id: budgetId,
        },
    }).then(function (budget) {
        return budget.myTestFunc();
    });
};

describe("#getBudget", function () {
    it("should return [Budget: amount]", function (done) {
        getBudget(1)
            .then(function (budget) {
                expect(budget).to.equals("Budget: 20000");

                done();
            })
            .catch(done);
    });
});
