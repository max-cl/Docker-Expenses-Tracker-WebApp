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

    public getUserById = async (user_id: number) => {
        const saved = await this.db.User.findOne({ where: { user_id } });
        return saved;
    };

    // public updateUserFound = async (userFound: User, data: any) => {
    //     const { firstName, lastName, phone, email, active, description } = data;
    //     await userFound.update({
    //         firstName,
    //         lastName,
    //         phone,
    //         email,
    //         active,
    //         description,
    //     });
    // };
}
