"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNews = exports.createNews = void 0;
const database_1 = __importDefault(require("@config/database"));
const createNews = async (news) => {
    const { title, content, category_id } = news;
    const result = await database_1.default.query('INSERT INTO news (title, content, category_id) VALUES ($1, $2, $3) RETURNING *', [title, content, category_id]);
    return result.rows[0];
};
exports.createNews = createNews;
const getNews = async () => {
    const result = await database_1.default.query('SELECT * FROM news');
    return result.rows;
};
exports.getNews = getNews;
