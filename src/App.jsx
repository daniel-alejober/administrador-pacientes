import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Inicio from "./pages/Inicio";
import EditarCliente from "./pages/EditarCliente";
import NuevoCliente from "./pages/NuevoCliente";
/*
 *en Layout.jsx vamos a usar el Outlet que va a mostrar todos los componentes que esten
 *anidados a Layout es algo asi como {children} puedes poner
 *header antes de <Outlet /> y footer despues de <Outlet /> en Layout.jsx
 *le ponemos index para que asi aparezca ese componente cuando se visite la url principal
 * en este caso es y "/clientes"
 *-- si le agregamos un path sera una ruta anidada, mostrando el Layout y ese componente */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clientes" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="nuevo" element={<NuevoCliente />} />
          <Route path="editar/:id" element={<EditarCliente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
