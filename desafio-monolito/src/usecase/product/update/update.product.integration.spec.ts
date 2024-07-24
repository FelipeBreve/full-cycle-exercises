
import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputUpdateProductDTO } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

describe('Test update product use case - integration', () => {

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

    it('Should update a product', async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        const product = ProductFactory.create("a", "Product 1", 10) as Product;

        await productRepository.create(product);

        const input: InputUpdateProductDTO = {
            id: product.id,
            name: "Product 1 Updated",
            price: 20
        }

        const output = {
            id: product.id,
            name: input.name,
            price: input.price
        }

        const result = await usecase.execute(input);
        
        expect(result).toEqual(output);
    })
})