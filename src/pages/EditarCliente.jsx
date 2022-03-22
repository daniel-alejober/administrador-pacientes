import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Formulario from "../components/Formulario";

const EditarCliente = () => {
  const { id } = useParams();
  const [cargando, setCargando] = useState(true);
  const [cliente, setCliente] = useState({});
  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const respuesta = await fetch(url);
        const datosCliente = await respuesta.json();
        setCliente(datosCliente);
      } catch (error) {
        console.log(error);
      }
      setCargando(!cargando);
    };
    obtenerClienteAPI();
  }, [id]);
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        Utiliza este formulario para editar los datos de un cliente
      </p>
      {cliente.nombre ? (
        <Formulario cliente={cliente} cargando={cargando} />
      ) : (
        <p className="font-black text-4xl text-red-900 mt-10 text-center">
          No hay resultados para ese ID
        </p>
      )}
    </>
  );
};

export default EditarCliente;
