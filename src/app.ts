import express from 'express';
import pool from '@config/database';

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    res.send(result.rows[0]);
  } catch (error) {
    res.status(500).send('Unable to connect to the database: ' + error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});