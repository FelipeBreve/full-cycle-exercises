import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository-interface";
import { Customer, InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input?: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this.customerRepository.findAll();
        return OutputMapper.toOutput(customers);
    }
}

class OutputMapper {
    static toOutput(customers: Customer[]): OutputListCustomerDto {
        return {
            customers: customers.map((customer) => {
                return {
                    id: customer.id,
                    name: customer.name,
                    address: {
                        street: customer.address.street,
                        city: customer.address.city,
                        number: customer.address.number,
                        zip: customer.address.zip
                    }
                };
            })
        }
    }
}