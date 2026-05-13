import { useState } from "react"
import axios from "axios"



function Adicionar() {
    const [descricao, setDescricao] = useState("")
    const [valor, setValor] = useState("")
    const [categoria, setCategoria] = useState("")
    const [pessoa, setPessoa] = useState("")
    const [data, setData] = useState("")

    async function adicionarGasto() {
        try {
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

            setDescricao("")
            setValor("")
            setCategoria("")
            setPessoa("")
            setData("")

        } catch (err) {
            console.error(err)
            alert("Erro ao adicionar gasto!")
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
                <input
                    placeholder="Pessoa"
                    value={pessoa}
                    onChange={(e) =>
                        setPessoa(e.target.value)
                    }
                />
            </div>

             <div>
                <input
                    placeholder="Categoria"
                    value={categoria}
                    onChange={(e) =>
                        setCategoria(e.target.value)
                    }
                />
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