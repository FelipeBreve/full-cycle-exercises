import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import { PlaceOrderInputDto } from "./place-order.dto";
import PlaceOrderUseCase from "./place-order.usecase";

const mockDate = new Date(2021, 1, 1);

describe("PlaceOrderUseCase unit test", () => {

    describe("ValidateProducts method", () => {
        //@ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOrderUseCase();

        it("should throw an error when no products are selected", async () => {
            const input: PlaceOrderInputDto = {
                clientId: "", products: []
            }

            await expect(placeOrderUseCase['validateProducts'](input)).rejects.toThrow(new Error("No products selected"))
        })

        it("should throw an errors when product is out of stock", async () => {
            const mockProductFacade = {
                checkStock: jest.fn(({ productId }: { productId: string }) =>
                    Promise.resolve({
                        productId,
                        stock: productId === "1" ? 0 : 1
                    })
                )
            }

            //@ts-expect-error - force set productFacade
            placeOrderUseCase["_productFacade"] = mockProductFacade;

            let input: PlaceOrderInputDto = {
                clientId: '1',
                products: [{ productId: "1" }]
            }

            await expect(placeOrderUseCase['validateProducts'](input))
                .rejects.toThrow(new Error("Product 1 is not available in stock"))

            input = {
                clientId: '0',
                products: [{ productId: "0" }, { productId: "1" }]
            }

            await expect(placeOrderUseCase['validateProducts'](input))
                .rejects.toThrow(new Error("Product 1 is not available in stock"))
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3)

            input = {
                clientId: '0',
                products: [{ productId: "0" }, { productId: "1" }, { productId: "2" }]
            }

            await expect(placeOrderUseCase['validateProducts'](input))
                .rejects.toThrow(new Error("Product 1 is not available in stock"))
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(5)

        });

    })

    describe("getProducts method", () => {
        beforeAll(() => {
            jest.useFakeTimers();
            jest.setSystemTime(mockDate);
        })

        afterAll(() => {
            jest.useRealTimers();
        })

        //@ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOrderUseCase();

        it("should throw an error when product not found", async () => {
            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue(null)
            }

            //@ts-expect-error - force set catalogFacade
            placeOrderUseCase['_catalogFacade'] = mockCatalogFacade;

            await expect(placeOrderUseCase['getProduct']("0"))
                .rejects.toThrow(new Error("Product not found"))
        });

        it("should return a product", async () => {
            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue({
                    id: "0",
                    name: "Product 0",
                    description: "Product Description 0",
                    salesPrice: 0
                })
            }

            //@ts-expect-error - force set catalogFacade
            placeOrderUseCase['_catalogFacade'] = mockCatalogFacade;

            await expect(placeOrderUseCase['getProduct']("0"))
                .resolves.toEqual(
                    new Product({
                        id: new Id("0"),
                        name: "Product 0",
                        description: "Product Description 0",
                        salesPrice: 0
                    })
                );

            expect(mockCatalogFacade.find).toHaveBeenCalledWith({ id: "0" })
        });
    })

    describe("Execute method", () => {
        beforeAll(() => {
            jest.useFakeTimers();
            jest.setSystemTime(mockDate);
        })

        afterAll(() => {
            jest.useRealTimers();
        })

        it("should  throw an error when client not found", async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(null)
            }
            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase();
            //@ts-expect-error - force set clientFacade
            placeOrderUseCase['_clientFacade'] = mockClientFacade;

            const input: PlaceOrderInputDto = {
                clientId: "1", products: []
            }

            await expect(placeOrderUseCase.execute(input)).rejects.toThrow("Client not found")
        })

        it("should throw an error when product are not valid", async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(true)
            }
            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase();

            const mockValidadeProduct = jest
                .spyOn(PlaceOrderUseCase.prototype as any, 'validateProducts')
                .mockRejectedValue(new Error('No products selected'));

            //@ts-expect-error - force set clientFacade
            placeOrderUseCase['_clientFacade'] = mockClientFacade;

            const input: PlaceOrderInputDto = {
                clientId: "1", products: []
            }

            await expect(placeOrderUseCase.execute(input)).rejects.toThrow("No products selected")
            expect(mockValidadeProduct).toHaveBeenCalled()
        })

        describe("place an order", () => {
            const clientProps = {
                id: "1",
                name: "Client 1",
                document: "123456789",
                email: "client@user.com",
                address: {
                    street: "Street 1",
                    number: "123",
                    complement: "Complement 1",
                    city: "City 1",
                    state: "State 1",
                    zipCode: "12345678"
                }
            }

            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(clientProps)
            }

            const mockPaymentFacade = {
                process: jest.fn()
            }

            const mockCheckoutRepo = {
                addOrder: jest.fn()
            }

            const mockInvoiceFacade = {
                create: jest.fn().mockResolvedValue({ id: "1i" })
            }

            const placeOrderUseCase = new PlaceOrderUseCase(
                mockClientFacade as any,
                null,
                null,
                mockCheckoutRepo as any,
                mockInvoiceFacade as any,
                mockPaymentFacade as any
            );

            const products = {
                "1": new Product({
                    id: new Id("1"),
                    name: "Product 1",
                    description: "Product Description 1",
                    salesPrice: 100
                }),
                "2": new Product({
                    id: new Id("2"),
                    name: "Product 2",
                    description: "Product Description 2",
                    salesPrice: 200
                })
            }

            const mockValidateProducts = jest.spyOn(placeOrderUseCase as any, 'validateProducts').mockResolvedValue(null);
            const mockGetProducts = jest.spyOn(placeOrderUseCase as any, 'getProduct').mockImplementation((productId: unknown) => {
                // Assegura o tipo dentro da implementação mock
                const id = productId as keyof typeof products;
                return products[id];
            });

            it("should not be aprroved", async () => {
                mockPaymentFacade.process.mockReturnValue({
                    transactionId: "1",
                    orderId: "o1",
                    amount: 100,
                    status: "error",
                    createAt: new Date(),
                    updatedAtt: new Date()
                });

                const input: PlaceOrderInputDto = {
                    clientId: '1c',
                    products: [{ productId: "1" }, { productId: "2" }]
                }

                let output = await placeOrderUseCase.execute(input);
                expect(output.invoiceId).toBeNull()
                expect(output.total).toBe(300)
                expect(output.products).toStrictEqual(input.products)

                expect(mockClientFacade.find).toHaveBeenCalled()
                expect(mockClientFacade.find).toHaveBeenCalledWith({ id: input.clientId })
                expect(mockValidateProducts).toHaveBeenCalled()
                expect(mockValidateProducts).toHaveBeenCalledWith(input)
                expect(mockGetProducts).toHaveBeenCalledTimes(2)
                expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(1)
                expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1)
                expect(mockPaymentFacade.process).toHaveBeenCalledWith({
                    orderId: output.id,
                    amount: output.total
                })

                expect(mockInvoiceFacade.create).not.toHaveBeenCalled()
            })

            it("should be approved", async () => {
                mockPaymentFacade.process.mockReturnValue({
                    transactionId: "1",
                    orderId: "o1",
                    amount: 100,
                    status: "approved",
                    createAt: new Date(),
                    updatedAtt: new Date()
                });

                const input: PlaceOrderInputDto = {
                    clientId: '1c',
                    products: [{ productId: "1" }, { productId: "2" }]
                }

                let output = await placeOrderUseCase.execute(input);

                expect(output.invoiceId).toBe("1i")
                expect(output.total).toBe(300)
                expect(output.products).toStrictEqual(input.products)

                expect(mockClientFacade.find).toHaveBeenCalled()
                expect(mockClientFacade.find).toHaveBeenCalledWith({ id: input.clientId })
                expect(mockValidateProducts).toHaveBeenCalled()
                expect(mockGetProducts).toHaveBeenCalledTimes(2)
                expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(1)
                expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1)
                expect(mockPaymentFacade.process).toHaveBeenCalledWith({
                    orderId: output.id,
                    amount: output.total
                })

                expect(mockInvoiceFacade.create).toHaveBeenCalled()
                expect(mockInvoiceFacade.create).toHaveBeenCalledWith({
                    name: clientProps.name,
                    document: clientProps.document,
                    street: clientProps.address.street,
                    number: clientProps.address.number,
                    complement: clientProps.address.complement,
                    city: clientProps.address.city,
                    state: clientProps.address.state,
                    zipCode: clientProps.address.zipCode,
                    items: [{
                        id: products["1"].id.id,
                        name: products["1"].name,
                        price: products["1"].salesPrice
                    },
                    {
                        id: products["2"].id.id,
                        name: products["2"].name,
                        price: products["2"].salesPrice
                    }],
                })
            })
        })
    })
})