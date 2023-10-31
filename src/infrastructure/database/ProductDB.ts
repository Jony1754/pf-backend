  import {
    Model,
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
    HasOne,
  } from 'sequelize-typescript';
  import { CommerceDB } from './CommerceDB';
  import { QRCodeDB } from './QRCodeDB';

  @Table
  export class ProductDB extends Model {
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    name!: string;

    @Column({
      type: DataType.FLOAT,
      allowNull: false,
    })
    price!: number;

    @ForeignKey(() => CommerceDB)
    @Column
    commerceId!: number;

    @BelongsTo(() => CommerceDB)
    commerce!: CommerceDB;

    @HasOne(() => QRCodeDB)
    qrCode!: QRCodeDB;
  }
