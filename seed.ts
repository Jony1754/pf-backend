import { UserDB } from './src/infrastructure/database/UserDB';
import { CommerceDB } from './src/infrastructure/database/CommerceDB';
import { ProductDB } from './src/infrastructure/database/ProductDB';
import { TransactionDB } from './src/infrastructure/database/TransactionDB';
import { QRCodeDB } from './src/infrastructure/database/QRCodeDB';
import sequelize from './src/infrastructure/database/database';
import bcrypt from 'bcrypt';
import QRCode from 'qrcode';
async function seedDatabase() {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  await sequelize.sync({ force: true });

  const hashedPassword = await bcrypt.hash('password_for_john', 10);

  const user1 = await UserDB.create({
    name: 'John Doe',
    email: 'john@example.com',
    password: hashedPassword,
    balance: 100.0,
  });

  const commerce1 = await CommerceDB.create({
    name: "John's Store",
    address: '123 Main St',
    userId: user1.id,
  });

  const product1 = await ProductDB.create({
    name: 'Widget',
    price: 9.99,
    commerceId: commerce1.id,
  });

  const qrCodeData = await QRCode.toDataURL(product1.id.toString());
  await QRCodeDB.create({
    productId: product1.id,
    code: qrCodeData,
  });

  await TransactionDB.create({
    userId: user1.id,
    commerceId: commerce1.id,
    productId: product1.id,
    date: new Date(),
    amount: product1.price,
    status: 'completed',
  });

  console.log('Database seeded!');
}

seedDatabase().catch((error) => {
  console.error('Error seeding database:', error);
});
