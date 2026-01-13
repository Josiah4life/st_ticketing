import { scrypt, randomBytes } from "crypto"
import { promisify } from "util"

// Convert scrypt to a version that works with await
const scryptAsync = promisify(scrypt)

export class Password {
    static async toHash(password: string) {
        // Generate a random salt
        // 8: The length of the random "salt" in bytes.
        // Converted to hexadecimal. "hex" turns raw binary into hexadecimal 
        const salt = randomBytes(8).toString("hex");

        // Hash the password with the salt
        // as Buffer: Telling TypeScript that the output is a raw binary container.
        const buf = (await scryptAsync(password, salt, 64)) as Buffer

        // A Buffer is a special object in Node.js designed to hold raw binary data.
        // Store both the salt and the hash together so we can compare later
        return `${buf.toString('hex')}.${salt}`;

    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        const [hashedPassword, salt] = storedPassword.split(".")
        const buf = (await scryptAsync(suppliedPassword, salt!, 64)) as Buffer

        return buf.toString("hex") === hashedPassword
    }
}