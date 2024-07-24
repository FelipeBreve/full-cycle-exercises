export interface InputListProductDTO {}

export type Product = {
    id: string;
    name: string;
    price: number;
}

export interface OutputListCustomerDTO {
    products: Product[];
}