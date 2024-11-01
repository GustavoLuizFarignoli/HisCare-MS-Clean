// Arquivo principal: app.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./interfaces/controllers/UserController');
const { sendCrmMessage } = require('./application/usecases/Publisher');
require('dotenv').config();

const MONGO_URI = "mongodb+srv://gustavofarignoli:SQmSzBvJfmO0lnQn@hiscare.x1hql.mongodb.net/?retryWrites=true&w=majority&appName=HISCare";
const app = express();

app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

    app.post('/sendCrm', async (req, res) => {
        const Crm = req.body.Crm_Medico;
    
        if (!Crm) {
            return res.status(400).json({ message: 'CRM_Medico is required' });
        }
    
        try {
            await sendCrmMessage(Crm.trim()); 
            res.status(200).json({ message: 'CRM enviado para a fila com sucesso!' });
        } catch (error) {
            console.error('Erro ao enviar CRM:', error);
            res.status(500).json({ message: 'Erro ao enviar CRM para o Service Bus' });
        }
    });


// Usar as rotas de usuários
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
