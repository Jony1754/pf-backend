import { Sequelize } from 'sequelize-typescript';
import { UserDB } from './UserDB';
import { CommerceDB } from './CommerceDB';
import { ProductDB } from './ProductDB';
import { TransactionDB } from './TransactionDB';
import { QRCodeDB } from './QRCodeDB';

import { config } from 'dotenv';
import { TransactionDetailDB } from './TransactionDetailDB';
import { CartDB } from './CartDB';

// const sequelize = new Sequelize('qrcommerce', 'root', 'admin', {
//   host: 'localhost',
//   dialect: 'mysql',
//   models: [UserDB, CommerceDB, ProductDB, TransactionDB, QRCodeDB],
// });

config();

const DATABASE_USER = process.env.DATABASE_USER!;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD!;
const DATABASE_NAME = process.env.DATABASE_NAME!;
const DATABASE_HOST = process.env.DATABASE_HOST!;
const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: 'mysql',
    models: [
      UserDB,
      CommerceDB,
      ProductDB,
      TransactionDB,
      TransactionDetailDB,
      QRCodeDB,
      CartDB,
    ],
  }
);
export default sequelize;
