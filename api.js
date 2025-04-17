const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/kafka_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Message = mongoose.model('Message', new mongoose.Schema({
  value: String,
  timestamp: { type: Date, default: Date.now }
}));

app.get('/messages', async (req, res) => {
  const messages = await Message.find().sort({ timestamp: -1 });
  res.json(messages);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API REST démarrée sur http://localhost:${PORT}`);
});
