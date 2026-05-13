import { useEffect, useState } from "react";
import axios from "axios";

function Gastos() {

  const [gastos, setGastos] = useState([])

  async function carregarGastos() {

    try {
      const response = await axios.get("/api/gastos")
      setGastos(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {

    carregarGastos()

  }, [])

  return (

    <div style={{ padding: 20 }}>
      <h1>Lista de gastos</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Pessoa</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {gastos.map((gasto) => (
            <tr key={gasto.id}>
              <td>{gasto.descricao}</td>
              <td>
                R$ {gasto.valor}
              </td>
              <td>
                {gasto.categoria}
              </td>
              <td>
                {gasto.pessoa}
              </td>
              <td>
                {gasto.data}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Gastos;