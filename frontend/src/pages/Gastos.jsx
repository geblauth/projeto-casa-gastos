import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Gastos() {

  const [gastos, setGastos] = useState([])
  const navigate = useNavigate()
  const [filtroPessoa, setFiltroPessoa] = useState("")
  const [filtroCategoria, setFiltroCategoria] = useState("")
  const [filtroMes, setFiltroMes] = useState("")
  const [categorias, setCategorias] = useState([])

  async function carregarGastos() {

    try {
      const response = await axios.get("/api/gastos")
      setGastos(response.data)
    } catch (err) {
      console.error(err)
    }
  }


  async function deletarGastos(id) {

    const confirmar = confirm(
      "Deseja apagar esse gasto?"
    )

    if (!confirmar) return

    try {
      await axios.delete(`/api/gastos/${id}`)
      carregarGastos()
    } catch (err) {
      console.error(err)
      alert("Erro ao deletar gasto!")

    }
  }

  async function carregarCategorias() {
    try {
      const response = await axios.get("/api/categorias")
      setCategorias(response.data)
    } catch (error) {
      console.error(error)

    }
  }

  useEffect(() => {

    carregarGastos()
    carregarCategorias()

  }, [])


  const gastosFiltrados = gastos.filter(
    (gasto) => {
      const pessoaOk = filtroPessoa === "" || gasto.pessoa === filtroPessoa

      const categoriaOk = filtroCategoria === "" || gasto.categoria === filtroCategoria

      const mesOk = filtroMes === "" || gasto.data.startsWith(filtroMes)

      return (pessoaOk && categoriaOk && mesOk)
    }
  )

  const totalGermano = gastosFiltrados.filter(
    (gasto) => gasto.pessoa === "Germano"
  )
    .reduce((total, gasto) => total + Number(gasto.valor), 0)


  const totalVittoria = gastosFiltrados.filter(
    (gasto) => gasto.pessoa === "Vittoria"
  )
    .reduce((total, gasto) => total + Number(gasto.valor), 0)


  const totalGeral = gastosFiltrados.reduce((total, gasto) => total + Number(gasto.valor), 0)

  return (

    <div
      style={{
        display: "flex",
        gap: 10,
        marginBottom: 20

      }}
    >      <select
      value={filtroPessoa}
      onChange={(e) => setFiltroPessoa(e.target.value)}
    >

        <option value="">Todas pessoas</option>
        <option value="Germano">Germano</option>
        <option value="Vittoria">Vittoria</option>
      </select>

      <select value={filtroCategoria}
        onChange={(e) => setFiltroCategoria(e.target.value)}>
        <option value="">Todas Categorias</option>
        {categorias.map((cat) => (
          <option key={cat.id}
            value={cat.nome}>{cat.nome}</option>
        ))}
      </select>

      <input type="month"
        value={filtroMes}
        onChange={(e) => setFiltroMes(e.target.value)

        }
      />

      <h2>Total Geral: R$ {totalGeral.toFixed(2)}</h2>
      <h3>Germano: RS{totalGeral.toFixed(2)}</h3>
      <h4>Vittoria: R${totalGeral.toFixed(2)}</h4>
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
          {gastosFiltrados.map((gasto) => (
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
                <button onClick={() => navigate(`/editar/${gasto.id}`)}>Editar</button>
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