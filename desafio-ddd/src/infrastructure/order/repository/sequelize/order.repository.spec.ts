import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import CostumerModel from "../../../customer/repository/sequelize/costumer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
    
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([CostumerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        sequelize.close();
    })
    
    it("should create a new order", async () => {
        const customer = await createCustomer();
        const product = await createProduct("123", "Product 1", 10);

        const orderItem = createOrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("123", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customerId: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    orderId: "123",
                    productId: "123",
                }
            ]
        })
    })

    it("should throw error find an order", async () => {
        const orderRepository = new OrderRepository();
        await expect(orderRepository.find("123")).rejects.toThrow("Order not found");
    })

    it("should find an order", async () => {
        const customer = await createCustomer();
        const product = await createProduct("123", "Product 1", 10);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        )

        const order = new Order("123", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const foundOrder = await orderRepository.find(order.id);

        expect(order).toStrictEqual(foundOrder);

    })

    it("should find all orders", async () => {
        const customer = await createCustomer();

        const product1 = await createProduct("123", "Product 1", 10);
        const product2 = await createProduct("456", "Product 2", 20);
        const product3 = await createProduct("789", "Product 3", 30);

        const orderItem1 = createOrderItem("1", product1.name, product1.price, product1.id, 2);
        const orderItem2 = createOrderItem("2", product2.name, product2.price, product2.id, 3);
        const orderItem3 = createOrderItem("3", product3.name, product3.price, product3.id, 4);

        const order1 = new Order("1", customer.id, [orderItem1]);
        const order2 = new Order("2", customer.id, [orderItem2, orderItem3]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);
        await orderRepository.create(order2);

        const foundOrders = await orderRepository.findAll();
        expect(foundOrders).toStrictEqual([order1, order2]);
    })

    it("should add new item an order", async () => {
        const customer = await createCustomer();

        const product1 = await createProduct("123", "Product 1", 10);
        const product2 = await createProduct("456", "Product 2", 20);
        const product3 = await createProduct("789", "Product 3", 30);

        const orderItem1 = createOrderItem("1", product1.name, product1.price, product1.id, 2);
        const orderItem2 = createOrderItem("2", product2.name, product2.price, product2.id, 3);
        const orderItem3 = createOrderItem("3", product3.name, product3.price, product3.id, 4);

        let order1 = new Order("1", customer.id, [orderItem1]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);

        order1.addNewItem(orderItem2);
        order1.addNewItem(orderItem3);

        await orderRepository.update(order1);
        const foundOrder = await orderRepository.find(order1.id);

        expect(foundOrder).toStrictEqual(order1);
    })

    it("should remove many items an order", async () => {
        const customer = await createCustomer();

        const product1 = await createProduct("123", "Product 1", 10);
        const product2 = await createProduct("456", "Product 2", 20);
        const product3 = await createProduct("789", "Product 3", 30);

        const orderItem1 = createOrderItem("1", product1.name, product1.price, product1.id, 2);
        const orderItem2 = createOrderItem("2", product2.name, product2.price, product2.id, 3);
        const orderItem3 = createOrderItem("3", product3.name, product3.price, product3.id, 4);

        let order1 = new Order("1", customer.id, [orderItem1, orderItem2, orderItem3]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);

        order1.removeItem(orderItem1.id);
        order1.removeItem(orderItem2.id);

        await orderRepository.update(order1);
    })

    async function createCustomer(): Promise<Customer> {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        return customer;
    }

    async function createProduct(id: string, name: string, price: number): Promise<Product> {
        const productRepository = new ProductRepository();
        const product = new Product(id, name, price);
        await productRepository.create(product);
        return product
    }

    function createOrderItem(id: string, name: string, price: number, productId: string, quantity: number): OrderItem {
        const orderItem = new OrderItem(
            id,
            name,
            price,
            productId,
            quantity
        )
        return orderItem;
    }
})