import Order from "../domain/order.entity";
import CheckoutGateway from "../gateway/checkout.gateway";

export default class FakeCheckoutRepository implements CheckoutGateway {
    async addOrder(order: Order): Promise<void> {
        console.log('Order added \n')
        console.log(order);
    }
    findOrder(id: string): Promise<Order> {
        throw new Error("Method not implemented.");
    }

}