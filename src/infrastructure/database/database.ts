import { Sequelize } from 'sequelize-typescript';
import { UserDB } from './UserDB';
import { CommerceDB } from './CommerceDB';
import { ProductDB } from './ProductDB';
import { TransactionDB } from './TransactionDB';
import { QRCodeDB } from './QRCodeDB';

const sequelize = new Sequelize('qrcommerce', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
  models: [UserDB, CommerceDB, ProductDB, TransactionDB, QRCodeDB],
});
export default sequelize;
