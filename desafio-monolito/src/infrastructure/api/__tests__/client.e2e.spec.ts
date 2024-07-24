import { Sequelize } from "sequelize-typescript";
import request from "supertest";
import { Umzug } from "umzug";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import { migrator } from "../../test-migrations/config-migrations/migrator";
import { app } from "../express";

describe("E2E test for clients API", () => {
    let sequelize: Sequelize

    let migration: Umzug<any>;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false
        })

        sequelize.addModels([ClientModel])
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

    it("should create a clients", async () => {
        const response =
            await request(app)
                .post("/clients")
                .send({
                    name: "Felipe 1",
                    email: "felipe@felipe.com",
                    document: "123456789",
                    street: "Rua 1",
                    number: 123,
                    complement: "Casa",
                    city: "São Paulo",
                    state: "SP",
                    zipCode: "12345678"
                });

        console.log(response.error);
        expect(response.status).toBe(200);
        expect(response.body.id).toEqual(expect.any(String));
        expect(response.body.name).toBe("Felipe 1");
        expect(response.body.email).toBe("felipe@felipe.com");
        expect(response.body.document).toBe("123456789");
        expect(response.body.address.street).toBe("Rua 1");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.complement).toBe("Casa");
        expect(response.body.address.city).toBe("São Paulo");
        expect(response.body.address.state).toBe("SP");
        expect(response.body.address.zipCode).toBe("12345678");
        expect(response.body.createdAt).toEqual(expect.any(String));
        expect(response.body.updatedAt).toEqual(expect.any(String));
    });
});