import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    modelName: "product-store-catalog",
    tableName: "products",
    timestamps: false,
})
export default class ProductStoreCaralogModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare description: string;

    @Column({ allowNull: false })
    declare salesPrice: number;
}