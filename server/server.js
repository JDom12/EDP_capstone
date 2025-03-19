import pg from 'pg';
import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";

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

app.get("/api/search/:name", async (req, res) => {
    try {
        const searchQuery = req.params.name;
        console.log("Received search request for:", searchQuery);

        const result = await pool.query(
            "SELECT id, name, phone, manager_id, role, location, salary FROM emp WHERE LOWER(name) LIKE LOWER($1) LIMIT 10",
            [`%${searchQuery}%`]
        );

        console.log("Database result:", result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(process.env.POSTGRES_DB)
});