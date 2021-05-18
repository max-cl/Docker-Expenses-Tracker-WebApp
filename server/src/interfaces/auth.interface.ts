export interface UserRegister {
    user_id?: number;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    active?: boolean;
    roles: string;
}

export interface UserLogin {
    username: string;
    password: string;
}

export interface UserUpdate {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
}

export interface ImailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}
