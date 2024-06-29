import pool from '../config/database';
import { News } from './interface/INews';

interface NewsWithCategory {
  id: number;
  title: string;
  content: string;
  category_name: string;
  category_id: number;
  created_at: Date;
}

// Função para criar uma notícia
const createNews = async (news: News): Promise<NewsWithCategory> => {
  const { title, content, category_id } = news;

  // Verifica se a categoria existe
  const categoryResult = await pool.query(
    'SELECT * FROM categories WHERE id = $1',
    [category_id]
  );

  // Se a categoria não existir, lança um erro
  if (categoryResult.rowCount === 0) {
    throw new Error('Categoria não encontrada');
  }

  // Insere a notícia se a categoria existir
  const insertResult = await pool.query(
    'INSERT INTO news (title, content, category_id) VALUES ($1, $2, $3) RETURNING *',
    [title, content, category_id]
  );

  const newsId = insertResult.rows[0].id;

  // Retorna a notícia cadastrada com o nome da categoria
  const result = await pool.query(
    `
    SELECT news.id, news.title, news.content, categories.name as category_name, news.category_id, news.created_at
    FROM news
    JOIN categories ON news.category_id = categories.id
    WHERE news.id = $1
    `,
    [newsId]
  );

  return result.rows[0];
};

// Função para listar as notícias
const getNews = async (): Promise<NewsWithCategory[]> => {
  // Retorna todas as notícias com o nome da categoria
  const result = await pool.query(`
    SELECT news.id, news.title, news.content, categories.name as category_name, news.category_id, news.created_at
    FROM news
    JOIN categories ON news.category_id = categories.id
  `);

  // Retorna as notícias
  return result.rows;
};

export { createNews, getNews };
