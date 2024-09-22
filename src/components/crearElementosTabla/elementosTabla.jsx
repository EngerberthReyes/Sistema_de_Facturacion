import styles from "../../app/facturar/styles-facturar.module.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ElementosTabla = ({
  svg,
  elementos,
  incrementarCantidad,
  decrementarCantidad,
  quitarProducto,
  cantidad,
  setCantidad,
  setPrecioConIva,
  setPrecioSinIva,
}) => {
  const [totalConIva, setTotalConIva] = useState(0);

  const [totalSinIva, setTotalSinIva] = useState(0);

  useEffect(() => {
    const calcularPrecioTotal = () => {
      const total = elementos.reduce((acumuladoPrecio, elemento) => {
        return acumuladoPrecio + elemento.precio;
      }, 0);

      const totalConIva = (total * 1.16).toFixed(
        2
      ); /* Aqui le sumanos el 16% del IVA y hacemos que los decimales se coloquen en solo dos */

      setTotalSinIva(total);

      setTotalConIva(totalConIva);

      setPrecioConIva(totalConIva);
      setPrecioSinIva(totalSinIva.toFixed(2));
    };
    setCantidad(cantidad);

    calcularPrecioTotal();
  }, [
    cantidad,
    setCantidad,
    setPrecioConIva,
    setPrecioSinIva,
    elementos,
    totalSinIva,
  ]);

  cantidad = elementos.reduce((acumuladoCantidad, elemento) => {
    return acumuladoCantidad + Number(elemento.cantidad);
  }, 0);

  cantidad = cantidad < 10 ? `0${cantidad}` : cantidad;

  return (
    <>
      {elementos.map((elemento, index) => (
        <tr key={index}>
          <td className={styles.td}>{elemento.codigo}</td>
          <td className={styles.td}>{elemento.nombre}</td>
          <td className={`${styles.td} ${styles.cantidad}`}>
            <button
              type="button"
              className={styles.decremento}
              onClick={() => decrementarCantidad(index)}
            >
              -
            </button>
            <p className={styles.textoCantidad}>{elemento.cantidad}</p>
            <button
              type="button"
              className={styles.incremento}
              onClick={() => incrementarCantidad(index)}
            >
              +
            </button>
          </td>
          <td className={styles.td}>{`${elemento.precio} US$`}</td>
          <td
            className={styles.celdaEspecial}
            onClick={() => quitarProducto(index)}
          >
            <Image
              alt="x-square.svg"
              className={styles.imgQuitar}
              width={20}
              height={34}
              src={svg}
            />
          </td>
        </tr>
      ))}

      {elementos.length > 0 && (
        <>
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
              {cantidad}
            </td>
            <td
              className={styles.celdasSinBordesTotal}
              style={{ borderBottom: "2px solid #eeeeee" }}
            ></td>
            <td
              style={{ borderTop: "none", borderBottom: "2px solid #eeeeee" }}
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
            >{`Precio Neto: ${totalSinIva.toFixed(2)} US$`}</td>
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
        </>
      )}
    </>
  );
};

export default ElementosTabla;