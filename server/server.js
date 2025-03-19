import pg from 'pg';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express()
const PORT = 3000
dotenv.config();
app.use(cors());

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

// search by name
app.get("/api/search", async (req, res) => {
    const query = req.query.q;

    try {
        const result = await pool.query(
            "SELECT id, name, phone, role, location, salary, manager_id FROM emp WHERE LOWER(name) LIKE LOWER($1) LIMIT 10",
            [`%${query}%`]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(process.env.POSTGRES_DB)
});