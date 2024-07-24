import express, { Request, Response } from 'express';
import FakeCheckoutRepository from '../../../modules/checkout/repository/fakeCheckout.repository';
import { PlaceOrderInputDto } from '../../../modules/checkout/usecase/place-order/place-order.dto';
import PlaceOrderUseCase from '../../../modules/checkout/usecase/place-order/place-order.usecase';
import ClientAdmFacadeFactory from '../../../modules/client-adm/factory/client-adm.facade.factory';
import InvoiceFacadeFactory from '../../../modules/invoice/factory/invoice.facade.factory';
import PaymentFacadeFactory from '../../../modules/payment/factory/payment.facade.factory';
import ProductAdmFacadeFactory from '../../../modules/product-adm/factory/facade.factory';
import StoreCatalogFacadeFactory from '../../../modules/store-catalog/factory/facade.factory';

export const checkoutRouter = express.Router();

checkoutRouter.post('/', async (req: Request, res: Response) => {
    const usecase = new PlaceOrderUseCase(
        ClientAdmFacadeFactory.create(),
        ProductAdmFacadeFactory.create(),
        StoreCatalogFacadeFactory.create(),
        new FakeCheckoutRepository(),
        InvoiceFacadeFactory.create(),
        PaymentFacadeFactory.create()
    );
    try {
        const customerDto = {
            clientId: req.body.clientId,
            products: req.body.products
        } as PlaceOrderInputDto

        const output = await usecase.execute(customerDto);
        res.send(output);
    } catch (err: any) {
        res.status(500).send({
            error: err,
            message: err.message
        })
    }
});