"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("@config/database"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', async (req, res) => {
    try {
        const client = await database_1.default.connect();
        const result = await client.query('SELECT NOW()');
        client.release();
        res.send(result.rows[0]);
    }
    catch (error) {
        res.status(500).send('Unable to connect to the database: ' + error);
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
