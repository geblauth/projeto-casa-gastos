const express = require("express")
const cors = require("cors")
const Database = require("better-sqlite3")
const app = express()

app.use(cors())
app.use(express.json())

const db = new Database("./data/database.sqlite")

db.exec(`
        CREATE TABLE IF NOT EXISTS gastos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao TEXT,
        valor REAL,
        categoria TEXT,
        pessoa TEXT,
        data DATE)
`)

app.get("/gastos", (req, res) => {
    const rows = db.prepare("SELECT * FROM gastos").all()
    res.json(rows)
})

app.post("/gastos", (req, res) => {
    const { descricao, valor, categoria, pessoa, data } = req.body

    const stmt = db.prepare(`
        INSERT INTO gastos (
            descricao,
            valor,
            categoria,
            pessoa,
            data
        )
        VALUES (?, ?, ?, ?, ?)
    `)

    const result = stmt.run(descricao, valor, categoria, pessoa, data)

    res.json({ id: result.lastInsertRowid })
})

app.listen(3000, "0.0.0.0", () => {
    console.log("Servidor rodando")
})