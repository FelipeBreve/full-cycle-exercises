import InvoiceRepository from "../../repository/invoice.repository";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.dto";

export default class FindInvoiceUsecase {
    constructor(private readonly invoiceRepository: InvoiceRepository) { }

    async execute(id: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const output = await this.invoiceRepository.find(id);

        return {
            id: output.id.id,
            name: output.name,
            document: output.document,
            address: {
                street: output.address.street,
                number: output.address.number,
                complement: output.address.complement,
                city: output.address.city,
                state: output.address.state,
                zipCode: output.address.zipCode,
            },
            items: output.item.map(item => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price,
                }
            }),
            total: output.total(),
            createdAt: output.createdAt,
        }
    }
}