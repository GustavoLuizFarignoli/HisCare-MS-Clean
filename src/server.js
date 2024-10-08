const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./interfaces/controllers/UserController');
require('dotenv').config();  // Carregar variáveis de ambiente do arquivo .env


// Agora, você pode acessar as variáveis de ambiente com process.env
const MONGO_URI = process.env.MONGO_URI;

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conectar ao MongoDB (verifique se a URI do MongoDB está no arquivo .env)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Usar as rotas de usuários
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;

