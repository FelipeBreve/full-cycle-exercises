import Address from "../value-object/address";
import Customer from "./customer";

describe("Costumer Unit Tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let costumer = new Customer("", "John");
        }).toThrow("Id is required")
    })

    it("should throw error when name is empty", () => {
        expect(() => {
            let costumer = new Customer("123", "");
        }).toThrow("Name is required")
    }) 

    it("should change name", () => {
        // Arrange
        const costumer = new Customer("123", "Velipe");

        //Act
        costumer.changeName("Jane");

        //Assert
        expect(costumer.name).toBe("Jane");
    }) 

    it("should activate customer", () => {
        const costumer = new Customer("123", "Costumer 1")
        const address = new Address("Street 1", 123, "11111-444", "Sao Paulo");
        costumer.changeAddress(address);
        costumer.activate();

        expect(costumer.isActive()).toBe(true);
    }) 


    it("should deactivate customer", () => {
        const costumer = new Customer("123", "Costumer 1")

        costumer.deactive();

        expect(costumer.isActive()).toBe(false);
    }) 

    it("should throw error when address is undefined when you activeate a customer", () => {
        expect(() => {
            const costumer = new Customer("123", "Costumer 1")

            costumer.activate();
        }).toThrow("Address is mandatory to Customer")
    
    }) 

    it("should add reward points", () => {
        const custumer = new Customer("1", "Costumer 1")
        expect(custumer.rewardPoints).toBe(0);
        
        custumer.addRewardPoints(10);
        expect(custumer.rewardPoints).toBe(10);

        custumer.addRewardPoints(10);
        expect(custumer.rewardPoints).toBe(20);
    }) 

})