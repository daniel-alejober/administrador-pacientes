import { useNavigate } from "react-router-dom";

const Cliente = ({ cliente }) => {
  const navigate = useNavigate();
  const { nombre, empresa, email, telefono, id } = cliente;
  return (
    <tr className="border-b-2 border-black hover:bg-gray-400">
      <td className="p-3 text-center">{nombre}</td>
      <td>
        <p>
          <span className="text-gray-800 uppercase font-bold mr-3">Email:</span>
          {email}
        </p>
        {telefono && (
          <p>
            <span className="text-gray-800 uppercase font-bold mr-3">Tel:</span>
            {telefono}
          </p>
        )}
      </td>
      <td className="text-center">{empresa}</td>
      <td>
        <button
          className="bg-yellow-600 hover:bg-yellow-700 block w-full text-white p-2 uppercase font-bold text-xs mt-1"
          type="button"
          onClick={() => {
            navigate(`/clientes/${id}`);
          }}
        >
          Ver
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs mt-1"
          type="button"
        >
          Editar
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-1 mb-1"
          type="button"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Cliente;
