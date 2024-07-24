import InvoiceModel from "./invoice.model";
import InvoiceItemModel from "./invoice_item.model";

export const setupAssociations = () => {
    InvoiceModel.hasMany(InvoiceItemModel, {
        foreignKey: 'invoiceId', as: 'items', onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
    InvoiceItemModel.belongsTo(InvoiceModel, { foreignKey: 'invoiceId' });
};