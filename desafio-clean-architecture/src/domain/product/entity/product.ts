import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
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
    }

    // validate() {
    //     ProductValidatorFactory.create().validate(this);
    //     this.notificationError();
    // }

    changeName(name: string) {
        this._name = name;
    }

    changePrice(price: number) {
        this._price = price;
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

    // notificationError() {
    //     if (this.notification.hasErrors()) {
    //         throw new NotificationError(this.notification.getErrors);
    //     }
    // }

    validate() {
        if (this.id === "") {
            this.notification.addError({ message: "Id is required", context: "Product" });
        } 

        if (this._name === "") {
            this.notification.addError({ message: "Name is required", context: "Product" });
        }

        if (this._price <= 0) {
            this.notification.addError({ message: "Price must be greater than zero", context: "Product" });
        }

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors);
        }
    }

}