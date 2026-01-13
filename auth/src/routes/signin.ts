import express, { type Response, type Request } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user.js';
import { Password } from '../services/password.js';
const router = express.Router();
import jwt from 'jsonwebtoken';
import { BadRequestError, validateRequest } from "@sgtickets/common"

router.post('/api/users/signin',
    [
        body('email')
            .isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage("You must supply a password")
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({
            email
        })

        if (!existingUser) {
            throw new BadRequestError("Invalid Credentials")
        }

        const passwordsMatch = await Password.compare(
            existingUser.password,
            password
        )

        if (!passwordsMatch) {
            throw new BadRequestError("Invalid Credentials")
        }

        const userJwt = jwt.sign({
            id: existingUser._id,
            email: existingUser.email
        }, process.env.JWT_KEY!)

        // Store it on session object
        req.session = {
            jwt: userJwt
        }

        res.status(201).send(existingUser)
    })


export { router as signinRouter };
