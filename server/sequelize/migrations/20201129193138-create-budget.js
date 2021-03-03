module.exports.up = (queryInterface, DataTypes) => {
    return queryInterface.createTable(
        "budget",
        {
            budget_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            user_id: {
                allowNull: false,
                references: {
                    key: "user_id",
                    model: "users",
                },
                type: DataTypes.INTEGER.UNSIGNED,
            },
            amount: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            budget_date: {
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

module.exports.down = (queryInterface) => queryInterface.dropTable("budget");
