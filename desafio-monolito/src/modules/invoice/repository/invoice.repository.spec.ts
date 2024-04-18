import { Sequelize } from "sequelize-typescript";
import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice, { InvoiceProps } from "../domain/invoice.entity";
import InvoiceItem from "../domain/invoice_item.entity";
import { InvoiceItemModel, InvoiceModel, setupAssociations } from "./index";
import InvoiceRepository from "./invoice.repository";

describe("InvoiceRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    setupAssociations();
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a invoice", async () => {
    const invoiceItems1 = new InvoiceItem({
      id: '1',
      name: "Product 1",
      price: 100,
    })

    const invoiceItems2 = new InvoiceItem({
      id: '2',
      name: "Product 2",
      price: 200,
    })

    const addressVO = {
      street: "Main Street",
      number: "123",
      complement: "Near the park",
      city: "New York",
      state: "NY",
      zipCode: "12345678",
    } as Address;

    const props = {
      name: "John Doe",
      document: "123456789",
      address: addressVO,
      items: [invoiceItems1, invoiceItems2],
    } as InvoiceProps;

    const invoice = new Invoice(props);
    const invoiceRepository = new InvoiceRepository();
    await invoiceRepository.save(invoice);

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: invoice.id.id },
      include: [{
        model: InvoiceItemModel,
        as: 'items' // Use o alias definido na associação
      }]
    });

    const formatarData = (data: Date) => data.toISOString().split('.')[0];

    expect(invoiceDb).not.toBeNull();
    expect(invoiceDb.id).toBe(invoice.id.id);
    expect(invoiceDb.name).toBe(invoice.name);
    expect(invoiceDb.document).toBe(invoice.document);
    expect(invoiceDb.street).toBe(invoice.address.street);
    expect(invoiceDb.number).toBe(invoice.address.number);
    expect(invoiceDb.complement).toBe(invoice.address.complement);
    expect(invoiceDb.city).toBe(invoice.address.city);
    expect(invoiceDb.state).toBe(invoice.address.state);
    expect(invoiceDb.zipcode).toBe(invoice.address.zipCode);
    expect(formatarData(invoiceDb.createdAt)).toStrictEqual(formatarData(invoice.createdAt));
    expect(formatarData(invoiceDb.updatedAt)).toStrictEqual(formatarData(invoice.updatedAt));
    expect(invoiceDb.items.length).toBe(2);
    expect(invoiceDb.items[0].id).toBe(invoiceItems1.id.id);
    expect(invoiceDb.items[0].name).toBe(invoiceItems1.name);
    expect(invoiceDb.items[0].price).toBe(invoiceItems1.price);
    expect(invoiceDb.items[1].id).toBe(invoiceItems2.id.id);
    expect(invoiceDb.items[1].name).toBe(invoiceItems2.name);
    expect(invoiceDb.items[1].price).toBe(invoiceItems2.price);
  });

  it("should find a invoice", async () => {
    const props = {
      id: new Id().id,
      name: 'John Doe',
      document: '123456789',
      street: 'Main Street',
      number: '123',
      complement: 'Near the park',
      city: 'New York',
      state: 'NY',
      zipcode: '12345678',
      items: [
        {
          id: '1',
          createdAt: '2024-02-29T11:42:25.587Z',
          updatedAt: '2024-02-29T11:42:25.587Z',
          name: 'Product 1',
          price: 100
        },
        {
          id: '2',
          createdAt: '2024-02-29T11:42:25.587Z',
          updatedAt: '2024-02-29T11:42:25.587Z',
          name: 'Product 2',
          price: 200
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    await InvoiceModel.create(props, {
      include: [{
        model: InvoiceItemModel,
        as: 'items'
      }]
    });

    const invoiceRepository = new InvoiceRepository();
    const invoice = await invoiceRepository.find({ id: props.id });

    const formatarData = (data: Date) => data.toISOString().split('.')[0];

    expect(invoice).not.toBeNull();
    expect(invoice.id.id).toBe(props.id);
    expect(invoice.name).toBe(props.name);
    expect(invoice.document).toBe(props.document);
    expect(invoice.address.street).toBe(props.street);
    expect(invoice.address.number).toBe(props.number);
    expect(invoice.address.complement).toBe(props.complement);
    expect(invoice.address.city).toBe(props.city);
    expect(invoice.address.state).toBe(props.state);
    expect(invoice.address.zipCode).toBe(props.zipcode);
    expect(formatarData(invoice.createdAt)).toStrictEqual(formatarData(props.createdAt));
    expect(formatarData(invoice.updatedAt)).toStrictEqual(formatarData(props.updatedAt));
    expect(invoice.item.length).toBe(2);
    expect(invoice.item[0].id.id).toBe(props.items[0].id);
    expect(invoice.item[0].name).toBe(props.items[0].name);
    expect(invoice.item[0].price).toBe(props.items[0].price);
    expect(invoice.item[1].id.id).toBe(props.items[1].id);
    expect(invoice.item[1].name).toBe(props.items[1].name);
    expect(invoice.item[1].price).toBe(props.items[1].price);
    expect(invoice.total()).toBe(300);

  });
});