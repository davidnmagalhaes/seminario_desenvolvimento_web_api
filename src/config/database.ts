import { Pool } from 'pg';
import 'dotenv/config'

// Cria uma nova instância do Pool com as configurações do banco de dados
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

export default pool;