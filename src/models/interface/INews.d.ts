// Tipos de dados para a interface News
export interface News {
  id?: number;
  title: string;
  content: string;
  category_id: number;
  created_at?: Date;
}