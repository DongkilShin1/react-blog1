const express = require('express');
const app = express();
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/local';
mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;

db.once('open', _ => {
  console.log('Database connected:', url)
});

db.on('error', err => {
  console.error('connection error:', err)
});

app.get('/', (req, res) => {
    res.send('hello world');
});

const port = 3003;

app.listen(port, () => console.log(`server is running on ${port}`));
