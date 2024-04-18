import express, { Request, Response } from 'express';
import InvoiceRepository from '../../../modules/invoice/repository/invoice.repository';
import { FindInvoiceUseCaseInputDTO } from '../../../modules/invoice/usecase/find-invoice/find-invoice.dto';
import FindInvoiceUsecase from '../../../modules/invoice/usecase/find-invoice/find-invoice.usecase';
import { GenerateInvoiceUseCaseInputDto } from '../../../modules/invoice/usecase/generate-invoice/generate-invoice.dto';
import GenerateInvoiceUsecase from '../../../modules/invoice/usecase/generate-invoice/generate-invoice.usecase';

export const invoiceRouter = express.Router();

invoiceRouter.get('/:id', async (req: Request, res: Response) => {
    const usecase = new FindInvoiceUsecase(new InvoiceRepository());
    try {
        const customerDto = {
            id: req.params.id
        } as FindInvoiceUseCaseInputDTO

        const output = await usecase.execute(customerDto);
        res.send(output);
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
});

invoiceRouter.post('/', async (req: Request, res: Response) => {
    const usecase = new GenerateInvoiceUsecase(new InvoiceRepository());
    try {
        const customerDto = {
            name: req.body.name,
            document: req.body.document,
            street: req.body.street,
            number: req.body.number,
            complement: req.body.complement,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            items: req.body.items
        } as GenerateInvoiceUseCaseInputDto

        const output = await usecase.execute(customerDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err)
    }
})