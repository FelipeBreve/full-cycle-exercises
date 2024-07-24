import GenerateInvoiceUsecase from "./generate-invoice.usecase";

const MockRepository = () => {
  return {
    save: jest.fn(),
    find: jest.fn(),
  };
};

describe("Generate new invoice", () => {
  it("should add a new invoice", async () => {
    const invoiceRepository = MockRepository();
    const generateInvoiceUsecase = new GenerateInvoiceUsecase(invoiceRepository);
    const invoiceDto = {
      name: "John Doe",
      document: "123456789",
      street: "Main Street",
      number: "123",
      complement: "Near the park",
      city: "New York",
      state: "NY",
      zipCode: "12345678",
      items: [
        {
          id: '1',
          name: "Product 1",
          price: 100,
        },
        {
          id: '2',
          name: "Product 2",
          price: 200,
        },
      ],
    };
    const output = await generateInvoiceUsecase.execute(invoiceDto);
    expect(invoiceRepository.save).toHaveBeenCalled();
    expect(output.id).toEqual(expect.any(String));
    expect(output.name).toBe(invoiceDto.name);
    expect(output.document).toBe(invoiceDto.document);
    expect(output.street).toBe(invoiceDto.street);
    expect(output.number).toBe(invoiceDto.number);
    expect(output.complement).toBe(invoiceDto.complement);
    expect(output.city).toBe(invoiceDto.city);
    expect(output.state).toBe(invoiceDto.state);
    expect(output.zipCode).toBe(invoiceDto.zipCode);
    expect(output.items).toHaveLength(2);
    expect(output.total).toBe(300);
  });
});