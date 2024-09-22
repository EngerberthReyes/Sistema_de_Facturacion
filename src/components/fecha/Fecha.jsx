import style from "./fecha.module.css";
import stylesFacturar from "../../app/facturar/styles-facturar.module.css";
import { useState, useEffect } from "react";

const Reloj = () => {
  const [hora, setHora] = useState("");
  const [formato12h, setFormato12h] = useState(true);
  const [formatoActual, setFormatoActual] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const fechaActual = new Date();
      const dia = fechaActual.getDate();
      const mes = fechaActual.getMonth() + 1;
      const anio = fechaActual.getFullYear();
      const diaEnLetras = obtenerDiaEnLetras(fechaActual.getDay());
      let hora = fechaActual.getHours();
      const minutos = fechaActual.getMinutes();
      const segundos = fechaActual.getSeconds();
      let amPm = "";

      if (!formato12h) {
        hora = hora % 12 || 12;
        amPm = fechaActual.getHours() < 12 ? "AM" : "PM";
      }

      const horaFormateada = `${obtenerNumeroConCeros(
        dia
      )}-${obtenerNumeroConCeros(
        mes
      )}-${anio} ${diaEnLetras} ${obtenerNumeroConCeros(
        hora
      )}:${obtenerNumeroConCeros(minutos)}:${obtenerNumeroConCeros(
        segundos
      )} ${amPm}`;
      setHora(horaFormateada);
    }, 1000);

    return () => clearInterval(interval);
  }, [formato12h]);

  useEffect(() => {
    if (hora.includes("AM") || hora.includes("PM")) {
      setFormatoActual("Formato 24 Horas");
    } else {
      setFormatoActual("Formato 12 Horas");
    }
  }, [hora]);

  const obtenerNumeroConCeros = (numero) => {
    return numero.toString().padStart(2, "0");
  };

  const obtenerDiaEnLetras = (dia) => {
    const diasEnLetras = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    return diasEnLetras[dia];
  };

  const cambioDeFormato = () => {
    setFormato12h(!formato12h);
  };

  return (
    <>
      <h2 className={style.tituloPosterior}>
        <span className={style.fechaParrafo}>Fecha:</span> {hora}
      </h2>
      <button
        className={stylesFacturar.botonFactura}
        style={{ width: "19rem", padding: "1rem 3rem" }}
        onClick={cambioDeFormato}
      >
        Cambiar a {formatoActual}
      </button>
    </>
  );
};

export default Reloj;