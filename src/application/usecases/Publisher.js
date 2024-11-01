const { ServiceBusClient } = require('@azure/service-bus');
require('dotenv').config();
const connectionString = process.env.AZURE_SERVICE_BUS_CONNECTION_STRING;
const queueName = process.env.AZURE_QUEUE_NAME;

async function sendCrmMessage(crmData) {
    const sbClient = new ServiceBusClient("Endpoint=sb://hiscaresb.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=IzwGiha/eM+m2hvM9nM8wEtxaLAm3Vh4++ASbLv7Cx4="); // Chave Primária
    const sender = sbClient.createSender("cadastrarppacientev1"); // Sender

    try {
        const message = {
            body: { Crm: crmData },
            contentType: 'application/json',
        };
        await sender.sendMessages(message);
        console.log('Mensagem enviada para o Service Bus:', message.body);
    } catch (error) {
        console.error('Erro ao enviar mensagem para o Service Bus:', error);
    } finally {
        await sender.close();
        await sbClient.close();
    }
}

module.exports = { sendCrmMessage };
