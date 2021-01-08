module.exports.up = (queryInterface, DataTypes) => {
    return queryInterface.createTable(
        "products",
        {
            product_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            category_id: {
                allowNull: false,
                references: {
                  key: "category_id",
                  model: "product_categories"
                },
                type: DataTypes.INTEGER.UNSIGNED
            },
            product_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            in_stock: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            category_id: {
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

module.exports.down = queryInterface => queryInterface.dropTable("products");
