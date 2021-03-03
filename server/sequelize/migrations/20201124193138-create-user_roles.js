module.exports.up = (queryInterface, DataTypes) => {
    return queryInterface.createTable(
        "user_roles",
        {
            user_id: {
                allowNull: false,
                references: {
                    key: "user_id",
                    model: "users"
                },
                type: DataTypes.INTEGER.UNSIGNED
            },
            role_id: {
                allowNull: false,
                references: {
                    key: "role_id",
                    model: "roles"
                },
                type: DataTypes.INTEGER.UNSIGNED
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            deletedAt: {
                allowNull: true,
                type: DataTypes.DATE
            }
        },
        {
            charset: "utf8"
        }
    );
};

module.exports.down = queryInterface => queryInterface.dropTable("user_roles");
