import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceItemModel from "./invoice_item.model";

@Table({
  tableName: "invoice",
  timestamps: false,
})
export default class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare document: string;

  @Column({ allowNull: false })
  declare street: string

  @Column({ allowNull: false })
  declare number: string

  @Column({ allowNull: true })
  declare complement: string

  @Column({ allowNull: false })
  declare city: string

  @Column({ allowNull: false })
  declare state: string

  @Column({ allowNull: false })
  declare zipcode: string

  @Column({ allowNull: false })
  declare createdAt: Date

  @Column({ allowNull: false })
  declare updatedAt: Date

  // @HasMany(() => InvoiceItemModel)
  // Foi feito essa gambiara, mas nao entendi o real motivo de nao funcionar
  declare items: InvoiceItemModel[];
}