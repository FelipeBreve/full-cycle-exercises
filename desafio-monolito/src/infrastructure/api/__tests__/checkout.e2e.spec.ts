import { Sequelize } from "sequelize-typescript";
import request from "supertest";
import { Umzug } from "umzug";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import { InvoiceItemModel, InvoiceModel, setupAssociations } from "../../../modules/invoice/repository";
import TransactionModel from "../../../modules/payment/repository/transaction.model";
import { ProductModel } from "../../../modules/product-adm/repository/product.model";
import ProductStoreCaralogModel from "../../../modules/store-catalog/repository/product.model";
import { migrator } from "../../test-migrations/config-migrations/migrator";
import { app } from "../express";

describe("E2E test for checkout API", () => {
    let sequelize: Sequelize

    let migration: Umzug<any>;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false
        })

        sequelize.addModels([ClientModel, ProductModel, ProductStoreCaralogModel, TransactionModel, InvoiceModel, InvoiceItemModel])
        setupAssociations()
        migration = migrator(sequelize)
        await migration.up()
    });

    afterEach(async () => {
        if (!migration || !sequelize) {
            return
        }
        migration = migrator(sequelize)
        await migration.down()
        await sequelize.close()
    });

    it("should finish checkout", async () => {
        const responseClient = await request(app).post("/clients").send({
            name: "Felipe 1",
            email: "felipe@felipe.com",
            document: "123456789",
            street: "Rua 1",
            number: 123,
            complement: "Casa",
            city: "São Paulo",
            state: "SP",
            zipCode: "12345678"
        })

        // console.log(responseClient.body)

        const responseProduct1 = await request(app).post("/products").send({
            name: "Product 1",
            description: "Description 1",
            purchasePrice: 200,
            stock: 10
        });

        // console.log(responseProduct1.body)

        const responseProduct2 = await request(app).post("/products").send({
            name: "Product 2",
            description: "Description 2",
            purchasePrice: 200,
            stock: 10
        });

        await request(app).put("/products-store").send({
            id: responseProduct1.body.id,
            salesPrice: 100
        });

        await request(app).put("/products-store").send({
            id: responseProduct2.body.id,
            salesPrice: 200
        });

        // console.log(updateProduct1.body)
        // console.log(updateProduct2.body)

        const response = await request(app)
            .post(`/checkout`)
            .send({
                clientId: responseClient.body.id,
                products: [
                    {
                        productId: responseProduct1.body.id,
                    },
                    {
                        productId: responseProduct2.body.id,
                    }
                ]
            });

        console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("invoiceId");
        expect(response.body).toHaveProperty("status");
        expect(response.body).toHaveProperty("total");
        expect(response.body).toHaveProperty("products");
        expect(response.body.products).toHaveLength(2);
    });
});