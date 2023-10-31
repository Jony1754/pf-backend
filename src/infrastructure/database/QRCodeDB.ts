import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ProductDB } from './ProductDB';

@Table
export class QRCodeDB extends Model {
  @ForeignKey(() => ProductDB)
  @Column
  productId!: number;

  @BelongsTo(() => ProductDB)
  product!: ProductDB;

  @Column({
    type: 'MEDIUMTEXT',
    allowNull: false,
  })
  code!: string; // Aquí almacenarías la representación del código QR, dependiendo de cómo lo generes
}
