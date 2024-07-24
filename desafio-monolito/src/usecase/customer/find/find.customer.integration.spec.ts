
import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/costumer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { InputFindCustomerDto } from "./find.customer.dto";
import FindCustomerUseCase from "./find.customer.usecase";

describe('Test find customer use case - integration', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        sequelize.close();
    });

    it('Should find a customer', async () => {
        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("123", "John Doe");
        const address = new Address("Street", 123, "zip", "city")
        customer.changeAddress(address);

        await customerRepository.create(customer);

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
})