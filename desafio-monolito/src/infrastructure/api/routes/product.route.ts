import express, { Request, Response } from 'express';
import ProductRepository from '../../../modules/product-adm/repository/product.repository';
import { AddProductInputDto } from '../../../modules/product-adm/usecase/add-product/add-product.dto';
import AddProductUseCase from '../../../modules/product-adm/usecase/add-product/add-product.usecase';

export const productRouter = express.Router();

productRouter.post('/', async (req: Request, res: Response) => {
    const usecase = new AddProductUseCase(new ProductRepository());
    try {
        const customerDto = {
            name: req.body.name,
            description: req.body.description,
            purchasePrice: req.body.purchasePrice,
            stock: req.body.stock
        } as AddProductInputDto

        const output = await usecase.execute(customerDto);
        res.send(output);
    } catch (err: any) {
        res.status(500).send({
            error: err,
            message: err.message
        })
    }
});