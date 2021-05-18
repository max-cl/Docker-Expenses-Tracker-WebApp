export const addServerErrors = <T>(
    errors: { [P in keyof T]?: string },
    setError: (fieldName: keyof T, error: { type: string; message: string }) => void,
) => {
    return Object.keys(errors).forEach((key) => {
        setError(key as keyof T, {
            type: "server",
            message: `${errors[key as keyof T]}`,
        });
    });
};
