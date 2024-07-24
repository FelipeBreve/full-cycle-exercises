import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository-interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customerId: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                productId: item.productId,
            }))
        }, {
            include: [{ model: OrderItemModel }]
        })
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update({
            customerId: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                productId: item.productId,
            }))
        }, {
            where: {
                id: entity.id
            }
        })

        for (const item of entity.items) {
            if (item.isCancelled()) {
                await OrderItemModel.destroy({ where: { id: item.id } });
                continue;
            }

            const orderItemModel = await OrderItemModel.findOne({ where: { id: item.id } });
            if (!orderItemModel) {
                await OrderItemModel.create({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    productId: item.productId,
                    orderId: entity.id
                })
            }
        }
    }

    async find(id: string): Promise<Order> {
        let orderModel = await OrderModel.findOne({  where: { id }, include: ["items"] });
        if (!orderModel) throw new Error("Order not found");
        const items = orderModel.items.map(item => new OrderItem(item.id, item.name, item.price, item.productId, item.quantity));
        const order = new Order(orderModel.id, orderModel.customerId, items);

        return order;
    }

    async findAll(): Promise<Order[]> {
        let orderModel = await OrderModel.findAll({ include: ["items"] });
        if (!orderModel) throw new Error("Order not found");

        const orders = orderModel.map(orderModel => {
            const items = orderModel.items.map(item => new OrderItem(item.id, item.name, item.price, item.productId, item.quantity));
            return new Order(orderModel.id, orderModel.customerId, items);
        });

        return orders;
    }
}