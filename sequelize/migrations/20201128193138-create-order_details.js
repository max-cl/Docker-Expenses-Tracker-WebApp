module.exports.up = (queryInterface, DataTypes) => {
    return queryInterface.createTable(
        "order_details",
        {
            odetail_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            order_id: {
                allowNull: false,
                references: {
                    key: "order_id",
                    model: "orders"
                },
                type: DataTypes.INTEGER.UNSIGNED
            },
            product_id: {
                allowNull: false,
                references: {
                    key: "product_id",
                    model: "products"
                },
                type: DataTypes.INTEGER.UNSIGNED
            },
            quantity: {
                type: DataTypes.INTEGER.UNSIGNED,
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

module.exports.down = queryInterface => queryInterface.dropTable("product_categories");
