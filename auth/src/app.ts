import express from 'express';
import "express-async-errors";

import { currentUserRouter } from './routes/current-user.js';
import { signinRouter } from './routes/signin.js';
import { signoutRouter } from './routes/signout.js';
import { signupRouter } from './routes/signup.js';
import { NotFoundError, errorHandler } from "@sgtickets/common"
import cookieSession from 'cookie-session';
import crypto from "crypto";

const app = express();

// Tell Express to trust traffic coming from the Ingress-Nginx proxy.
// This is required so Express knows that even though the request is coming 
// from a proxy, it can still trust the 'secure' property of our cookies.
app.set('trust proxy', true);

app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: false
    })
)


app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all("*", () => {
    throw new NotFoundError()
})

// app.all("*", async (req, res, next) => {
//     next(new NotFoundError())
// })


app.use(errorHandler);

export { app }