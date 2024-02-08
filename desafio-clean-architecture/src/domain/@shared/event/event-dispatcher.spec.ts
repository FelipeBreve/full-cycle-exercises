import CustomerChangedAddressEvent from "../../customer/event/customer-changed-address.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import CustomerChangedAddressHandler from "../../customer/event/handler/customer-changed-address-handler.ts";
import SendConsoleLog1Handler from "../../customer/event/handler/send-console-log-1";
import SendConsoleLog2Handler from "../../customer/event/handler/send-console-log-2";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event.dispatcher";

describe("Domain events tests", ()=> {

    it("should register an event handler", ()=> {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    })

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    })

    it("should unregistre all events handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandle = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 100
        });

        //Quando o notify for executado o SendEmailWhenProductIsCreatedHandler deve ser chamado
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandle).toHaveBeenCalled();
    })

    it("should notify created user events", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLog1Handler();
        const eventHandler2 = new SendConsoleLog2Handler();
        const spyEventHandle1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandle2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "1",
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 1,
                city: "City 1",
                zip: "Zip 1",
            }
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandle1).toHaveBeenCalled();
        expect(spyEventHandle2).toHaveBeenCalled();
    });

    it("should notify customer changed adress", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new CustomerChangedAddressHandler();

        const spyEventHandle1 = jest.spyOn(eventHandler1, "handle");

        eventDispatcher.register("CustomerChangedAddressEvent", eventHandler1);

        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]).toMatchObject(eventHandler1);

        const customerChangedAddressEvent = new CustomerChangedAddressEvent({
            id: "1",
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 1,
                city: "City 1",
                zip: "Zip 1",
            }
        });

        eventDispatcher.notify(customerChangedAddressEvent);

        expect(spyEventHandle1).toHaveBeenCalled();
    });

})