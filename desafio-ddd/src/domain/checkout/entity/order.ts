import OrderItem from "./order_item";

export default class Order {

    private _id: string;
    private _costumerId: string;
    private _items: OrderItem[] = [];
    private _total: number;
    private _isCanceled: boolean = false;

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._costumerId = customerId;
        this._items = items;
        this._total = this.total();
        this.validate()
    }

    get id(): string {
        return this._id;
    }

    validate(): void {
      if (this._id.length === 0) {
        throw new Error("Id is required")
      }  
      if (this._costumerId.length === 0) {
        throw new Error("CustumerId is required")
      }
      if (this._items.length === 0) {
        throw new Error("Itens are required")
      }
      if (this._items.some(item => item.quantity <= 0)) {
        throw new Error("Quantity must be greater than 0")
      }
    }

    total(): number {
      return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }

    addNewItem(ordemItem: OrderItem) {
      this._items.push(ordemItem);
      this.validate();
      this.updateTotal();
    }

    removeItem(orderItemId: string) {
      const item = this._items.find(item => item.id == orderItemId);
      item.cancel();
      this.validate();
      this.updateTotal();
    }

    updateTotal() {
      this._total = this.total();
    }

    get customerId(): string {
      return this._costumerId;
    }

    get items(): OrderItem[] {
      return this._items;
    }
}