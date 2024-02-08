import express, { Request, Response } from 'express';
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase';
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import CustomerPresenter from '../presenters/customer.presenter';

export const customerRouter = express.Router();

customerRouter.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateCustomerUseCase(new CustomerRepository());
    try {
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                number: req.body.address.number,
                zip: req.body.address.zip
            }
        }

        const output = await usecase.execute(customerDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err)
    }
});

customerRouter.get("/", async (req: Request, res: Response) => { 
    const usecase = new ListCustomerUseCase(new CustomerRepository());
    try {
        const output = await usecase.execute();
        console.log(output)
        
        res.format({
            json: () => {
                res.json(output);
            },
            xml: () => {
                res.type("application/xml");
                res.send(CustomerPresenter.listXML(output));
            },
            default: () => {
                res.status(406).send("Not Acceptable");
            },
        });
    } catch (err) {
        res.status(500).send(err)
    }
})