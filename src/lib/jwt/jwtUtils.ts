import * as jose from "jose";

const secret = jose.base64url.decode(process.env.ENCRYPTION_SECRET as string);

export const encryptSession = async (payload: Record<string, any>) => {
    const jwt = await new jose.EncryptJWT({ ...payload })
        .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
        .setIssuedAt()
        .setIssuer("urn:example:issuer")
        .setAudience("urn:example:audience")
        .setExpirationTime("10d")
        .encrypt(secret);

    return jwt;
};

export const decryptSession = async (jwt: string) => {
    try {
        const { payload, protectedHeader } = await jose.jwtDecrypt(
            jwt,
            secret,
            {
                issuer: "urn:example:issuer",
                audience: "urn:example:audience",
            }
        );
        return payload;
    } catch (error) {
        console.error("Error decrypting session data:", error);
        return null; // If decryption fails, return null
    }
};
