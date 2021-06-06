const SequelizeMock = require("sequelize-mock");
const expect = require("chai").expect;

const dbMock = new SequelizeMock();

const ExpenseMock = dbMock.define(
    "expenses",
    {
        expense_id: 1,
        expense_name: "Shoes",
        amount: 1000,
        img_link: "image link",
        category_id: 3,
        user_id: 2,
        expense_date: "2020-12-01 12:10:18",
    },
    {
        instanceMethods: {
            myTestFunc: function () {
                return this.get("expense_id") + " : " + this.get("expense_name");
            },
        },
    },
);

// From there we can start using it like a normal model
const getExpense = function (expenseId) {
    return ExpenseMock.findOne({
        where: {
            expense_id: expenseId,
        },
    }).then(function (expense) {
        return expense.myTestFunc();
    });
};

describe("#getExpense", function () {
    it("should return an expense", function (done) {
        getExpense(1)
            .then(function (expense) {
                expect(expense).to.equals("1 : Shoes");

                done();
            })
            .catch(done);
    });
});
