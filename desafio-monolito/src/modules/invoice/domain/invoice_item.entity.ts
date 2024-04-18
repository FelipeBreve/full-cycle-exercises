import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

export default class InvoiceItem extends BaseEntity {
    private _name: string;
    private _price: number;

    constructor(props: { id?: string, name: string, price: number }) {
        super(new Id(props.id));
        this._name = props.name;
        this._price = props.price;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get price(): number {
        return this._price
    }

    set price(price: number) {
        this._price = price;
    }
}