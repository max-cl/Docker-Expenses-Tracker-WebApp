import bcrypt from "bcrypt";

// Bcrypt constant
const BCRYPT_SALT_ROUNDS = 12;

export const encriptPassword = async (password: string): Promise<string> => {
    try {
        const salted = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
        const passwordEncripted = await bcrypt.hash(password, salted);
        return passwordEncripted;
    } catch (error) {
        throw error;
    }
};

export const isEqualsPassword = async (loginPassword: string, passwordEncripted: string): Promise<boolean> => {
    return await bcrypt.compare(loginPassword, passwordEncripted);
};
