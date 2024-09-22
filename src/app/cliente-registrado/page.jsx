"use client";

import Image from "next/image";
import head from "next/head";
import Facturar from "../page.jsx";
import style from "./styles-clienteregistrado.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";

export default function ClienteRegistrado() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const enrutador = useRouter();

  const enrutadorValor = useSearchParams();
  const nombreDeUsuario = enrutadorValor.get("nombredeusuario");
  const nombreDeUsuarioDecodificado = JSON.parse(
    decodeURIComponent(nombreDeUsuario)
  );
  const nombreDeUsarioPasado = nombreDeUsuario;
  const nombreUsuario = nombreDeUsuarioDecodificado.nombre_de_usuario;

  const [numeroCedula, setNumeroCedula] = useState();
  const [documentacion, setDocumentacion] = useState();
  const [fetchComponents, setFetchComponents] = useState({});
  const [mensajeErrorBase, setMensajeErrorBase] = useState(
    "La Cédula Ingresada No Esta Registrada"
  );
  const [mensajeErrorDocumentacion, setMensajeErrorDocumentacion] = useState(
    "La Cédula Ingresada Ya Esta Registrada Pero, La Nacionalidad Seleccionada Es Incorrecta"
  );
  const [swicth, setSwicth] = useState(false);
  const [swicthDocumentacion, setSwicthDocumentacion] = useState(false);

  const datosCliente = async () => {
    try {
      const respuesta = await axios.get("http://localhost:3000/api/cliente");

      if (respuesta.data) {
        setFetchComponents(respuesta.data.results);
      }
      console.log(respuesta.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    datosCliente();
  }, []);

  const onSubmit = handleSubmit(async (cedulacliente) => {
    const { cedula, documentacion } = cedulacliente;
    setNumeroCedula(Number(cedula));
    setDocumentacion(documentacion);
    if (Object.keys(fetchComponents).length === 0) {
      setSwicth(true);
      setTimeout(() => {
        setSwicth(false);
      }, 1500);
    } else {
      let [documentacionVerificada] = await Promise.all([
        (async () => {
          const resultadoSeguroDocumentacion = await fetchComponents
            .filter(
              (obj) =>
                obj.nacionalidad === documentacion &&
                obj.cedula_de_cliente === Number(cedula)
            )
            .some(
              (obj) =>
                obj.nacionalidad === documentacion &&
                obj.cedula_de_cliente === Number(cedula)
            );
          return resultadoSeguroDocumentacion;
        })(),
      ]);

      let [documentacionVerificadaPorMinimoError] = await Promise.all([
        (async () => {
          const resultadoSeguroDocumentacion = await fetchComponents
            .filter(
              (obj) =>
                obj.nacionalidad !== documentacion &&
                obj.cedula_de_cliente === Number(cedula)
            )
            .some(
              (obj) =>
                obj.nacionalidad !== documentacion &&
                obj.cedula_de_cliente === Number(cedula)
            );
          return resultadoSeguroDocumentacion;
        })(),
      ]);

      if (documentacionVerificada) {
        (async () => {
          const respuesta = await axios.get(
            "http://localhost:3000/api/cliente_usuario"
          );
          if (respuesta.data) {
            setFetchComponents(respuesta.data);
          }
        })();
        enrutador.push(
          `/facturar?cedulacliente=${JSON.stringify(
            cedulacliente
          )}&nombredeusuario=${
            JSON.stringify(nombreUsuario) || nombreDeUsarioPasado
          }`
        );
      } else if (documentacionVerificadaPorMinimoError) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setSwicthDocumentacion(true);
        setTimeout(() => {
          setSwicthDocumentacion(false);
        }, 2500);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setSwicth(true);
        setTimeout(() => {
          setSwicth(false);
        }, 2500);
      }
    }
  });

  const destruirSesion = () => {
    enrutador.push("/");
  };

  const nuevoCliente = (nombreDelUsuario, cedula) => {
    if (numeroCedula) {
      console.log("xd");
      enrutador.push(
        `/registro-de-cliente?nombredeusuario=${
          JSON.stringify(nombreUsuario) || nombreDeUsarioPasado
        }&cedulaclientenuevo=${JSON.stringify(numeroCedula)}`
      );
    } else {
      console.log("xd");
      enrutador.push(
        `/registro-de-cliente?nombredeusuario=${
          JSON.stringify(nombreUsuario) || nombreDeUsarioPasado
        }`
      );
    }
  };

  const [tipoDeCedula, setTipoDeCedula] = useState("V");

  const tipoDeCedulaFuncion = (event) => {
    setTipoDeCedula(event.target.value);
  };

  return (
    <>
      <head>
        <title>Cliente Registrado - Sistema de Facturación</title>
        <link rel="shorcut icon" href="./icon.ico" />
      </head>
      <body className={style.body}>
        <header className={style.cabezera}>
          <section className={style.contenedorTitulo}>
            <h1 className={style.tituloHeader}>Cliente Registrado</h1>
          </section>
          <section className={style.contenedorBotonesEnlace}>
            <button className={style.botonUsuario}>
              Usuario:{" "}
              {nombreUsuario || nombreDeUsarioPasado.replace(/["']/g, "")}
            </button>
            <section>
              <button onClick={nuevoCliente} className={style.botonRegcliente}>
                ¿Nuevo Cliente?
              </button>
            </section>
            <section>
              <button
                className={style.botonRegcliente}
                onClick={destruirSesion}
              >
                Cerrar Sesión
              </button>
            </section>
          </section>
        </header>
        <section className={style.contenedorGeneral} style={{ top: "0.5rem" }}>
          <section className={style.contenedorInicio}>
            <form method="POST" onSubmit={onSubmit}>
              <section className={style.contenedorFormulario}>
                <section className={style.contenedorInputs}>
                  <h1 className={style.titulo}>Ingresar Cliente Registrado</h1>
                  <label className={style.label} htmlFor="Cedula">
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
                      type="number"
                      min="0"
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
                      style={{ marginTop: "0.5rem" }}
                    >
                      {mensajeErrorBase}
                    </p>
                  )}
                  {swicthDocumentacion && (
                    <p
                      className={style.errorInput}
                      style={{ marginTop: "0.5rem", textAlign: "center" }}
                    >
                      {mensajeErrorDocumentacion}
                    </p>
                  )}
                  <section className={style.contenedorBotonFormulario}>
                    <button
                      className={`${style.botonEnviar} ${style.botonFactura}`}
                    >
                      Ingresar
                    </button>
                  </section>
                </section>
              </section>
            </form>
          </section>
        </section>
        <footer className={style.footer}>
          <p className={style.textoFooter}>
            Sistema de Factuación. Versión 2.0 - Engerberth Reyes &copy;
          </p>
        </footer>
      </body>
    </>
  );
}
