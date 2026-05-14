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

db.exec(`CREATE TABLE IF NOT EXISTS categorias(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT)`)



app.get("/categorias", (req, res) =>{
    const categorias = db.prepare("SELECT * FROM categorias").all()
    res.json(categorias)
})        

app.get("/gastos", (req, res) => {
    const rows = db.prepare("SELECT * FROM gastos").all()
    res.json(rows)
})

app.get("/gastos/:id", (req, res) => {
    const { id } = req.params

    const gasto = db.prepare("SELECT * FROM gastos WHERE id = ?").get(id)

    res.json(gasto)
})

app.delete("/gastos/:id", (req, res) =>{
    const {id} = req.params
    const stmt = db.prepare("DELETE FROM gastos WHERE id = ? ")
    stmt.run(id)

    res.json({success: true})
})

app.put("/gastos/:id", (req, res) => {
    const { id } = req.params

    const { descricao, valor, categoria, pessoa, data } = req.body

    const stmt = db.prepare(`
        UPDATE gastos
        SET descricao = ?,
         valor = ?,
         categoria = ?,
         pessoa = ?,
         data = ?
        WHERE id = ?`
    )

    stmt.run(descricao, valor, categoria, pessoa, data, id)

    res.json(
        { success: true }
    )

})

app.post("/categorias", (req, res) => {
    const {nome} = req.body

    const stmt = db.prepare(`INSET INTO categorias(nome) VALUES (?)`)

    const result = stmt.run(nome)

    res.json({id: result.lastInsertRowid})
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