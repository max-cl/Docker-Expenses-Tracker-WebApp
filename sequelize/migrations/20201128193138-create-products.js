module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "products",
    {
      product_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED
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
        allowNull: false,
        type: DataTypes.STRING
      },
      in_stock: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED
      },
      price: {
        allowNull: false,
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

module.exports.down = queryInterface => queryInterface.dropTable("products");
