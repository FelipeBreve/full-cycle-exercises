import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ClientProps = {
    id?: Id;
    name: string;
    email: string;
    address: string;
}

export default class Client extends BaseEntity implements AggregateRoot {
    private name: string;
    private email: string;
    private address: string;

    constructor(props: ClientProps) {
        super(props.id);
        this.name = props.name;
        this.email = props.email;
        this.address = props.address;
    }

    get Name() {
        return this.name;
    }

    get Email() {
        return this.email;
    }

    get Address() {
        return this.address;
    }
}