import { type ValidationError } from "express-validator";
import { type FieldValidationError } from "express-validator";
// import { CustomError } from "../errors/custom-error.js";
// import {  CustomError } from "./custom-error.js";

interface CustomError {
    statusCode: number;
    serializeErrors(): {
        message: string;
        field?: string
    }[]
}

/**
 * RequestValidationError is our "Custom Toolbox" for validation errors.
 * We 'extend Error' so it acts like a normal JS Error but carries extra data.
 */
export class RequestValidationError extends Error implements CustomError{
    statusCode = 400;

    /**
     * The constructor runs when we write 'new RequestValidationError(someErrors)'.
     * 'public errors' is a TS shortcut that creates a property on 'this' house
     * to hold the array of errors from express-validator.
     */
    constructor(public errors: ValidationError[]) {
        // Calls the 'Parent' Error class to do basic error setup (like stack traces)
        super("invalid request parameters");
        /**
         * THIS IS THE "GLUE":
         * 'this' = the specific error object we just created.
         * 'RequestValidationError.prototype' = the blueprint/ID card for this class.
         * * Because we are extending a built-in JS class (Error), we must manually
         * link 'this' object back to our 'RequestValidationError' blueprint.
         * Without this, the 'instanceof' check in the error handler would fail!
         */
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors()  {
        return this.errors.map(err => {
            return {
                message: err.msg,
                field: err.type === "field" ? err.path : ""
            }
        })
    }
}


const mockFieldError: FieldValidationError = {
    type: 'field',
    value: 'incorrect-email',
    msg: 'Invalid email format',
    path: 'email',
    location: 'body'
};

const error = new RequestValidationError([mockFieldError])

