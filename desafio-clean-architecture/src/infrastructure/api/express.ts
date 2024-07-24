import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequelize/costumer.model";
import ProductModel from "../product/repository/sequelize/product.model";
import { customerRouter } from "./routes/customer.route";
import { productRouter } from "./routes/product.route";

export const app: Express = express();
app.use(express.json());
app.use("/customer", customerRouter);
app.use("/product", productRouter);

export let sequelize: Sequelize;

export const init = async () => {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        // sync: { force: true }
    });
    sequelize.addModels([CustomerModel, ProductModel]);
    sequelize.sync();
}
init();