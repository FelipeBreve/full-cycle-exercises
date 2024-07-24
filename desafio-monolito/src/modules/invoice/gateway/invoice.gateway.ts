import Invoice from "../domain/invoice.entity";
import { FindInvoiceUseCaseInputDTO } from "../usecase/find-invoice/find-invoice.dto";

export default interface InvoiceGateway {
    save(invoice: Invoice): Promise<void> 
    find(invoice: FindInvoiceUseCaseInputDTO): Promise<Invoice> 
}