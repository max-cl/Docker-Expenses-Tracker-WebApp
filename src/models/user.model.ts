import { Model, DataTypes, Sequelize, BelongsToManySetAssociationsMixin, Optional } from "sequelize";
import { Role } from "./role.model";

// These are all the attributes in the User model
interface UserAttributes {
    user_id?: number;
    first_name: string;
    last_name: string;
    phone: number;
    email: string;
    username: string;
    password: string;
    description: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<UserAttributes, "user_id"> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public user_id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public first_name!: string;
    public last_name!: string;
    public phone!: number;
    public email!: string;
    public username!: string;
    public password!: string;
    public description!: string;
    public active!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    public setRoles!: BelongsToManySetAssociationsMixin<Role, number>;
}

export default (sequelize: Sequelize): typeof User => {
    User.init(
        {
            user_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true,
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
            tableName: "users",
            modelName: "User",
            // underscored: true,
            sequelize, // passing the `sequelize` instance is required
        },
    );

    return User;
};
