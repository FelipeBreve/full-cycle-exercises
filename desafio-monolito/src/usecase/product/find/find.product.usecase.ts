import ProductRepositoryInterface from "../../../domain/product/repository/product-repository-interface";
import { InputFindProductDTO, OutputFindCustomerDTO } from "./find.product.dto";

export default class FindProductUseCase {
    private productRepository: ProductRepositoryInterface;
    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(dto: InputFindProductDTO): Promise<OutputFindCustomerDTO> {
        const product = await this.productRepository.find(dto.id);

        //Criaria um mapper
        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}