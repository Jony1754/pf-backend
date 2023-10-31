import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { UserDB } from './UserDB';
import { ProductDB } from './ProductDB';

@Table
export class CommerceDB extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address!: string;

  @ForeignKey(() => UserDB)
  @Column
  userId!: number;

  @BelongsTo(() => UserDB)
  user!: UserDB;

  @HasMany(() => ProductDB)
  products!: ProductDB[];
}
