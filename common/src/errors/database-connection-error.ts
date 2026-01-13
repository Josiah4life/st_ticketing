import { CustomError } from "./custom-error.js";

/**
 * DatabaseConnectionError is our "Custom Toolbox" for database failures.
 * We extend the built-in Error class so it plays nice with Express.
 */
export class DatabaseConnectionError extends CustomError {
    /**
     * This is a "Class Property." 
     * Because it's defined here (outside the constructor), every instance 
     * of this error will automatically have this exact string attached to it.
     * We don't need to pass it in because the reason for a DB crash is always the same.
     */
    reason = "Error connecting to database";
    statusCode = 500;

    constructor() {
        /**
         * super() initializes the parent 'Error' class.
         * Even though we aren't passing a message to super, it sets up the 
         * basic error features like the stack trace (where the crash happened).
         */
        super("Error connecting to database");

        /**
         * THE IDENTITY GLUE:
         * This manually links 'this' specific object back to the 
         * 'DatabaseConnectionError' blueprint. 
         * This ensures that 'err instanceof DatabaseConnectionError' returns 
         * TRUE in your error handler.
         */
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [
            {
                message: this.reason
            }
        ]
    }
}