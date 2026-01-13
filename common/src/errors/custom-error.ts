/**
 * Abstract class means this is a "Blueprint for Blueprints."
 * You can never write 'new CustomError()'; it only exists to be a parent.
 * It 'extends Error' so it inherits standard JS error features.
 */
export abstract class CustomError extends Error {
    /**
     * The 'abstract' keyword here acts as a REQUIRMENT.
     * Any class that extends CustomError MUST provide a 'statusCode' (number).
     * This forces every error to have an HTTP status like 400 or 500.
     */
    abstract statusCode: number;

    /**
     * This is the "Data Shaping Contract."
     * It forces every error class to have a method that returns the exact 
     * array structure your frontend/Postman expects.
     */
    abstract serializeErrors(): { message: string; field?: string }[];

    /**
     * @param message - A human-readable string for your server logs.
     */
    constructor(message: string) {
        /**
         * super(message) passes the string to the built-in Error class.
         * This allows console.log(err) to show a helpful message and a 
         * stack trace in your Skaffold terminal.
         */
        super(message);

        /**
         * THE IDENTITY GLUE:
         * We put this here in the parent so you don't have to repeat it 
         * in every single error file. It ensures 'instanceof' works correctly
         * in the errorHandler.
         */
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}