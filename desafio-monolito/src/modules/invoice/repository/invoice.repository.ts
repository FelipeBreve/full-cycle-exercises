import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import InvoiceItem from "../domain/invoice_item.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO } from "../usecase/find-invoice/find-invoice.dto";
import InvoiceModel from "./invoice.model";
import InvoiceItemModel from "./invoice_item.model";

export default class InvoiceRepository implements InvoiceGateway {
  async save(invoice: Invoice): Promise<void> {
    await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipcode: invoice.address.zipCode,
      items: invoice.item.map(item => {
        return {
          id: item.id.id,
          name: item.name,
          price: item.price,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      include: [{
        model: InvoiceItemModel,
        as: 'items'
      }]
    });
  }

  async find(invoiceParams: FindInvoiceUseCaseInputDTO): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: { id: invoiceParams.id },
      include: [{
        model: InvoiceItemModel,
        as: 'items' // Use o alias definido na associação
      }]
    });

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: new Address(
        invoice.street,
        invoice.number,
        invoice.complement,
        invoice.city,
        invoice.state,
        invoice.zipcode,
      ),
      items: invoice.items.map(item => {
        return new InvoiceItem({
          id: item.id,
          name: item.name,
          price: item.price,
        });
      }),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt
    });
  }

}