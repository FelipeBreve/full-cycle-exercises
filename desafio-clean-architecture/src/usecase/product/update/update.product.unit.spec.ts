import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const mockFind = jest.fn();

const MockRepository = () => {
    return {
      find: mockFind,
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
};

describe("Unit test usecase update a product", () => {

    beforeEach(() => {
        mockFind.mockClear();
    })

    it("Should update a product", async () => {
        const product = new Product("123", "Product UseCase Test 1", 10);
        mockFind.mockReturnValue(Promise.resolve(product));
        const usecase = new UpdateProductUseCase(MockRepository());

        const input = {
            id: product.id,
            name: "Product UseCase Test 1 Updated",
            price: 20
        }

        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: input.id,
            name: input.name,
            price: input.price
        })
    })

    it("should thrown an error when name is missing", async () => {
        const productFake = new Product("123", "Product UseCase Test 1", 10);
        mockFind.mockReturnValue(Promise.resolve(productFake));
        const usecase = new UpdateProductUseCase(MockRepository());
        const input = {
            id: productFake.id,
            name: "",
            price: 20
        }
        await expect(usecase.execute(input)).rejects.toThrow("Product: Name is required")
    })

    it("should thrown an error when price is missing", async () => {
        const productFake = new Product("123", "Product UseCase Test 1", 10);
        mockFind.mockReturnValue(Promise.resolve(productFake));
        const usecase = new UpdateProductUseCase(MockRepository());
        const input = {
            id: productFake.id,
            name: "Product UseCase Test 1 Updated",
            price: 0
        }
        await expect(usecase.execute(input)).rejects.toThrow("Product: Price must be greater than zero")
    })

    it("should thrown an error when name is missing and princing", async () => {
        const productFake = new Product("123", "Product UseCase Test 1", 10);
        mockFind.mockReturnValue(Promise.resolve(productFake));
        const usecase = new UpdateProductUseCase(MockRepository());
        const input = {
            id: productFake.id,
            name: "",
            price: 0
        }
        await expect(usecase.execute(input)).rejects.toThrow("Product: Name is required,Product: Price must be greater than zero")
    })
})