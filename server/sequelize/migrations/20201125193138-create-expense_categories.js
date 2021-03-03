module.exports.up = (queryInterface, DataTypes) => {
    return queryInterface.createTable(
        "expense_categories",
        {
            category_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            category_name: {
                type: DataTypes.STRING,
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
            }
        },
        {
            charset: "utf8"
        }
    );
};

module.exports.down = queryInterface => queryInterface.dropTable("expense_categories");
