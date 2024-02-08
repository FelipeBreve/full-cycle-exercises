import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductValidatorFactory from "../factory/product.validator.factory";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface {

    _id: string;
    _name: string;
    _price: number;

    constructor(id: string, name: string, price: number) {
        super();
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
        this.notificationError();
    }

    validate() {
        ProductValidatorFactory.create().validate(this);
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changePrice(price: number) {
        this._price = price;
        this.validate();
        console.log(this.notification)
        this.notificationError();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name
    }

    get price(): number {
        return this._price;
    }

    notificationError() {
        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors);
        }
    }

}