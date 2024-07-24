import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import { InvoiceItemModel, InvoiceModel, setupAssociations } from "../repository";

describe("Generate Invoice Facade", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        setupAssociations();
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should generate a new invoice", async () => {
        const facade = InvoiceFacadeFactory.create();

        const input = {
            name: "John Doe",
            document: "123456789",
            street: "Main Street",
            number: "123",
            complement: "Near the park",
            city: "Springfield",
            state: "SP",
            zipCode: "12345678",
            items: [
                {
                    id: "123",
                    name: "Item 1",
                    price: 100
                },
                {
                    id: "456",
                    name: "Item 2",
                    price: 200
                }
            ]
        }

        const output = await facade.create(input);

        expect(output.id).toEqual(expect.any(String));
        expect(output.name).toBe(input.name);
        expect(output.document).toBe(input.document);
        expect(output.street).toBe(input.street);
        expect(output.number).toBe(input.number);
        expect(output.complement).toBe(input.complement);
        expect(output.city).toBe(input.city);
        expect(output.state).toBe(input.state);
        expect(output.zipCode).toBe(input.zipCode);
        expect(output.items).toHaveLength(2);
        expect(output.items[0].id).toBe("123");
        expect(output.items[0].name).toBe("Item 1");
        expect(output.items[0].price).toBe(100);
        expect(output.items[1].id).toBe("456");
        expect(output.items[1].name).toBe("Item 2");
        expect(output.items[1].price).toBe(200);
        expect(output.total).toBe(300);
    })
})