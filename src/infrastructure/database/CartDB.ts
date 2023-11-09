// src/infrastructure/database/CartDB.ts

import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { UserDB } from './UserDB';
import { ProductDB } from './ProductDB';

@Table
export class CartDB extends Model {
  @ForeignKey(() => UserDB)
  @Column
  userId!: number;

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
  price!: number; // This could be the unit price or the total price for the quantity
}
