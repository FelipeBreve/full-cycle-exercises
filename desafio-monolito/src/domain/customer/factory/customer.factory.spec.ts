import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("customer factory unit test", () => {	

    it("should create a customer", () => {	

        const customer = CustomerFactory.create("Customer A");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer A");
        expect(customer.address).toBeUndefined();

    });

    it("should create customer with address", () => {
        const address = new Address("Address A", 1, "City A", "State A");
        const customer = CustomerFactory.createWithAddress("Customer A", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer A");
        expect(customer.address.street).toBe("Address A");
        expect(customer.address.number).toBe(1);
        expect(customer.address.zip).toBe("City A");
        expect(customer.address.city).toBe("State A");

    });

});