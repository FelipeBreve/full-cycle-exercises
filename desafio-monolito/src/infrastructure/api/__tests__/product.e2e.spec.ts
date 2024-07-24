import { Sequelize } from "sequelize-typescript";
import request from "supertest";
import { Umzug } from "umzug";
import { ProductModel } from "../../../modules/product-adm/repository/product.model";
import ProductStoreCaralogModel from "../../../modules/store-catalog/repository/product.model";
import { migrator } from "../../test-migrations/config-migrations/migrator";
import { app } from "../express";

describe("E2E test for product API", () => {
    let sequelize: Sequelize

    let migration: Umzug<any>;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false
        })

        sequelize.addModels([ProductModel, ProductStoreCaralogModel])
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

    it("should create a product", async () => {
        const response =
            await request(app)
                .post("/products")
                .send({
                    name: "Product 1",
                    description: "Product 1 description",
                    purchasePrice: 10,
                    stock: 11
                });

        expect(response.status).toBe(200);
        expect(response.body.id).toEqual(expect.any(String));
        expect(response.body.name).toBe("Product 1");
        expect(response.body.description).toBe("Product 1 description");
        expect(response.body.purchasePrice).toBe(10)
        expect(response.body.stock).toBe(11)
        expect(response.body.createdAt).toEqual(expect.any(String));
        expect(response.body.updatedAt).toEqual(expect.any(String));
    });
});