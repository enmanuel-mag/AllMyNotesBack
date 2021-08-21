import dotenv from 'dotenv';
import express from 'express';

import api from './api'

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.use(api);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
