import pool from '../config/database';
import { Category } from './interface/ICategory';

// Função para criar uma categoria
const createCategory = async (category: Category): Promise<Category> => {
  const { name } = category;
  const result = await pool.query(
    'INSERT INTO categories (name) VALUES ($1) RETURNING *',
    [name]
  );
  return result.rows[0];
};

// Função para listar as categorias
const getCategories = async (): Promise<Category[]> => {
  const result = await pool.query('SELECT * FROM categories');
  return result.rows;
};

export { createCategory, getCategories };
