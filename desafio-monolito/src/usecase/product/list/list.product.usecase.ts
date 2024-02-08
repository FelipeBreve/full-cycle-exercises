import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository-interface";
import { InputListProductDTO, OutputListCustomerDTO } from "./list.product.dto";

export default class ListProductUseCase {
    private productRepository: ProductRepositoryInterface;
    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(_dto?: InputListProductDTO): Promise<OutputListCustomerDTO> {
        const product = await this.productRepository.findAll();

        return OutputMapper.toDTO(product);
    }
}

class OutputMapper {
    static toDTO(products: Product[]): OutputListCustomerDTO {
        return {
            products: products.map((product) => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price
                }
            })
        }
    }
}