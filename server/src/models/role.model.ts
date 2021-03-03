import { Model, DataTypes, Sequelize, Optional } from "sequelize";

export interface RoleAttributes {
    role_id?: number;
    role_name: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface RoleCreationAttributes extends Optional<RoleAttributes, "role_id"> {}

export class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
    public role_id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public role_name!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize): typeof Role => {
    Role.init(
        {
            role_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            role_name: {
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
            },
        },
        {
            tableName: "roles",
            modelName: "Role",
            sequelize,
        },
    );

    return Role;
};
