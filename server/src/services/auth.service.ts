import Sequelize from "sequelize";

// Models
import { DB } from "models";

// Interfaces
import { UserRegister } from "interfaces/auth.interface";

// Sequelize
const Op = Sequelize.Op;

export class AuthService {
    public constructor(private db: DB) {}

    public getUserByUsernameOrEmail = async (username: string, email: string) => {
        const user = await this.db.User.findOne({ where: { [Op.or]: [{ username }, { email }] } });
        return user;
    };

    public createUser = async (data: UserRegister) => {
        const { first_name, last_name, phone, email, active, description, username, password } = data;
        const created = await this.db.User.create({
            first_name,
            last_name,
            phone,
            username,
            password,
            email,
            active,
            description,
        });
        return created;
    };

    public getRoleByName = async (role_name: string) => {
        const roleInfo = await this.db.Role.findAll({ where: { role_name: role_name.toUpperCase() } });
        return roleInfo;
    };

    public getUserByUsername = async (username: string) => {
        const saved = await this.db.User.findOne({ where: { username } });
        return saved;
    };

    public getUserByEmail = async (email: string) => {
        const userFound = await this.db.User.findOne({ where: { email } });
        return userFound;
    };

    public getUserById = async (user_id: number) => {
        const saved = await this.db.User.findOne({ where: { user_id } });
        return saved;
    };

    public updateUserInformation = async (user_id: number, first_name: string, last_name: string, username: string, email: string, phone: number, description: string) => {
        const userUpdated = await this.db.User.update(
            { first_name, last_name, username, email, phone, description },
            {
                where: {
                    user_id,
                },
            },
        );
        return userUpdated;
    };

    public createTokenForLinkToResetPassword = async (user_id: number, token: string) => {
        const tokenCreated = await this.db.User.update(
            { resetPasswordToken: token, resetPasswordExpires: Date.now() + 360000 },
            {
                where: {
                    user_id,
                },
            },
        );
        return tokenCreated;
    };

    public getUserByResetPassword = async (resetpasswordtoken: string) => {
        const userFound = await this.db.User.findOne({
            where: {
                resetPasswordToken: resetpasswordtoken,
                resetPasswordExpires: {
                    [Op.gt]: Date.now(),
                },
            },
        });
        return userFound;
    };

    public getUserByUsernameByResetToken = async (username: string, resetpasswordtoken: string) => {
        const userFound = await this.db.User.findOne({
            where: {
                username: username,
                resetPasswordToken: resetpasswordtoken,
                resetPasswordExpires: {
                    [Op.gt]: Date.now(),
                },
            },
        });
        return userFound;
    };

    public updateUserPassword = async (user_id: number, newPassword: string) => {
        const passwordUpdated = await this.db.User.update(
            { password: newPassword, resetPasswordToken: null, resetPasswordExpires: null },
            {
                where: {
                    user_id,
                },
            },
        );
        return passwordUpdated;
    };
}
