import express from 'express';
const app = express();

app.get('/', (_req, _res) => {
  _res.send('hello world');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});