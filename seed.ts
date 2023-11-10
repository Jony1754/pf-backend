import { UserDB } from './src/infrastructure/database/UserDB';
import { CommerceDB } from './src/infrastructure/database/CommerceDB';
import { ProductDB } from './src/infrastructure/database/ProductDB';
import { TransactionDB } from './src/infrastructure/database/TransactionDB';
import { QRCodeDB } from './src/infrastructure/database/QRCodeDB';
import { auth } from './src/infrastructure/firebase/authentication';
import sequelize from './src/infrastructure/database/database';
import bcrypt from 'bcrypt';
import QRCode from 'qrcode';
import { randomInt } from 'crypto';
import { TransactionDetailDB } from './src/infrastructure/database/TransactionDetailDB';
async function seedDatabase() {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  await sequelize.sync({ force: true });
  const jonathanpp =
    'https://previews.dropbox.com/p/thumb/ACH53ZZCQ1CB3hEFJlQNwcwCIca2t_QJYv6I0K6bRxVRf7SBeHXMeXDEdaq6gdMZG5RPwzqUjTf6AAgiyBucDVUMWEx95D15bVgrPm3d6BYmWH3nAOssumEJfP3wYwCUcQFPh73JnL53WSqQDAsyY1RWACZH38JRtU4G7lgdIDcqxwHsOKrGq3p38EaVZKJy1Y5R8f4xynDMvQoWSGt4KJS0oS_Z4G4By2lEje2J8KUdrkYaGzi2qfVd6pLK1R8P1i4thAK9Wifw44uuDIUh6IPI4zcUv3eGsUGc51R82nSPrRXn7rwHvxrIp6fpVw0mqzkmW5p2ZL5vOk3MJWR04AJ8/p.png';
  const jorgepp =
    'https://previews.dropbox.com/p/thumb/ACFDAn27kZqzpNVWQ96aftfWjA9YEK2uG7jtbdoW8tDvnRgyu6aPPInDtEXCTyiDi8OusRPHU7xf7fy6-lQDMWvm-qDj4lC5DibwIaeizT58--j-JnXMwFLfFjq0ghk2K-Mer5wgh59WrXRJaPr3gWi5U4lfQnjqRAm7QKlr4hIc6JLWpdXxXp90F2bY_DV5ubHqv-ps8Vd3CHxoOkLhvdDUCO0TWS0c3tJNKSBCOLBIe_l5di42NrzXZRFOSj--ojqVv75Qac4URH7iggghQHYdfj4LsnJo4ymgRsluTCY5s3zB0rV-m4yrJVJyIEQmI_sogePOfgOfIJajSPCQt9Sw/p.jpeg';
  const password = 'password';
  const hashedPassword = await bcrypt.hash('password', 10);

  const PRODUCTS = [
    'Bluetooth Noise-Canceling Headphones',
    'Smart Fitness Watch',
    'Portable Solar Charger',
    'Wireless Ergonomic Keyboard',
    'Virtual Reality Headset',
    'Drone with HD Camera',
    'Handheld Gimbal Stabilizer',
    'Smart Home Hub',
    'Waterproof Bluetooth Speaker',
    'Universal Travel Adapter',
  ];

  // ONLY NEED TO RUN THIS ONCE TO CREATE THE USERS IN FIREBASE

  // const firebaseUser0 = await auth.createUser({
  //   email: 'jony1754@hotmail.com',
  //   password: password,
  //   displayName: 'Jonathan Arias',
  // });

  // const firebaseUser1 = await auth.createUser({
  //   email: 'john@example.com',
  //   password: password,
  //   displayName: 'John Doe',
  // });

  // const firebaseUser2 = await auth.createUser({
  //   email: 'alice@example.com',
  //   password: password,
  //   displayName: 'Alice Smith',
  // });

  // const firebaseUser3 = await auth.createUser({
  //   email: 'bob@example.com',
  //   password: password,
  //   displayName: 'Bob Johnson',
  // });

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

  const user2 = await UserDB.create({
    name: 'Alice Smith',
    email: 'alice@example.com',
    password: hashedPassword,
    imgUri:
      'https://img.freepik.com/free-photo/modern-woman-taking-selfie_23-2147893976.jpg?w=1380&t=st=1699475021~exp=1699475621~hmac=aac8beb40e0a71e1e06aa81f9a0c1c095e1edfbbe21ad74dce06848d13a3858d',
    balance: 150.0,
  });

  const user3 = await UserDB.create({
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: hashedPassword,
    imgUri:
      'https://img.freepik.com/free-photo/crazy-sports-man-funny-expression_1194-3304.jpg?w=1380&t=st=1699474938~exp=1699475538~hmac=12f97ebecfc12a001c86fac93e83841cc138189215d2c401bd24234d25cbf1b8',
    balance: 200.0,
  });

  const commerce1 = await CommerceDB.create({
    name: "KM5's Store",
    address: 'Puerto Colombia KM5, Atlantico, Colombia',
    nit: '123456789-1',
  });

  const products = await Promise.all(
    PRODUCTS.map(async (productName, index) => {
      const product = await ProductDB.create({
        name: productName,
        price: (index + 1) * 10 + randomInt(0, 99) / 100, // Genera un precio aleatorio
        commerceId: commerce1.id,
      });
      console.log('product created: ', product.dataValues);
      // Genera un código QR para cada producto
      const qrCodeData = await QRCode.toDataURL(product.id.toString());
      await QRCodeDB.create({
        productId: product.id,
        code: qrCodeData,
      });
      return product;
    })
  );

  // Crea transacciones con detalles para cada usuario
  for (const user of [user0, user1, user2, user3]) {
    // Crea un número aleatorio de transacciones para cada usuario
    const numTransactions = randomInt(1, 5); // Por ejemplo, cada usuario tendrá de 1 a 4 transacciones
    for (let t = 0; t < numTransactions; t++) {
      let totalAmount = 0;
      const transaction = await TransactionDB.create({
        userId: user.id,
        commerceId: commerce1.id,
        date: new Date(),
        amount: 0, // Inicializa en 0 y actualiza después con el monto total
        status: 'completed',
      });

      // Crea una lista aleatoria de productos para la transacción actual
      const numProducts = randomInt(1, products.length); // Número aleatorio de productos para esta transacción
      const purchasedProducts = products
        .sort(() => 0.5 - Math.random())
        .slice(0, numProducts);

      for (const product of purchasedProducts) {
        const quantity = randomInt(1, 3); // Cantidad aleatoria de cada producto
        const price = product.price * quantity;
        totalAmount += price;
        await TransactionDetailDB.create({
          transactionId: transaction.id,
          productId: product.id,
          quantity: quantity,
          price: product.price, // Usa el precio unitario del producto
        });
      }

      // Actualiza el monto total de la transacción
      await transaction.update({ amount: totalAmount });
    }
  }

  console.log('Database seeded!');
}

seedDatabase().catch((error) => {
  console.error('Error seeding database:', error);
});
