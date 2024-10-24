const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./interfaces/controllers/UserController');
require('dotenv').config();  // Carregar variáveis de ambiente do arquivo .env
const { ServiceBusClient } = require("@azure/service-bus");

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conectar ao MongoDB (verifique se a URI do MongoDB está no arquivo .env)
mongoose.connect(`mongodb+srv://gustavofarignoli:SQmSzBvJfmO0lnQn@hiscare.x1hql.mongodb.net/?retryWrites=true&w=majority&appName=HISCare`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Usar as rotas de usuários
app.use('/users', userRoutes);

// Configurar o Azure Service Bus
const connectionString = "Endpoint=sb://hiscaresb.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=IzwGiha/eM+m2hvM9nM8wEtxaLAm3Vh4++ASbLv7Cx4=";
const queueName = "cadastrarppacientev1";

// Função para enviar mensagem para o Azure Service Bus
async function sendMessageToServiceBus(messageBody) {
    const sbClient = new ServiceBusClient(connectionString);
    const sender = sbClient.createSender(queueName);

    try {
        const message = {
            body: messageBody,
            label: "UserAction",
            userProperties: {
                createdBy: "Express App"
            }
        };
        console.log(`Enviando mensagem para a fila: ${queueName}`);
        await sender.sendMessages(message);
        console.log("Mensagem enviada com sucesso!");
    } catch (err) {
        console.error("Erro ao enviar mensagem para o Service Bus:", err);
    } finally {
        await sender.close();
        await sbClient.close();
    }
}

// Exemplo de rota para enviar uma mensagem ao Service Bus
app.post('/send-message', async (req, res) => {
    const { message } = req.body;  // Captura a mensagem do corpo da requisição
    if (!message) {
        return res.status(400).send("Mensagem inválida");
    }

    try {
        await sendMessageToServiceBus(message);
        res.status(200).send("Mensagem enviada com sucesso para o Service Bus");
    } catch (err) {
        res.status(500).send("Erro ao enviar mensagem para o Service Bus");
    }
});

// Definir a porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
