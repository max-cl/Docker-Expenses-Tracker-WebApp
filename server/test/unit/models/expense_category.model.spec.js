const SequelizeMock = require("sequelize-mock");
const expect = require("chai").expect;

const dbMock = new SequelizeMock();

const ExpenseCategoryMock = dbMock.define(
    "expense_categories",
    {
        category_id: 1,
        category_name: "Clothes",
    },
    {
        instanceMethods: {
            myTestFunc: function () {
                return this.get("category_id") + " : " + this.get("category_name");
            },
        },
    },
);

// From there we can start using it like a normal model
const getExpenseCategory = function (categoryId) {
    return ExpenseCategoryMock.findOne({
        where: {
            category_id: categoryId,
        },
    }).then(function (category) {
        return category.myTestFunc();
    });
};

describe("#getExpenseCategory", function () {
    it("should return [category_id : category_name]", function (done) {
        getExpenseCategory(1)
            .then(function (category) {
                expect(category).to.equals("1 : Clothes");

                done();
            })
            .catch(done);
    });
});
