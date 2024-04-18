import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { Umzug } from "umzug";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { InvoiceItemModel, InvoiceModel, setupAssociations } from "../../modules/invoice/repository";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import ProductStoreCaralogModel from "../../modules/store-catalog/repository/product.model";
import { migrator } from "../test-migrations/config-migrations/migrator";
import { checkoutRouter } from "./routes/checkout.route";
import { customerRouter } from "./routes/clients.route";
import { invoiceRouter } from "./routes/invoice.route";
import { producStoreRouter } from "./routes/product-store.route";
import { productRouter } from "./routes/product.route";

export const app: Express = express();
app.use(express.json());
app.use("/clients", customerRouter);
app.use("/products", productRouter);
app.use("/products-store", producStoreRouter);
app.use("/checkout", checkoutRouter);
app.use("/invoice", invoiceRouter);

export let sequelize: Sequelize;

let umzug: Umzug<any>;

export const init = async () => {
    sequelize = new Sequelize({
        dialect: "sqlite",
        logging: false
    });
    sequelize.addModels([ClientModel, ProductModel, InvoiceItemModel, InvoiceModel, ProductStoreCaralogModel, TransactionModel]);
    setupAssociations()
    umzug = migrator(sequelize);
    await umzug.up();
}
init();