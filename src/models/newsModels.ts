import pool from '@config/database';
import { News } from './interface/INews';

const createNews = async (news: News): Promise<News> => {
  const { title, content, category_id } = news;
  const result = await pool.query(
    'INSERT INTO news (title, content, category_id) VALUES ($1, $2, $3) RETURNING *',
    [title, content, category_id]
  );
  return result.rows[0];
};

const getNews = async (): Promise<News[]> => {
  const result = await pool.query('SELECT * FROM news');
  return result.rows;
};

export { createNews, getNews };
