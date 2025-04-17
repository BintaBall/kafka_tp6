// consumer.js
const { Kafka } = require('kafkajs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/kafka_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Message = mongoose.model('Message', new mongoose.Schema({
  value: String,
  timestamp: { type: Date, default: Date.now }
}));

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});
const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ message }) => {
      const msgValue = message.value.toString();
      console.log({ value: msgValue });
      // Enregistrement dans MongoDB
      await Message.create({ value: msgValue });
    },
  });
};

run().catch(console.error);
