import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Orderservice unit tests", () => {

    it("should place an order", () => {
        
        const customer = new Customer("c1", "Costumer 1");
        const item1 = new OrderItem("i1", "Item 1", 10, "p1", 1);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    })

    it("should get total get of all orders", () => {
        
        const item1 = new OrderItem("1", "Item 1", 100, "1", 1);
        const item2 = new OrderItem("2", "Item 2", 200, "2", 2);
        const order1 = new Order("o1", "c1", [item1]);
        const order2 = new Order("o1", "c1", [item2]);

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(500);
    })

});