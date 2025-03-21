import pg from 'pg';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express()
const PORT = 3000
app.use(express.json());
dotenv.config();
app.use(cors());

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;
// PostgreSQL pool configuration
const pool = new Pool({
    user: 'postgres',
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: 'postgres',
    port: 5432,
});

app.get("/", async (req,res) =>{
    try {
        const result = await pool.query('SELECT * FROM emp');
        res.status(200).json(result.rows);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get("/api/search/:name", async (req, res) => {
    try {
        const searchQuery = req.params.name;
        console.log("Received search request for:", searchQuery);

        const result = await pool.query(
            "SELECT id, name, phone, manager_id, role, location, salary FROM emp WHERE LOWER(name) LIKE LOWER($1)",
            [`%${searchQuery}%`]
        );

        console.log("Database result:", result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/api/search/id/:id", async (req, res) => {
    const {id} = req.params;
    console.log(id);

    try {
        const result = await pool.query(
            `SELECT id, name, phone, role, location, salary, manager_id FROM emp WHERE id=${id}`
        );
        res.json(result.rows);

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post("/api/login", async (req, res) => {
    const { emp_id, password } = req.body;

    try {
        const result = await pool.query(
            "SELECT emp_id, role FROM login WHERE emp_id = $1 AND password = $2",
            [emp_id, password]
        );

        if (result.rows.length > 0) {
            const { emp_id, role } = result.rows[0];

            const reportsQuery = await pool.query(
                "SELECT id FROM emp WHERE manager_id = $1",
                [emp_id]
            );
            const manages = reportsQuery.rows.map(row => row.id);

            res.status(200).json({ emp_id, role, manages });
        } else {
            res.status(401).json({ message: "Authentication failed" });
        }
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.use(express.static(path.join(__dirname, '../react/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../react/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(process.env.POSTGRES_DB)
});