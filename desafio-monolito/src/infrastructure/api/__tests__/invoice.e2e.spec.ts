import { Sequelize } from "sequelize-typescript";
import request from "supertest";
import { Umzug } from "umzug";
import { InvoiceItemModel, InvoiceModel, setupAssociations } from "../../../modules/invoice/repository";
import { migrator } from "../../test-migrations/config-migrations/migrator";
import { app } from "../express";

describe("E2E test for invoice API", () => {
    let sequelize: Sequelize

    let migration: Umzug<any>;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false
        })

        sequelize.addModels([InvoiceModel, InvoiceItemModel])
        setupAssociations();
        await sequelize.sync()
    });

    afterEach(async () => {
        if (!migration || !sequelize) {
            return
        }
        migration = migrator(sequelize)
        await migration.down()
        await sequelize.close()
    });

    it("should find a invoice", async () => {
        //Create new invoice
        const responseCreate = await request(app).post("/invoice").send({
            name: "John Doe",
            document: "123456789",
            street: "Main Street",
            number: "123",
            complement: "Near the park",
            city: "New York",
            state: "NY",
            zipCode: "12345678",
            items: [
                {
                    id: '1',
                    name: "Product 1",
                    price: 100,
                },
                {
                    id: '2',
                    name: "Product 2",
                    price: 200,
                },
            ],
        });

        const response =
            await request(app)
                .get(`/invoice/${responseCreate.body.id}`)
                .send();

        console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body.id).toEqual(responseCreate.body.id);
        expect(response.body.name).toEqual("John Doe");
        expect(response.body.document).toEqual("123456789");
        expect(response.body.address.street).toEqual("Main Street");
        expect(response.body.address.number).toEqual("123");
        expect(response.body.address.complement).toEqual("Near the park");
        expect(response.body.address.city).toEqual("New York");
        expect(response.body.address.state).toEqual("NY");
        expect(response.body.address.zipCode).toEqual("12345678");
        expect(response.body.items).toHaveLength(2);
        expect(response.body.items[0].id).toEqual('1');
        expect(response.body.items[0].name).toEqual("Product 1");
        expect(response.body.items[0].price).toEqual(100);
        expect(response.body.items[1].id).toEqual('2');
        expect(response.body.items[1].name).toEqual("Product 2");
        expect(response.body.items[1].price).toEqual(200);
        expect(response.body.total).toEqual(300);
        expect(response.body.createdAt).toEqual(expect.any(String));
    });
});