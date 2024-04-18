import Address from "../../../@shared/domain/value-object/address";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Invoice, { InvoiceProps } from "../../domain/invoice.entity";
import InvoiceItem from "../../domain/invoice_item.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";

export default class GenerateInvoiceUsecase implements UseCaseInterface {
    constructor(
        private readonly invoiceRepository: InvoiceGateway
    ) { }

    async execute(invoiceDto: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const invoiceItems = invoiceDto.items.map(item => {
            return new InvoiceItem({
                id: item.id,
                name: item.name,
                price: item.price,
            })
        });

        const addressVO = {
            street: invoiceDto.street,
            number: invoiceDto.number,
            complement: invoiceDto.complement,
            city: invoiceDto.city,
            state: invoiceDto.state,
            zipCode: invoiceDto.zipCode,
        } as Address;

        const props = {
            name: invoiceDto.name,
            document: invoiceDto.document,
            address: addressVO,
            items: invoiceItems,
        } as InvoiceProps;

        const invoice = new Invoice(props);
        await this.invoiceRepository.save(invoice);

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.item.map(item => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price,
                }
            }),
            total: invoice.total(),
        }
    }
}