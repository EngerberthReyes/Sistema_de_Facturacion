"use client";

import styles from "./styles-factura.module.css";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetch } from "@/services/fetch.js";

const Factura = () => {
  const enrutadorLink = useRouter();
  const enrutador = useSearchParams();
  const cantidadTotal = enrutador.get("cantidadTotal");
  const totalConIva = enrutador.get("totalConIva");
  const totalSinIva = enrutador.get("totalSinIva");
  const metodoDePago = enrutador.get("metodoPago");
  const cedulaDeCliente = enrutador.get("cedulaDeCliente");
  const nombreDeCliente = enrutador.get("nombreCliente");
  const apellidoDeCliente = enrutador.get("apellidoCliente");
  const nombreDeUsuario = enrutador.get("nombreDeUsuario");
  const tipoDocumentacion = enrutador.get("tipoDocumentacion");
  const elementosUrl = enrutador.getAll("elementos");
  const elementos = elementosUrl
    ? JSON.parse(decodeURIComponent(elementosUrl))
    : [];
  useEffect(() => {
    (async () => {
      const respFactura = await fetch({
        url: "http://localhost:3000/api/factura",
        method: "POST",
        body: {
          datos: elementos,
          nombreCliente: nombreDeCliente,
          nombreUsuario: nombreDeUsuario,
          cedulaCliente: cedulaDeCliente.replace(/\./g, ""),
          metodoDePago: metodoDePago,
          totalConIva: totalConIva,
        },
      });
    })();
  }, []);

  const finalizar = () => {
    enrutadorLink.push(
      `/cliente-registrado?nombredeusuario=${
        JSON.stringify(nombreDeUsuario) || nombreDeUsarioPasado
      }`
    );
  };

  return (
    <>
      <head>
        <title>Factura</title>
        <link rel="shortcut icon" href="./icon2.png" />
      </head>
      <body className={styles.body}>
        <section className={styles.contenedorPrincipal}>
          <h1 className={`${styles.tituloH1} ${styles.h1}`}>Factura.</h1>
          <section className={styles.titulosContenedor}>
            <h1 className={`${styles.titulo} ${styles.h1}`}>
              Cliente: {`${nombreDeCliente} ${apellidoDeCliente}`}
            </h1>
            <h1 className={`${styles.titulo} ${styles.h1}`}>
              Cédula: {`${tipoDocumentacion} - ${cedulaDeCliente}`}
            </h1>
            <h1 className={`${styles.titulo} ${styles.h1}`}>
              Establecimiento: Porfiados &reg;
            </h1>
          </section>
          <article className={styles.tablaContenedor}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tr}>
                  <th className={styles.th}>Codigo de Producto</th>
                  <th className={styles.th}>Nombre del Producto</th>
                  <th className={styles.cantidad}>Cantidad de Productos</th>
                  <th className={styles.th}>Precio</th>
                </tr>
              </thead>
              <tbody>
                {elementos.map((elemento, index) => (
                  <tr key={index}>
                    <td className={styles.td}>{elemento.codigo}</td>
                    <td className={styles.td}>{elemento.nombre}</td>
                    <td className={`${styles.td} ${styles.cantidad}`}>
                      <p className={styles.textoCantidad}>
                        {elemento.cantidad}
                      </p>
                    </td>
                    <td className={styles.td}>{`${elemento.precio} US$`}</td>
                  </tr>
                ))}
                <tr>
                  <td className={styles.td}>Cantidad Total</td>
                  <td
                    className={styles.celdasSinBordes}
                    style={{ borderBottom: "2px solid #eeeeee" }}
                  ></td>
                  <td
                    className={styles.celdasSinBordes}
                    style={{ borderBottom: "2px solid #eeeeee" }}
                  >
                    {cantidadTotal}
                  </td>
                  <td
                    className={styles.celdasSinBordesTotal}
                    style={{ borderBottom: "2px solid #eeeeee" }}
                  ></td>
                  <td
                    style={{
                      borderTop: "none",
                      borderBottom: "2px solid #eeeeee",
                    }}
                  ></td>
                </tr>
                <tr>
                  <td className={styles.td} style={{ wordBreak: "breakWord" }}>
                    Impuestos [IVA]
                  </td>
                  <td className={styles.celdasSinBordes}></td>
                  <td className={styles.celdasSinBordes}></td>
                  <td className={styles.celdasSinBordesTotal}>+ 16%</td>
                  <td style={{ borderTop: "none" }}></td>
                </tr>
                <tr>
                  <td className={styles.td} style={{ padding: "14px 0" }}>
                    Total a Pagar
                  </td>
                  <td
                    className={styles.celdasSinBordes}
                    style={{ borderTop: "2px solid #eeeeee" }}
                  >{`Precio Neto: ${totalSinIva} US$`}</td>
                  <td
                    className={styles.celdasSinBordes}
                    style={{ borderTop: "2px solid #eeeeee" }}
                  ></td>
                  <td
                    className={styles.celdasSinBordesTotal}
                    style={{ borderTop: "2px solid #eeeeee" }}
                  >
                    Total:{" "}
                    <span
                      style={{ color: "#00ff00", fontSize: "15px" }}
                    >{`${totalConIva} US$`}</span>
                  </td>
                  <td style={{ borderTop: "2px solid #eeeeee" }}></td>
                </tr>
              </tbody>
            </table>
          </article>
          <section className={styles.contenedorFlex}>
            <h1 className={`${styles.tituloFactura} ${styles.h1}`}>
              Facturado Por: {nombreDeUsuario}
            </h1>
            <button className={styles.botonFactura} onClick={() => print()}>
              Imprimir Factura
            </button>
            <button className={styles.botonFactura} onClick={finalizar}>
              Finalizar Facturación
            </button>
          </section>
        </section>
      </body>
    </>
  );
};

export default Factura;