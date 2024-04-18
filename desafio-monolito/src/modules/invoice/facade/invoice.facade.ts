import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import GenerateInvoiceFacadeInterface, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export default class InvoiceFacade implements GenerateInvoiceFacadeInterface {
    private _useCaseGenerate: UseCaseInterface;
    private _useCaseFind: UseCaseInterface;

    constructor(usecaseGenerateProps: UseCaseInterface, usecaseFindProps: UseCaseInterface) {
        this._useCaseGenerate = usecaseGenerateProps;
        this._useCaseFind = usecaseFindProps;
    }

    async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        return await this._useCaseFind.execute(input);
    }

    async create(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        //Talvez aqui deveria ter algo para validar o retorno
        return this._useCaseGenerate.execute(input);
    }
}