import React from "react";
import Image from "next/image";
import stylesModal from "../../app/facturar/styles-facturar.module.css";

const VentanaModalEliminar = ({
  estadoModalEliminar,
  setEstadoModalEliminar,
  setMostrarModalEliminar,
  onSubmit,
}) => {
  const manejadorInformacionEliminar = (valor) => {
    onSubmit(valor);
    setEstadoModalEliminar(false);
  };

  return estadoModalEliminar ? (
    <form onSubmit={(e) => e.preventDefault()}>
      <section
        className={`${stylesModal.contenedorModal} ${
          estadoModalEliminar ? stylesModal.open : stylesModal.close
        }`}
      >
        <section
          className={`${stylesModal.contenedorInternoModal} ${
            estadoModalEliminar ? stylesModal.open : stylesModal.close
          }`}
          style={{
            boxShadow:
              "#eeeeee36 0.5rem 0.5rem 1rem, #eeeeee36 -0.5em -0.5rem 1rem",
            width: "90vw",
            overflowY: "hidden",
            overflowX: "hidden",
          }}
        >
          <section className={stylesModal.modalCabezera}>
            <h1 className={stylesModal.tituloModal}>
              ¿Está Seguro de Que Desea Eliminar Este Producto?
            </h1>
          </section>
          <button
            type="button"
            className={stylesModal.botonCierre}
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              border: "2px solid #eeeeee",
              background: "#ff0000",
            }}
            onClick={() => {
              setMostrarModalEliminar(false);
              setTimeout(() => {
                setEstadoModalEliminar(false);
              }, 500);
            }}
          >
            <Image
              width={20}
              height={20}
              alt="x-square.svg"
              src="/IMG/SVG/x-square.svg"
            />
          </button>
          <section
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <button
              onClick={() => manejadorInformacionEliminar("Si")}
              className={stylesModal.botonFactura}
              style={{
                width: "10rem",
                background: "#06b606",
                marginBottom: "0",
                marginTop: "0",
                color: "#eeeeee",
                boxShadow: "0px 0px 0.7rem 0 #eeeeee86",
              }}
            >
              Sí
            </button>
            <button
              onClick={() => manejadorInformacionEliminar("No")}
              className={stylesModal.botonFactura}
              style={{
                width: "10rem",
                background: "#d31d10",
                marginBottom: "0",
                marginTop: "0",
                color: "#eeeeee",
                boxShadow: "0px 0px 0.7rem 0 #eeeeee86",
              }}
            >
              No
            </button>
          </section>
          <section
            style={{ marginTop: "1rem", borderTop: "1px solid #eeeeee" }}
          >
            <h4
              style={{
                color: "#eeeeeeab",
                fontSize: "1.2rem",
                marginTop: ".5rem",
                fontStyle: "italic",
                textAlign: "justify",
              }}
            >
              Nota: Cada Vez Deseé Que Eliminar un Producto el Código de Este
              Desaparecerá Para Siempre y Al Crear Otro Se Autogenerara Otro
              Nuevo.
            </h4>
            <h4
              style={{
                color: "#eeeeeeab",
                fontSize: "1.2rem",
                marginTop: ".5rem",
                fontStyle: "italic",
                textAlign: "justify",
              }}
            >
              Se Le Agradece Eliminar Productos Desde Arriba Para Abajo, Ya Que
              Estos Estan En Un Orden Inverso.
            </h4>
          </section>
        </section>
      </section>
    </form>
  ) : null;
};

export default VentanaModalEliminar;