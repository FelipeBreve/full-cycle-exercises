import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../value-object/address";

export default class Customer extends Entity {
    private _name: string;
    private _address?: Address;
    private _active: boolean = true;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this._id = id;
        this._name = name;
        this.validate();

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors);
        }
    }

    get name(): string {
        return this._name
    }

    get address(): Address {
        return this._address
    }

    isActive(): boolean {
        return this._active;
    }

    set name(name: string) {
        this._name = name;
    }

    validate() {
        CustomerValidatorFactory.create().validate(this); 
    }

    changeName(name: string) {
        this._name = name;
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    activate() {
        this._active = true;
        if (this._address === undefined) {
            throw new Error("Address is mandatory to Customer")
        }
    }

    deactive() {
        this._active = false;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }
}