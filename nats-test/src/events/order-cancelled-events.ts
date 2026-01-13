import { Subjects } from "./subject";
import { OrderStatus } from "../../../orders/src/models/order"

export interface OrderCancelledEvents {
    subject: Subjects.OrderCancelled;
    data: {
        id: string;
        ticket: {
            id: string;
        }
    }
}