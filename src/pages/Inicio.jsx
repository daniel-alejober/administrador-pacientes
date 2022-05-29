import {useEffect, useState} from "react";
import Cliente from "../components/Cliente";

const Inicio = () => {
  const [clientes, setClientes] = useState([]);
  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        // const url = import.meta.env.VITE_API_URL;
        const respuesta = await fetch('../../public/db.json', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        })
        const datosCliente = await respuesta.json();
        setClientes(datosCliente.clientes);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerClientesAPI();
  }, []);

  const eliminarClientes = async (id) => {
    const confirmar = confirm("¿Deseas eliminar este cliente?");
    if (confirmar) {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const nuevosClientes = clientes.filter((cliente) => cliente.id !== id);
        setClientes(nuevosClientes);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-black text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>
      <table className="w-full mt-5 bg-white shadow table-auto">
        <thead className="text-white bg-blue-800">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <Cliente
              key={cliente.id}
              cliente={cliente}
              eliminarClientes={eliminarClientes}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inicio;
