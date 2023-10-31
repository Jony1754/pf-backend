import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserDB } from './UserDB';
import { CommerceDB } from './CommerceDB';
import { ProductDB } from './ProductDB';

@Table
export class TransactionDB extends Model {
  @ForeignKey(() => UserDB)
  @Column
  userId!: number;

  @BelongsTo(() => UserDB)
  user!: UserDB;

  @ForeignKey(() => CommerceDB)
  @Column
  commerceId!: number;

  @BelongsTo(() => CommerceDB)
  commerce!: CommerceDB;

  @ForeignKey(() => ProductDB)
  @Column
  productId!: number;

  @BelongsTo(() => ProductDB)
  product!: ProductDB;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  date!: Date;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  amount!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status!: string; // Ejemplo: 'completed', 'pending', etc.
}
