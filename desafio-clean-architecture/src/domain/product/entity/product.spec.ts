import Product from "./product";

describe("Product Unit Tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            const product = new Product("", "Product 1", 100);
        }).toThrow("Id is required")
    })

    it("should throw error when name is empty", () => {
        expect(() => {
            const product = new Product("1", "", 100);
        }).toThrow("Product: Name is required")
    })

    it("should throw error when price is less than zero", () => {
        expect(() => {
            const product = new Product("1", "Name", -1);
        }).toThrow("Product: Price must be greater than zero")
    })

    it("should throw error when name is empty or price is less than zero", () => {
        expect(() => {
            const product = new Product("1", "", 0);
        }).toThrow("Product: Name is required,Product: Price must be greater than zero")
    })

    it("should change name", () => {
        const product = new Product("1", "Product", 100);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2")
    })

    it("should change price", () => {
        const product = new Product("1", "Product", 100);
        product.changePrice(150);
        expect(product.price).toBe(150)
    })
})