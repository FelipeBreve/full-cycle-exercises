import express, { Request, Response } from 'express';
import ClientRepository from '../../../modules/client-adm/repository/client.repository';
import AddClientUseCase from '../../../modules/client-adm/usecase/add-client/add-client.usecase';
import { AddClientInputDto } from '../../../modules/client-adm/usecase/add-client/add-client.usecase.dto';

export const customerRouter = express.Router();

customerRouter.post('/', async (req: Request, res: Response) => {
    const usecase = new AddClientUseCase(new ClientRepository());
    try {
        const customerDto = {
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            address: {
                street: req.body.street,
                number: req.body.number,
                complement: req.body.complement,
                city: req.body.city,
                state: req.body.state,
                zipCode: req.body.zipCode
            }
        } as AddClientInputDto

        const output = await usecase.execute(customerDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err)
    }
});