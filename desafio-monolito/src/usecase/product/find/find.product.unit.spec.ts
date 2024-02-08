import ProductFactory from "../../../domain/product/factory/product.factory";
import CreateProductUseCase from "./find.product.usecase";

const product = ProductFactory.create("a", "Product UseCase Test 1", 10);

const input = {
    id: product.id,
    name: "Product UseCase Test 1",
    price: 10
}

const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
};

describe("Unit test usecase find a product", () => {

    it("Should find a product", async () => {
        const usecase = new CreateProductUseCase(MockRepository());

        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: input.id,
            name: input.name,
            price: input.price
        })
    })
})