const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// Inicializando o app
const app = express();

// Middleware
app.use(bodyParser.json());

// Conectar ao MongoDB
connectDB();

// Importar as rotas dos casos de uso de "users"
const userRoutes = require('./users/controllers/UserController');

// Usar as rotas
app.use('/users', userRoutes);

// Inicializar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
