// src/infrastructure/database/PaymentMethodDB.ts

import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserDB } from './UserDB';

@Table
export class PaymentMethodDB extends Model {
  @ForeignKey(() => UserDB)
  @Column
  userId!: number;
  @BelongsTo(() => UserDB)
  user!: UserDB;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cardType!: string;

  @Column({
    type: DataType.STRING(4),
    allowNull: false,
  })
  lastFourDigits!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cardIdentifier!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 1000.0,
  })
  balance!: number;
}
