import type { Response, Request, NextFunction } from 'express'
import { CustomError } from '../../../common/src/errors/custom-error.js'

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {


    if (err instanceof CustomError) {
        console.log(err.message)
        return res.status(err.statusCode).send({
            errors: err.serializeErrors()
        })
    }


    res.status(400).send({
        errors: [{
            message: "Something went wrong"
        }]
    })
}