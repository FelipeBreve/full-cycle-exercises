
import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputCreateProductDTO } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

describe('Test create product use case - integration', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        sequelize.close();
    });

    it('Should create a product', async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const input: InputCreateProductDTO = {
            name: "Product 1",
            price: 10
        }

        const output = {
            id: expect.any(String),
            name: input.name,
            price: input.price
        }

        const result = await usecase.execute(input);
        
        expect(result).toEqual(output);
    })
})