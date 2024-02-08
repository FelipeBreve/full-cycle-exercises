import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository-interface";
import { InputCreateProductDTO, OutputCreateCustomerDTO } from "./create.product.dto";

export default class CreateProductUseCase {
    private productRepository: ProductRepositoryInterface;
    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(dto: InputCreateProductDTO): Promise<OutputCreateCustomerDTO> {
        const product = ProductFactory.create("a", dto.name, dto.price);

        this.productRepository.create(product as Product);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        };
    }
}