const { Kafka } = require('kafkajs');
const kafka = new Kafka({
clientId: 'my-app',
brokers: ['localhost:9092']
});
const producer = kafka.producer();
const run = async () => {
await producer.connect();
setInterval(async () => {
try {
await producer.send({
topic: 'test-topic',
messages: [
{ value: 'Message reçu' },
],
});
console.log('Message produit avec succès');
} catch (err) {
console.error("Erreur lors de la production de message", err);
}
}, 1000);
};
run().catch(console.error);