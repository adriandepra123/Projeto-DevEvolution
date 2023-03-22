const express = require('express');
const passport = require('passport');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
const productsRoutes = require('./src/routes/product');
const ordersRoutes = require('./src/routes/order');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/product');
const app = express();

// Conexão com o banco de dados
const DB = require('./src/setup/DB');
DB.connect();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

// Autenticação JWT
require('./src/auth/passport');

// Rotas
app.use(userRoutes, productRoutes, authRoutes, ordersRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem vindo a nossa API' });
});

app.use('/product', passport.authenticate('jwt', { session: false }), productsRoutes);
app.use('/order', passport.authenticate('jwt', { session: false }), ordersRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta ${PORT}`);
});
