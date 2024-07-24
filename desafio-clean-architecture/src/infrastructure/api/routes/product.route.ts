import express, { Request, Response } from 'express';
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase';
import FindProductUseCase from '../../../usecase/product/find/find.product.usecase';
import ListProductUseCase from '../../../usecase/product/list/list.product.usecase';
import UpdateProductUseCase from '../../../usecase/product/update/update.product.usecase';
import ProductRepository from '../../product/repository/sequelize/product.repository';

export const productRouter = express.Router();

productRouter.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository());
    try {
        const customerDto = {
            name: req.body.name,
            price: req.body.price
        }

        const output = await usecase.execute(customerDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err)
    }
});

productRouter.put('/', async (req: Request, res: Response) => {
    const usecase = new UpdateProductUseCase(new ProductRepository());
    try {
        const customerDto = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price
        }

        const output = await usecase.execute(customerDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err)
    }
});

productRouter.get('/:id', async (req: Request, res: Response) => {
    const usecase = new FindProductUseCase(new ProductRepository());
    try {
        const customerDto = {
            id: req.params.id,
        }

        const output = await usecase.execute(customerDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err)
    }
});

productRouter.get('/', async (req: Request, res: Response) => {
    const usecase = new ListProductUseCase(new ProductRepository());
    try {
        const output = await usecase.execute();
        res.send(output);
    } catch (err) {
        res.status(500).send(err)
    }
});

// productRouter.get("/", async (req: Request, res: Response) => { 
//     const usecase = new ListCustomerUseCase(new CustomerRepository());
//     try {
//         const output = await usecase.execute();
//         console.log(output)
        
//         res.format({
//             json: () => {
//                 res.json(output);
//             },
//             xml: () => {
//                 res.type("application/xml");
//                 res.send(CustomerPresenter.listXML(output));
//             },
//             default: () => {
//                 res.status(406).send("Not Acceptable");
//             },
//         });
//     } catch (err) {
//         res.status(500).send(err)
//     }
// })