import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";

const VerCliente = () => {
  const { id } = useParams();
  const [cargando, setCargando] = useState(true);
  const [cliente, setCliente] = useState({});
  const { nombre, empresa, email, telefono, notas } = cliente;
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

  return cargando ? (
    <Spinner />
  ) : Object.keys(cliente).length === 0 ? (
    <p className="font-black text-4xl text-red-900">No hay resultados</p>
  ) : (
    <div>
      {cargando ? (
        <Spinner />
      ) : (
        <>
          <h1 className="font-black text-4xl text-blue-900">Ver Cliente</h1>
          <p className="mt-3 text-2xl">Informacion del cliente</p>
          <p className="text-4xl text-gray-600 mt-10">
            <span className="text-gray-800 uppercase font-bold">Cliente: </span>
            {nombre}
          </p>
          <p className="text-2xl text-gray-600 mt-4">
            <span className="text-gray-800 uppercase font-bold">Email: </span>
            {email}
          </p>
          {telefono && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className="text-gray-800 uppercase font-bold">
                Teléfono:{" "}
              </span>
              {telefono}
            </p>
          )}
          <p className="text-2xl text-gray-600 mt-4">
            <span className="text-gray-800 uppercase font-bold">Empresa: </span>
            {empresa}
          </p>
          {notas && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className="text-gray-800 uppercase font-bold">Notas: </span>
              {notas}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default VerCliente;
