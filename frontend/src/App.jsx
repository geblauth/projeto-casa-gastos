import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [gastos, setGastos] = useState([])
  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState("")
  const [pessoa, setPessoa] = useState("")

  async function carregar() {
    const res = await axios.get("http://localhost:3000/gastos")
    setGastos.get(res.data)
  }

  async function adicionar() {
    await axios.post("http://localhost:3000/gastos",
      {
        descricao,
        valor,
        pessoa
      }
    )
    carregar()
  }

  useEffect(() => {
    carregar()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Gastos</h1>

      <input
        placeholder="Descrição"
        onChange={(e) => setDescricao(e.target.value)}
      />
      <input
        placeholder="Valor"
        onChange={(e) => setValor(e.target.value)}
      />

      <input
        placeholder="Pessoa"
        onChange={(e) => setPessoa(e.target.value)}
      />

      <button onClick={adicionar}>Adicionar</button>

      {gastos.map((g) => (
        <div key={g.id}>
          {g.descricao} - R$ {g.valor} {g.pessoa}
        </div>
      ))}
    </div>
  )
}

export default App