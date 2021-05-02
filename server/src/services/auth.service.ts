import Sequelize from 'sequelize';

// Models
import { DB } from 'models';

// Interfaces
import { UserRegister } from 'interfaces/auth.interface';

// Sequelize
const Op = Sequelize.Op;

export class AuthService {
    public constructor(private db: DB) {}

    public getUserByUsernameOrEmail = async (username: string, email: string) =>
        await this.db.User.findOne({ where: { [Op.or]: [{ username }, { email }] } });

    public createUser = async (data: UserRegister) => {
        const { first_name, last_name, phone, email, active, description, username, password } = data;
        return await this.db.User.create({
            first_name,
            last_name,
            phone,
            username,
            password,
            email,
            active,
            description,
        });
    };

    public getRoleByName = async (role_name: string) => await this.db.Role.findAll({ where: { role_name: role_name.toUpperCase() } });

    public getUserByUsername = async (username: string) => await this.db.User.findOne({ where: { username } });

    public getUserByEmail = async (email: string) => await this.db.User.findOne({ where: { email } });

    public getUserById = async (user_id: number) => await this.db.User.findOne({ where: { user_id } });

    public updateUserInformation = async (
        user_id: number,
        first_name: string,
        last_name: string,
        username: string,
        email: string,
        phone: number,
        description: string
    ) =>
        await this.db.User.update(
            { first_name, last_name, username, email, phone, description },
            {
                where: {
                    user_id,
                },
            }
        );

    public createTokenForLinkToResetPassword = async (user_id: number, token: string) =>
        await this.db.User.update(
            { resetPasswordToken: token, resetPasswordExpires: Date.now() + 360000 },
            {
                where: {
                    user_id,
                },
            }
        );

    public getUserByResetPassword = async (resetpasswordtoken: string) =>
        await this.db.User.findOne({
            where: {
                resetPasswordToken: resetpasswordtoken,
                resetPasswordExpires: {
                    [Op.gt]: Date.now(),
                },
            },
        });

    public getUserByUsernameByResetToken = async (username: string, resetpasswordtoken: string) =>
        await this.db.User.findOne({
            where: {
                username: username,
                resetPasswordToken: resetpasswordtoken,
                resetPasswordExpires: {
                    [Op.gt]: Date.now(),
                },
            },
        });

    public updateUserPassword = async (user_id: number, newPassword: string) =>
        await this.db.User.update(
            { password: newPassword, resetPasswordToken: null, resetPasswordExpires: null },
            {
                where: {
                    user_id,
                },
            }
        );
}
