import Address from "../value-object/address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address?: Address;
    private _active: boolean = true;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    get id(): string {
        return this._id
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

    set id(id: string) {
        this._id = id;
    }

    set name(name: string) {
        this._name = name;
    }

    validate() {
        if (this._id.length == 0) {
           throw new Error("Id is required"); 
        }
        if (this._name.length == 0) {
            throw new Error("Name is required"); 
        }
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