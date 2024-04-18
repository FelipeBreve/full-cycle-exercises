import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import InvoiceItem from "../../domain/invoice_item.entity";
import FindInvoiceUsecase from "./find-invoice.usecase";

const invoiceItems1 = new InvoiceItem({
    id: '1',
    name: "Product 1",
    price: 100,
})

const invoice = new Invoice({
    id: new Id('1'),
    name: "John Doe",
    document: "123456789",
    address: new Address("Main Street",
        "123",
        "Near the park",
        "New York",
        "NY",
        "12345678",
    ),
    items: [invoiceItems1],
    updatedAt: new Date(),
    createdAt: new Date(),
});

const MockRepository = () => {
    return {
        save: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice))
    };
};

describe("Find a invoice", () => {
    it("should find a invoice", async () => {
        const usecase = new FindInvoiceUsecase(MockRepository());
        const output = await usecase.execute({ id: '1' });

        expect(output.id).toBe(invoice.id.id);
        expect(output.name).toBe(invoice.name);
        expect(output.document).toBe(invoice.document);
        expect(output.address.street).toBe(invoice.address.street);
        expect(output.address.number).toBe(invoice.address.number);
        expect(output.address.complement).toBe(invoice.address.complement);
        expect(output.address.city).toBe(invoice.address.city);
        expect(output.address.state).toBe(invoice.address.state);
        expect(output.address.zipCode).toBe(invoice.address.zipCode);
        expect(output.items.length).toBe(1)
        expect(output.items[0].id).toBe(invoiceItems1.id.id);
        expect(output.items[0].name).toBe(invoiceItems1.name);
        expect(output.items[0].price).toBe(invoiceItems1.price);
        expect(output.total).toBe(100);
    });
});