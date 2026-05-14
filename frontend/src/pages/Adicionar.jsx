import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"



function Adicionar() {
    const [descricao, setDescricao] = useState("")
    const [valor, setValor] = useState("")
    const [categoria, setCategoria] = useState("")
    const [categorias, setCategorias] = useState([])
    const [novaCategoria, setNovaCategoria] = useState("")
    const [pessoa, setPessoa] = useState("")
    const [data, setData] = useState("")
    const navigate = useNavigate()
    const { id } = useParams()



    useEffect(() => {
        carregarCategorias()

        if (id) {
            carregarGasto()
        }

    }, [])


    async function carregarCategorias() {

        try {
            const response = await axios.get("api/categorias")

            setCategorias(response.data)

        } catch (error) {
            console.error(error)

        }
    }

    async function carregarGasto() {

        try {
            const response = await axios.get(`/api/gastos/${id}`)

            const gasto = response.data

            setDescricao(gasto.descricao)
            setValor(gasto.valor)
            setCategoria(gasto.categoria)
            setPessoa(gasto.pessoa)
            setData(gasto.data)

        } catch (error) {
            console.error(error)

        }
    }



    async function adicionarGasto() {
        try {

            if (id) {
                await axios.put(`/api/gastos/${id}`,
                    {
                        descricao,
                        valor,
                        categoria,
                        pessoa,
                        data
                    }
                )
                alert("Gasto atualizado!")
            }
            else {

                await axios.post("/api/gastos",
                    {
                        descricao,
                        valor,
                        categoria,
                        pessoa,
                        data
                    }
                )
                alert("Gasto adicionado!")


            }
            navigate("/gastos")
        } catch (err) {
            console.error(err)
            alert("Erro ao adicionar gasto!")
        }
    }

    async function criarCategorias() {

        try {
            await axios.post(
                "/api/categorias", {
                    nome: novaCategoria
                }
            )

            setNovaCategoria("")
            carregarCategorias()
        } catch (error) {
            console.error(error)
            
        }
        
    }



    return (
        <div style={{ padding: 20 }}>
            <h1>Adicionar gasto</h1>
            <div>
                <input
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) =>
                        setDescricao(e.target.value)
                    }
                />
            </div>

            <div>
                <input
                    placeholder="Valor"
                    type="number"
                    value={valor}
                    onChange={(e) =>
                        setValor(e.target.value)
                    }
                />
            </div>

            <div>
                <select
                    value={pessoa}
                    onChange={(e) =>
                        setPessoa(e.target.value)
                    }
                >
                    <option value="">Selecione</option>
                    <option value="Germano">Germano</option>
                    <option value="Vittoria">Vittoria</option>
                </select>
            </div>

            <div>
                <select value={categoria} 
                onChange={(e) => setCategoria(e.target.value)}>

                <option value="">Selecione Categoria</option>
                {categorias.map((cat) =>(
                    <option 
                    key={cat.id}
                    value ={cat.nome}>{cat.nome}</option>
                ))}
                </select>
            </div>

            <div>
                <input placeholder="Nova categoria"
                value={novaCategoria}
                onChange={(e) => setNovaCategoria(e.target.value)} />
                <button onClick={criarCategorias}>Adicionar categoria</button>
            </div>

            <div>
                <input
                    type="date"
                    value={data}
                    onChange={(e) =>
                        setData(e.target.value)
                    }
                />
            </div>

            <button onClick={adicionarGasto}>Salvar</button>

        </div>
    );
}

export default Adicionar;