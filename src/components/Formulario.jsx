import { useNavigate } from "react-router-dom";
import Alerta from "./Alerta";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Formulario = () => {
  const navigate = useNavigate();
  /*creamos un schema de yup,
  cuando no tome el error que le pongamos en los parentesis, usaremos
  .typeError para definir uno especifico */
  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo")
      .required("El nombre del cliente es obligatorio"),
    empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
    email: Yup.string()
      .email("Email no valido")
      .required("El email es obligatorio"),
    telefono: Yup.number()
      .integer("El número no es valido.")
      .positive("El número no es valido.")
      .typeError("El número no es valido."),
  });
  const handleSubmit = async (valoresFormulario) => {
    //JSON.stringify(valoresFormulario) asi lo pide json-server
    try {
      const url = process.env.REACT_APP_API_URL;
      const respuesta = await fetch(url, {
        method: "POST",
        body: JSON.stringify(valoresFormulario),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (respuesta.status === 201) {
        navigate("/clientes");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        Agregar Cliente
      </h1>
      <Formik
        initialValues={{
          nombre: "",
          empresa: "",
          email: "",
          telefono: "",
          notas: "",
        }}
        // Podemos hacer async la funcion para que espere a que se termine de ejecutar ea funcion
        // para poder limpiar el formulario
        onSubmit={async (valoresFormulario, { resetForm }) => {
          /*values son los valoresFormulario de initialValues pueden llevar cualquier nombre */
          await handleSubmit(valoresFormulario);
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {/* Estamos destricturando errores ya que formik tiene mucha informacion,
        touched sirve para cuendo el usuario entro y salio del input se mostrara la alerta */}
        {({ errors, touched }) => (
          <Form className="mt-10">
            <div className="mb-4">
              <label className="text-gray-800" htmlFor="nombre">
                Nombre:
              </label>
              <Field
                className="mt-2 block w-full p-3 bg-gray-200"
                id="nombre"
                type="text"
                placeholder="Nombre del Cliente"
                name="nombre"
              />
              {errors.nombre && touched.nombre ? (
                <Alerta>{errors.nombre}</Alerta>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="text-gray-800" htmlFor="empresa">
                Empresa:
              </label>
              <Field
                className="mt-2 block w-full p-3 bg-gray-200"
                id="empresa"
                type="text"
                placeholder="Empresa del Cliente"
                name="empresa"
              />
              {errors.empresa && touched.empresa ? (
                <Alerta>{errors.empresa}</Alerta>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="text-gray-800" htmlFor="email">
                Email:
              </label>
              <Field
                className="mt-2 block w-full p-3 bg-gray-200"
                id="email"
                type="email"
                placeholder="Email del Cliente"
                name="email"
              />
              {errors.email && touched.email ? (
                <Alerta>{errors.email}</Alerta>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="text-gray-800" htmlFor="telefono">
                Teléfono:
              </label>
              <Field
                className="mt-2 block w-full p-3 bg-gray-200"
                id="telefono"
                type="tel"
                placeholder="Teléfono del Cliente"
                name="telefono"
              />
              {errors.telefono && touched.telefono ? (
                <Alerta>{errors.telefono}</Alerta>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="text-gray-800" htmlFor="notas">
                Notas:
              </label>
              <Field
                as="textarea"
                className="mt-2 block w-full p-3 bg-gray-200 resize-none h-40"
                id="notas"
                type="email"
                placeholder="Notas del Cliente"
                name="notas"
              />
            </div>
            <input
              type="submit"
              value="Agregar Cliente"
              className="cursor-pointer mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Formulario;
