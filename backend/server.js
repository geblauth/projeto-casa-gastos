const express = require("express")
const cors = require("cors")
const sqlite3 = require("sqlite3").verbose()

const app = express()

app.use(cors())
app.use(express.json())

const db = new sqlite3.Database("./data/database.sqlite")

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS gastos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao TEXT,
        valor REAL,
        pessoa TEXT
        )
        `)
})

app.get("/gastos", (req, res) => {
    db.all("SELECT * FROM gastos", [], (err, rows) => {
        if (err) {
            res.status(500).json(err)
            return
        }
        res.json(rows)
    })
})

app.post("/gastos", (req, res) => {
    const { descricao, valor, pessoa } = req.body

    db.run(
        "INSERT INTO gastos (descricao, valor, pessoa) VALUES (?, ?, ?)",
        [descricao, valor, pessoa],
        function (err) {
            if (err) {
                res.status(500).json(err)
                return
            }

            res.json(({ id: this.lastID }))
        }
    )
})

app.listen(3000, "0.0.0.0", () =>{
    console.log("Servidor rodando")
})