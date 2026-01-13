import express from 'express';
import "express-async-errors";
import { currentUser, errorHandler, NotFoundError } from "@rallycoding/common"
import cookieSession from 'cookie-session';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';


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

app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all("*", () => {
    throw new NotFoundError()
})

// app.all("*", async (req, res, next) => {
//     next(new NotFoundError())
// })


app.use(errorHandler);

export { app }