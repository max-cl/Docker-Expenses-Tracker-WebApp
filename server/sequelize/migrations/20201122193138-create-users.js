module.exports.up = (queryInterface, DataTypes) => {
    return queryInterface.createTable(
        'users',
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
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
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
            resetPasswordToken: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null,
            },
            resetPasswordExpires: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                defaultValue: null,
            },
        },
        {
            charset: 'utf8',
        }
    );
};

module.exports.down = (queryInterface) => queryInterface.dropTable('users');
