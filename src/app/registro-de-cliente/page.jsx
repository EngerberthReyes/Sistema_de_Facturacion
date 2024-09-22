"use client";

import Image from "next/image";
import head from "next/head";
import { useState, useEffect } from "react";
import style from "./styles-registrodecliente.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { fetch } from "@/services/fetch.js";

export default function RegistroDeCliente() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const enrutadorValor = useSearchParams();
  const nombreDeUsuario = enrutadorValor
    .get("nombredeusuario")
    .replace(/[/"]/g, "");
  const cedulaClienteNuevo = enrutadorValor.get("cedulaclientenuevo");
  const enrutador = useRouter();
  const [fetchComponents, setFetchComponents] = useState({});
  const [mensajeErrorBase, setMensajeErrorBase] = useState(
    "La Cédula Proporcionada Ya Está Registrada. Por favor, Proporcione Otra Cédula Para Continuar"
  );
  const [swicth, setSwicth] = useState(false);

  const [tipoDeCedula, setTipoDeCedula] = useState("V");

  const tipoDeCedulaFuncion = (event) => {
    setTipoDeCedula(event.target.value);
  };

  useEffect(() => {
    (async () => {
      const respuesta = await fetch({
        url: "http://localhost:3000/api/cliente",
      });
      if (respuesta) {
        setFetchComponents(respuesta.results);
      }
    })();
  }, []);

  let documentacionVerificada;

  const onSubmit = handleSubmit(async (datos) => {
    const { cedula, documentacion } = datos;
    if (Object.keys(fetchComponents).length === 0) {
      documentacionVerificada = false;
    } else {
      [documentacionVerificada] = await Promise.all([
        (async () => {
          const resultadoSeguroDocumentacion = await fetchComponents
            .filter((obj) => obj.cedula_de_cliente === Number(cedula))
            .some((obj) => obj.cedula_de_cliente === Number(cedula));
          return resultadoSeguroDocumentacion;
        })(),
      ]);
    }
    if (documentacionVerificada) {
      setSwicth(true);
      setTimeout(() => {
        setSwicth(false);
      }, 2500);
    } else {
      (async () => {
        const response = await fetch({
          url: "http://localhost:3000/api/cliente",
          method: "POST",
          body: { clienteDatos: datos },
        });
        return response;
      })();
      (async () => {
        const respuesta = await fetch({
          url: "http://localhost:3000/api/cliente_usuario",
        });
        if (respuesta) {
          setFetchComponents(respuesta.results);
        }
      })();
      enrutador.push(
        `/facturar?cedulacliente=${JSON.stringify(
          datos
        )}&nombredeusuario=${JSON.stringify(nombreDeUsuario)}`
      );
    }
  });

  const romperSesion = () => {
    enrutador.push("/");
  };

  const clienteRegistrado = () => {
    enrutador.push(
      `/cliente-registrado?nombredeusuario=${JSON.stringify(nombreDeUsuario)}`
    );
  };

  return (
    <>
      <head>
        <title>Registro de Cliente - Sistema de Facturación</title>
        <link rel="favicon" href="./icon.png" type="image/png" />
      </head>
      <body className={style.body}>
        <header className={style.cabezera}>
          <section className={style.contenedorTitulo}>
            <h1 className={style.tituloHeader}>Registro de Cliente</h1>
          </section>
          <section className={style.contenedorBotonesEnlace}>
            <button className={style.botonUsuario}>
              Usuario: {nombreDeUsuario || nombreDeUsuarioPasado}
            </button>
            <section>
              <form method="POST" onSubmit={clienteRegistrado}>
                <button className={style.botonRegcliente}>
                  ¿Cliente Ya Registrado?
                </button>
              </form>
            </section>
            <section>
              <form method="POST" onSubmit={romperSesion}>
                <button className={style.botonRegcliente}>Cerrar Sesión</button>
              </form>
            </section>
          </section>
        </header>
        <section className={style.contenedorGeneral}>
          <section className={style.contenedorInicio}>
            <form method="POST" onSubmit={onSubmit}>
              <section className={style.contenedorFormulario}>
                <section className={style.contenedorInputs}>
                  <h1 className={style.titulo}>Registrar Un Nuevo Cliente</h1>
                  <label className={style.label} for="Nombre">
                    Nombre del Cliente (5 Caracteres Minimo)
                  </label>
                  <input
                    className={style.input}
                    {...register("nombre", {
                      required: {
                        value: true,
                        message: "Debe Introducir un Nombre",
                      },
                      minLength: {
                        value: 5,
                        message:
                          "El Nombre Ingresado Debe Tener Como Minimo 5 Caracteres",
                      },
                    })}
                    type="text"
                    id="Nombre"
                    placeholder="Ingrese el Nombre del Cliente"
                  />
                  {errors.nombre && (
                    <p className={style.errorInput}>{errors.nombre.message}</p>
                  )}
                  <label className={style.label} for="Apellido">
                    Apellido del Cliente (5 Caracteres Minimo)
                  </label>
                  <input
                    className={style.input}
                    {...register("apellido", {
                      required: {
                        value: true,
                        message: "Debe Ingresar un Apellido",
                      },
                      minLength: {
                        value: 5,
                        message:
                          "El Apellido Debe Tener Como Minimo 5 Caracteres",
                      },
                    })}
                    type="text"
                    id="Apellido"
                    placeholder="Ingrese el Apellido del Cliente"
                  />
                  {errors.apellido && (
                    <p className={style.errorInput}>
                      {errors.apellido.message}
                    </p>
                  )}
                  <label className={style.label} for="Cedula">
                    Nro de Cédula del Cliente: (8 Caracteres Min - Max)
                  </label>
                  <section className={style.contenedorCedulaInput}>
                    <select
                      {...register("documentacion", {
                        required: {
                          value: true,
                        },
                      })}
                      className={style.selecion}
                      onChange={tipoDeCedulaFuncion}
                      value={tipoDeCedula}
                    >
                      <option value="V">V</option>
                      <option value="E">E</option>
                    </select>
                    <input
                      className={style.input}
                      {...register("cedula", {
                        required: {
                          value: true,
                          message: "Debe Introducir Una Cedula",
                        },
                        minLength: {
                          value: 8,
                          message:
                            "La Cedula Debe Tener 8 Caracteres Numericos [Caracter Oficial]",
                        },
                        maxLength: {
                          value: 8,
                          message:
                            "La Cedula Debe Tener 8 Caracteres Numericos [Caracter Oficial]",
                        },
                      })}
                      value={
                        cedulaClienteNuevo ? cedulaClienteNuevo : undefined
                      }
                      type="number"
                      id="Cedula"
                      placeholder="Ejem: 30434485"
                    />
                  </section>
                  {errors.cedula && (
                    <p className={style.errorInput}>{errors.cedula.message}</p>
                  )}
                  {swicth && (
                    <p
                      className={style.errorInput}
                      style={{
                        textAlign: "center",
                        marginBottom: "0.5rem",
                        color: "#000000",
                        borderRadius: "1rem",
                        fontWeight: "773",
                        outline: "0.2rem dashed #ed143d",
                        background: "rgb(255, 238, 17)",
                      }}
                    >
                      {mensajeErrorBase}
                    </p>
                  )}

                  <label className={style.label} for="Telefono">
                    Nro de Telefono del Cliente: (11 Caracteres Min - Max)
                  </label>
                  <input
                    className={style.input}
                    {...register("telefono", {
                      required: {
                        value: true,
                        message: "Debe Introducir un Numero de Tenefono",
                      },
                      minLength: {
                        value: 11,
                        message:
                          "El Numero de telefono debe tener 11 Caracteres Numericos",
                      },
                      maxLength: {
                        value: 11,
                        message:
                          "El Numero de telefono debe tener 11 Caracteres Numericos",
                      },
                    })}
                    type="number"
                    id="Telefono"
                    placeholder="Ejem: 04129999999"
                  />
                  {errors.telefono && (
                    <p className={style.errorInput}>
                      {errors.telefono.message}
                    </p>
                  )}
                  <section className={style.contenedorBotonFormulario}>
                    <button type="submit" className={style.btnEnviar}>
                      Registrar
                    </button>
                  </section>
                </section>
              </section>
            </form>
          </section>
        </section>
        <footer className={style.footer}>
          <p className={style.textoFooter}>
            Sistema de Factuación. Versión 1.2 - Kleiver Chacón y Engerberth
            Reyes &copy;
          </p>
        </footer>
      </body>
    </>
  );
};