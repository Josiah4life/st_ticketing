import { Subjects } from "./subject";
import { OrderStatus } from "../../../orders/src/models/order"

export interface OrderCreatedEvents {
    subject: Subjects.OrderCreated;
    data: {
        id: string;
        status: OrderStatus.Created;
        userId: string;
        expiresAt: string;
        ticket: {
            id: string;
            price: number
        }
    }
}