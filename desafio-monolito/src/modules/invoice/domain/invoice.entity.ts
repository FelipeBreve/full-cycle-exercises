import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "./invoice_item.entity";

export type InvoiceProps = {
    id?: Id;
    name: string;
    document: string;
    address: Address;
    items: InvoiceItem[];
    updatedAt: Date;
    createdAt: Date;
};

export default class Invoice extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _document: string;
    private _address: Address;
    private _items: InvoiceItem[];

    constructor(props: InvoiceProps) {
        super(props.id);
        this._name = props.name;
        this._document = props.document;
        this._address = props.address;
        this._items = props.items;
        this.validate();
    }

    validate(): void {
        if (this._name.length <= 0) {
            throw new Error("Name is required");
        }

        if (this._document.length <= 0) {
            throw new Error("Document is required");
        }
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get document(): string {
        return this._document;
    }

    set document(document: string) {
        this._document = document;
    }

    get address(): Address {
        return this._address;
    }

    set address(address: Address) {
        this._address = address;
    }

    get item(): InvoiceItem[] {
        return this._items;
    }

    set item(item: InvoiceItem[]) {
        this._items = item;
    }

    total(): number {
        return this._items.reduce((acc, item) => {
            return acc + item.price;
        }, 0);
    }
}