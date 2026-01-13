import { Ticket } from "../ticket";


it("Implements optimistic concurrency control", async () => {

    const ticket = Ticket.build({
        title: "Babcock",
        price: 20,
        userId: "123"
    })

    await ticket.save();


    const firstInstance = await Ticket.findById(ticket.id)
    const secondInstance = await Ticket.findById(ticket.id)

    console.log("First Instance version: ", firstInstance?.version, "Second Instance version:", secondInstance?.version)
    firstInstance!.set({
        price: 40
    })

    secondInstance!.set({
        price: 25
    })

    const a = await firstInstance!.save();

    console.log("new saved version", a)
    try {
        await secondInstance!.save();
    } catch (err) {
        return;
    }

    throw new Error("Should not reach this point")
})


it('increments the version number on multiple saves', async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20,
        userId: '123',
    });

    await ticket.save();
    expect(ticket.version).toEqual(0);
    await ticket.save();
    expect(ticket.version).toEqual(1);
    await ticket.save();
    expect(ticket.version).toEqual(2);
});
