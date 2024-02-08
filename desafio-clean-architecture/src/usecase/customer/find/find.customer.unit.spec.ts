
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import { InputFindCustomerDto } from "./find.customer.dto";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John Doe");
const address = new Address("Street", 123, "zip", "city")
customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
    }
}

describe('Unit test find customer use case', () => {

    it('Should find a customer', async () => {
        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const input: InputFindCustomerDto = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "John Doe",
            address: {
                street: "Street",
                number: 123,
                city: "city",
                zip: "zip"
            }
        }

        const result = await usecase.execute(input);
        
        expect(result).toEqual(output);
    })

    it("should not find a customer", async () => {
        const customerRepository = MockRepository();
        customerRepository.find = jest.fn().mockImplementation(() => {  throw new Error("Customer not found") });
        const usecase = new FindCustomerUseCase(customerRepository);

        const input: InputFindCustomerDto = {
            id: "123"
        }

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Customer not found")
    })
})