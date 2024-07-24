import express, { Request, Response } from 'express';
import ProductRepository from '../../../modules/store-catalog/repository/product.repository';
import { UpdateProductInputDto } from '../../../modules/store-catalog/usecase/add-product/update-product.dto';
import AddProductUseCase from '../../../modules/store-catalog/usecase/add-product/update-product.usecase';

export const producStoreRouter = express.Router();

producStoreRouter.put('', async (req: Request, res: Response) => {
    const usecase = new AddProductUseCase(new ProductRepository());
    try {
        const customerDto = {
            id: req.body.id,
            salesPrice: req.body.salesPrice,
        } as UpdateProductInputDto

        const output = await usecase.execute(customerDto);
        res.send(output);
    } catch (err: any) {
        res.status(500).send({
            error: err,
            message: err.message
        })
    }
});