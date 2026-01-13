import { Message } from "node-nats-streaming"
import { Subjects, Listener, TicketUpdatedEvent } from "@rallycoding/common"
import { Ticket } from "../../models/ticket"
import { queueGroupName } from "./queue-group-name"

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
        console.log('--- NEW UPDATE EVENT ---');
        console.log('Searching for Ticket ID:', data.id);
        console.log('Searching for Version:', data.version - 1);
        const ticket = await Ticket.findByEvent(data)

        if (!ticket) {
            throw new Error("Ticket not found")
        }

        const { title, price } = data;
        ticket.set({
            title, price
        })
        await ticket.save()

        msg.ack()
    }
}