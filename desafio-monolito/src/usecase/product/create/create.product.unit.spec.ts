import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
};

const input = {
    name: "Product UseCase Test 1",
    price: 10
}

describe("Unit test usecase create a product", () => {

    it("Should create a product", async () => {
        const usecase = new CreateProductUseCase(MockRepository());

        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
    })

    it("should thrown an error when name is missing", async () => {
        const usecase = new CreateProductUseCase(MockRepository());
        input.name = "";
        await expect(usecase.execute(input)).rejects.toThrow("Name is required")
    })

    it("should thrown an error when price is missing", async () => {
        const usecase = new CreateProductUseCase(MockRepository());
        input.name = "Product UseCase Test 1"
        input.price = 0;
        await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than zero")
    })
})