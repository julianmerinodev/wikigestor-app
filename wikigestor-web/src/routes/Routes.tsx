import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import PrivateRoute from "../components/PrivateRoute";
import Articulos from "../pages/Articulos/Articulos";
import Categorias from "../pages/Categorias/Categorias";
// import Usuarios from "../pages/Usuarios/Usuarios";

function App() {
  return (
     <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
            <Route index element={<Home />} />
            <Route path="articulos" element={<Articulos />} />
            <Route path="categorias" element={<Categorias />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
  );
}

export default App;
