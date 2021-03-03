module.exports.up = (queryInterface, DataTypes) => {
    return queryInterface.createTable(
        "expenses",
        {
            expense_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            category_id: {
                allowNull: false,
                references: {
                    key: "category_id",
                    model: "expense_categories",
                },
                type: DataTypes.INTEGER.UNSIGNED,
            },
            user_id: {
                allowNull: false,
                references: {
                    key: "user_id",
                    model: "users",
                },
                type: DataTypes.INTEGER.UNSIGNED,
            },
            expense_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            amount: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            img_link: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            category_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            expense_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: null,
            },
        },
        {
            charset: "utf8",
        },
    );
};

module.exports.down = (queryInterface) => queryInterface.dropTable("expenses");
