import { Publisher } from '../../../common/src/events/base-publisher';
import { TicketCreatedEvent } from './ticket-created-event';
import { Subjects } from '../../../common/src/events/subject';


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
