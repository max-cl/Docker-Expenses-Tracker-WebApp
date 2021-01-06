import "dotenv/config";
import { Sequelize } from "sequelize";
import UserFactory, { User } from "models/user.model";
import RoleFactory, { Role } from "models/role.model";
import ProductFactory, { Product } from "models/product.model";
import ProductCategoryFactory, { ProductCategory } from "models/product_category.model";
import OrderFactory, { Order } from "models/order.model";
import OrderDetailfactory, { OrderDetail } from "models/order_detail.model";

// Utils
import accessEnv from "../utils/accessEnv";

// ENV Variables
const DB_URL = accessEnv("DB_URL");

export interface DB {
    sequelize: Sequelize;
    User: typeof User;
    Role: typeof Role;
    Product: typeof Product;
    ProductCategory: typeof ProductCategory;
    Order: typeof Order;
    OrderDetail: typeof OrderDetail;
}

const sequelize = new Sequelize(`${DB_URL}`);

// SOMETHING VERY IMPORTANT them Factory functions expect a
// sequelize instance as parameter give them `dbConfig`
export const UserModel = UserFactory(sequelize);
export const RoleModel = RoleFactory(sequelize);
export const ProductModel = ProductFactory(sequelize);
export const ProductCategoryModel = ProductCategoryFactory(sequelize);
export const OrderModel = OrderFactory(sequelize);
export const OrderDetailModel = OrderDetailfactory(sequelize);

/** MANAGE USER AND ROLES */
UserModel.belongsToMany(RoleModel, { through: "user_roles", foreignKey: "user_id", otherKey: "role_id" });

/** Products / Categories Product */
ProductCategoryModel.hasOne(ProductModel, { foreignKey: "category_id" });

/** Orders */
UserModel.hasOne(OrderModel, { foreignKey: "user_id" });
OrderModel.belongsToMany(ProductModel, { through: OrderDetailModel.name, foreignKey: "order_id" });
ProductModel.belongsToMany(OrderModel, { through: OrderDetailModel.name, foreignKey: "product_id" });

export const db: DB = {
    sequelize,
    User: UserModel,
    Role: RoleModel,
    Product: ProductModel,
    ProductCategory: ProductCategoryModel,
    Order: OrderModel,
    OrderDetail: OrderDetailModel,
};
