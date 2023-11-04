import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import { verifyToken } from '../interfaces/middlewares/auth.middleware';
import sequelize from '../infrastructure/database/database';
import router from './routes';
const app = express();
config();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(verifyToken);
app.use(router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export default app;
// TODO: verificar que los usuarios en firebase sean los mismos que en la db
// TODO: Verficiar que el registro se haga bien
// TODO: verificar que solo el usuario logeado pueda ver sus transacciones, si es superadmin puede ver todo de todos
//
