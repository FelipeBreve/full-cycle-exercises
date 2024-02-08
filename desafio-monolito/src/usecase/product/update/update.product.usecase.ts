import ProductRepositoryInterface from "../../../domain/product/repository/product-repository-interface";
import { InputUpdateProductDTO, OutputUpdateCustomerDTO } from "./update.product.dto";

export default class UpdateProductUseCase {
    private productRepository: ProductRepositoryInterface;
    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(dto: InputUpdateProductDTO): Promise<OutputUpdateCustomerDTO> {
        const product = await this.productRepository.find(dto.id);

        product.changeName(dto.name);
        product.changePrice(dto.price);
        
        await this.productRepository.update(product);

        //Criaria um mapper
        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}