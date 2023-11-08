import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { TransactionDB } from './TransactionDB';
import { ProductDB } from './ProductDB';

// Nuevo modelo TransactionDetailDB
@Table
export class TransactionDetailDB extends Model {
  @ForeignKey(() => TransactionDB)
  @Column
  transactionId!: number;

  @ForeignKey(() => ProductDB)
  @Column
  productId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price!: number;

  @BelongsTo(() => ProductDB)
  product!: ProductDB;
}
