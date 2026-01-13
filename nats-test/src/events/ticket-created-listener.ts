import { Listener } from "../../../common/src/events/base-listener";
import { Message } from "node-nats-streaming";
import { Subjects } from "../../../common/src/events/subject";
import { TicketCreatedEvent } from "./ticket-created-event";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = 'payments-service';

    onMessage(data: TicketCreatedEvent["data"], msg: Message) {
        console.log('Event data!', data);

        console.log('Event data!', data.price);
        console.log('Event data!', data.title);


        msg.ack();
    }
}
