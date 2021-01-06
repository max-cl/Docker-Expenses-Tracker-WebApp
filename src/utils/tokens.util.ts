import { sign, verify } from "jsonwebtoken";

// Utils
import accessEnv from "../utils/accessEnv";

// ENV Variables
const jwtSecret = accessEnv("JWT_SECRET");

export const createToken = async (user_id: number) => {
    return sign({ user_id: user_id }, `${jwtSecret}`, { algorithm: "HS512", expiresIn: "1h" });
};

export const validateToken = async (token: string) => {
    return verify(token, `${jwtSecret}`, { algorithms: ["HS512"] });
};
