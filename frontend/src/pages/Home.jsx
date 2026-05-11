import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h1>Casa Financeiro</h1>

      <button onClick={() => navigate("/gastos")}>
        Ver gastos
      </button>

      <button onClick={() => navigate("/adicionar")}>
        Adicionar gasto
      </button>
    </div>
  );
}

export default Home;