"use client";

import head from "next/head";
import styles from "./styles-index.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Usuario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [encontrarUsuario, setEncontrarUsario] = useState({});
  /* const [mensajeErrorBase, setMensajeErrorBase] = useState(
    "El Nombre de Usuario Ingresado Ya Se Encuentra Registrado"
  );
  const [swicth, setSwicth] = useState(false); */

  const enrutador = useRouter();

  const obtenerUsuario = async () => {
    try {
      const respuesta = await axios.get("http://localhost:3000/api/usuario");
      if (respuesta) {
        setEncontrarUsario(respuesta.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerUsuario();
  }, []);

  const enviar = handleSubmit(async (datosDeUsuario) => {
    const { nombre_de_usuario } = datosDeUsuario;

    // Define a normal function to send data
    const enviarDatos = async () => {
      try {
        const respuesta = await axios.post(
          "http://localhost:3000/api/usuario",
          {
            nombre: nombre_de_usuario,
          }
        );

        if (respuesta.data) {
          setEncontrarUsario(respuesta.data.results);
        }
      } catch (error) {
        console.error("Error sending data:", error);
      }
    };

    await enviarDatos();

    enrutador.push(
      `/cliente-registrado?nombredeusuario=${JSON.stringify(datosDeUsuario)}`
    );
  });
  /*
    Con esto se puede verificar a un usuario ya registrado (se necesita registro de usuario)
    
    console.log(nombre_de_usuario)
    let [usuarioVerificado] = await Promise.all([
      (async () => {
        const usuarioVerificado = await encontrarUsuario
          .filter((obj) => obj.nombre_de_usuario !== nombre_de_usuario)
          .some((obj) => obj.nombre_de_usuario !== nombre_de_usuario);
        return usuarioVerificado;
      })(),
    ]);

    console.log(usuarioVerificado)

  if (usuarioVerificado) {
      
      Hacer algo si todo esta bien

     } else {

      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSwicth(true);
      setTimeout(() => {
        setSwicth(false);
      }, 2500);
    } 
    */

  return (
    <>
      <head>
        <title>Inicio de Usuario - Sistema de Facturación</title>
        <link rel="favicon" href="./favicon.ico" type="image/ico" />
      </head>
      <body className={styles.body}>
        <header className={styles.cabezera}>
          <section className={styles.contenedorTitulo}>
            <h1 className={styles.tituloHeader}>Inicio de Usuario</h1>
          </section>
        </header>
        <section className={styles.contenedorGeneral}>
          <section className={styles.contenedorInicio}>
            <form onSubmit={enviar}>
              <section className={styles.contenedorFormulario}>
                <section className={styles.contenedorInputs}>
                  <h1 className={styles.titulo}>Iniciar Usuario</h1>
                  <label className={styles.label} htmlFor="Nombre">
                    Nombre de Usuario
                  </label>
                  <input
                    {...register("nombre_de_usuario", {
                      required: {
                        value: true,
                        message: "El Nombre de Usuario es Requerido",
                      },
                      minLength: {
                        value: 2,
                        message:
                          "El Nombre de Usuario Debe Tener Como Minimo 2 Caracteres",
                      },
                      maxLength: {
                        value: 32,
                        message:
                          "El Nombre de Usuario Debe Ser ó Tener Menos de 32 Caracteres",
                      },
                    })}
                    className={styles.input}
                    id="nombreUsuario"
                    type="text"
                    placeholder="Introduzca Su Nombre de Usuario"
                  />
                  {errors.nombre_de_usuario && (
                    <p className={styles.errorInput}>
                      {errors.nombre_de_usuario.message}
                    </p>
                  )}
                  {/*swicth && (
                    <p
                      className={styles.errorInput}
                      style={{ marginTop: "0.5rem" }}
                    >
                      {mensajeErrorBase}
                    </p>
                  )*/}
                  <section className={styles.contenedorBotonFormulario}>
                    <button className={styles.botonEnviar}>Ingresar</button>
                  </section>
                </section>
              </section>
            </form>
          </section>
        </section>
        <footer className={styles.footer}>
          <p className={styles.textoFooter}>
            Sistema de Factuación. Versión 2.0 - Engerberth Reyes &copy;
          </p>
        </footer>
      </body>
    </>
  );
};

export default Usuario;
