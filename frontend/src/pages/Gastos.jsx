import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Gastos() {

  const [gastos, setGastos] = useState([])
  const navigate = useNavigate()

  async function carregarGastos() {

    try {
      const response = await axios.get("/api/gastos")
      setGastos(response.data)
    } catch (err) {
      console.error(err)
    }
  }


  async function deletarGastos(){

    const confirmar = confirm(
      "Deseja apagar esse gasto?"
    )

    if(!confirmar) return

    try {
        await axios.delete(`/api/gastos/${id}`)
        carregarGastos()
    } catch (err) {
      console.error(err)
      alert("Erro ao deletar gasto!")
      
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
            <th>Editar</th>
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
              <td>
                <button onClick={() => navigate(`/editar/${gasto.id}`) }>Editar</button>
                <button onClick={() => deletarGastos(gasto.id)}>Apagar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Gastos;