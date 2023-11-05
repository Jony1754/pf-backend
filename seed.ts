import { UserDB } from './src/infrastructure/database/UserDB';
import { CommerceDB } from './src/infrastructure/database/CommerceDB';
import { ProductDB } from './src/infrastructure/database/ProductDB';
import { TransactionDB } from './src/infrastructure/database/TransactionDB';
import { QRCodeDB } from './src/infrastructure/database/QRCodeDB';
import { auth } from './src/infrastructure/firebase/authentication';
import sequelize from './src/infrastructure/database/database';
import bcrypt from 'bcrypt';
import QRCode from 'qrcode';
async function seedDatabase() {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  await sequelize.sync({ force: true });
  const jonathanpp =
    'https://uc2b5ba8dda15b95e23c05d0416e.previews.dropboxusercontent.com/p/thumb/ACE21Tf4Wan7ZdpK21spwSSV2HGkc52Mjc3ne0H-4EmWa4NFQuECgmYTBQE5clkb4e7HpfMpLaswc9e9BHNzxZl5FCI8mhJd28PyjSknkeZN35jlDF778-vmLxVLCLShvNk6ch_HksXuowBanzDo68bNe0AndmPPxbg35IFVoP7GU0AlFuiCMXu5xRSlMg9fv-ws1W1Vkjlf7Tu0DUIy46Bs_zv4yZA4ED4ji19dRMYp_VJvnPOcCd0AoT3PWupZwCyVAc-cgmFB1Bc1D4kQRauvtPJWtVPq0A44zuGRmtQjpBbuVVAvhe3Mlj1N6vym2y0xcmy8clh09CuAJygshVIU3fvMDts3DsrWq0C6ufqUiFE8RxuBDjY5wY0T21DZhGc/p.png';
  const jorgepp =
    'https://previews.dropbox.com/p/thumb/ACFDAn27kZqzpNVWQ96aftfWjA9YEK2uG7jtbdoW8tDvnRgyu6aPPInDtEXCTyiDi8OusRPHU7xf7fy6-lQDMWvm-qDj4lC5DibwIaeizT58--j-JnXMwFLfFjq0ghk2K-Mer5wgh59WrXRJaPr3gWi5U4lfQnjqRAm7QKlr4hIc6JLWpdXxXp90F2bY_DV5ubHqv-ps8Vd3CHxoOkLhvdDUCO0TWS0c3tJNKSBCOLBIe_l5di42NrzXZRFOSj--ojqVv75Qac4URH7iggghQHYdfj4LsnJo4ymgRsluTCY5s3zB0rV-m4yrJVJyIEQmI_sogePOfgOfIJajSPCQt9Sw/p.jpeg';
  const password = 'password_for_john';
  const hashedPassword = await bcrypt.hash('password_for_john', 10);

  const firebaseUser0 = await auth.createUser({
    email: 'jony1754@hotmail.com',
    password: password,
    displayName: 'Jonathan Arias',
  });

  const firebaseUser1 = await auth.createUser({
    email: 'john@example.com',
    password: password,
    displayName: 'John Doe',
  });

  const user0 = await UserDB.create({
    name: 'Jonathan Arias',
    email: 'jony1754@hotmail.com',
    password: hashedPassword,
    imgUri: jonathanpp,
    balance: 100.0,
  });

  const user1 = await UserDB.create({
    name: 'John Doe',
    email: 'john@example.com',
    password: hashedPassword,
    imgUri: jorgepp,
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
