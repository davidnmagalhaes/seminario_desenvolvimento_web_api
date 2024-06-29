import express from 'express';
import pool from '../src/config/database';
import { createCategory, getCategories } from './models/categoryModels';
import { createNews, getNews } from './models/newsModels';
import 'dotenv/config'
import cors from 'cors';

const app = express();

// Configuração de cors para permitir requisições do frontend
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

// Rota inicial retornando a data e hora atual
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

// Rota para cadastrar uma categoria
app.post('/categories', async (req, res) => {
  try {
    const category = req.body;
    const newCategory = await createCategory(category);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).send('Error creating category: ' + error);
  }
});

// Rota para listar as categorias
app.get('/categories', async (req, res) => {
  try {
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).send('Error fetching categories: ' + error);
  }
});

// Rota para cadastrar uma notícia
app.post('/news', async (req, res) => {
  try {
    const news = req.body;
    const newNews = await createNews(news);
    res.status(201).json(newNews);
  } catch (error) {
    res.status(500).send('Error creating news: ' + error);
  }
});

// Rota para listar as notícias
app.get('/news', async (req, res) => {
  try {
    const newsList = await getNews();
    res.status(200).json(newsList);
  } catch (error) {
    res.status(500).send('Error fetching news: ' + error);
  }
});

// Inicia o servidor na porta definida na variável de ambiente PORT ou 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
