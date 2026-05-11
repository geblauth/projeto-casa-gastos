import { BrowserRouter, Routes, Route} from "react-router-dom"

import Home from "./pages/Home"
import Gastos from "./pages/Gastos"
import Adicionar from "./pages/Adicionar"

function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/gastos" element={<Gastos />}/>
      <Route path="/adicionar" element={<Adicionar />}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App