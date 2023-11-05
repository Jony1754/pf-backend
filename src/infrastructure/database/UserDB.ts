import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { CommerceDB } from './CommerceDB';
import { TransactionDB } from './TransactionDB';

@Table
export class UserDB extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  imgUri!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;
  // the balance
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0.0, // Puedes establecer un saldo inicial por defecto, si lo deseas.
  })
  balance!: number;

  @HasMany(() => CommerceDB)
  commerces!: CommerceDB[];

  @HasMany(() => TransactionDB)
  transactions!: TransactionDB[];
}
