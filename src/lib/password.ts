import { randomBytes, pbkdf2Sync } from 'crypto';

export const saltAndHashPassword = (password: string): string => {
    // logic to salt and hash password
    // const pwHash = saltAndHashPassword(credentials.password)
    // Generate a random salt
    const salt = randomBytes(16).toString('hex');

    // Hash password with salt using PBKDF2
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    // Return combined salt and hash
    return `${salt}:${hash}`;
}

export const verifyPassword = (password: string, hashedPassword: string): boolean => {
    const [salt, hash] = hashedPassword.split(':');
    const newHash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === newHash;
}