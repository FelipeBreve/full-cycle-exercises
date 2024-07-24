import { Sequelize } from "sequelize-typescript";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CostumerModel from "./costumer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository test", () => {
    
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([CostumerModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        sequelize.close();
    })
    
    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "12345", "City 1")
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customerModel = await CostumerModel.findOne({ where: { id: "1" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints
        })
    })

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "12345", "City 1")
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const newCustomer = new Customer("1", "Customer 2");
        const newAddress = new Address("Street 2", 2, "54321", "City 2")
        newCustomer.changeAddress(newAddress);
        await customerRepository.update(newCustomer);

        const customerModel = await CostumerModel.findOne({ where: { id: "1" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: newCustomer.name,
            street: newAddress.street,
            number: newAddress.number,
            zipcode: newAddress.zip,
            city: newAddress.city,
            active: newCustomer.isActive(),
            rewardPoints: newCustomer.rewardPoints
        })
    })

    it("should find customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "12345", "City 1")
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const foundCustomer = await customerRepository.find(customer.id);

        expect(customer).toStrictEqual(foundCustomer);
    })

    it("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();

        await expect(customerRepository.find("1")).rejects.toThrow("Customer not found");
    })

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("1", "Customer 1");
        const address1 = new Address("Street 1", 1, "12345", "City 1")
        customer1.changeAddress(address1);
        customer1.addRewardPoints(10);
        customer1.activate(); 
        await customerRepository.create(customer1);

        const customer2 = new Customer("2", "Customer 2");
        const address2 = new Address("Street 2", 2, "54321", "City 2")
        customer2.changeAddress(address2);
        customer2.addRewardPoints(20);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();

        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer1);
        expect(customers).toContainEqual(customer2);
    })
})