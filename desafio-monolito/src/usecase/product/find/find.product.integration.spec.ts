
import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputFindProductDTO } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";

describe('Test find product use case - integration', () => {

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

    it('Should find a product', async () => {
        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);

        const product = ProductFactory.create("a", "Product 1", 10) as Product;

        await productRepository.create(product);

        const input: InputFindProductDTO = {
            id: product.id
        }

        const output = {
            id: product.id,
            name: "Product 1",
            price: 10
        }

        const result = await usecase.execute(input);
        
        expect(result).toEqual(output);
    })
})