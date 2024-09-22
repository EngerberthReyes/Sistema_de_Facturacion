"use client";

import styles from "../../app/facturar/styles-facturar.module.css";
import Image from "next/image";

const CrearProducto = ({
  agregarElemento,
  quitarProductoInventario,
  productosElementosInvertidos,
  manejadorOrdenInverso,
  setProductosElementos,
  palancaModalEliminar,
  manejadorInformacionEliminar,
}) => {
  return (
    <>
      {productosElementosInvertidos.map((elementos, index) => (
        <section
          className={`producto ${styles.producto}`}
          data-nombre={elementos.nombre}
          data-precio={elementos.precio}
          data-codigo={`Code-${elementos.codigo}`}
          onClick={(event) => {
            agregarElemento(event);
            manejadorOrdenInverso(index);
          }}
          key={index}
        >
          <section
            className={`producto ${styles.producto} ${styles.gridCuadradoProducto}`}
          >
            <Image
              className={styles.imgProducto}
              src={
                elementos.imagen
                  ? URL.createObjectURL(elementos.imagen)
                  : "/PatronMas.png"
              }
              alt={
                elementos.nombreImagen
                  ? elementos.nombreImagen
                  : "PatronMas.png"
              }
              title={
                elementos.nombreImagen
                  ? elementos.nombreImagen
                  : "Imagen Por Defecto."
              }
              width={200}
              height={200}
            />
            <h4 className={styles.h4}>
              Producto: <span> {elementos.nombre}</span>
            </h4>
            <p className={styles.TituloProducto}>
              Precio: <span> {`${elementos.precio} US$`}</span>
            </p>
            <p className={styles.TituloProducto}>
              Código: <span> {`Code-${elementos.codigo}`}</span>
            </p>
            <button
              className={styles.botonQuitarProducto}
              title="Eliminar Producto"
              onClick={(event) => {
                event.stopPropagation();
                palancaModalEliminar();
                manejadorInformacionEliminar(index);
              }}
            >
              <Image
                width={20}
                height={20}
                alt="x-square.svg"
                src="/IMG/SVG/x-square.svg"
              />
            </button>
          </section>
        </section>
      ))}
    </>
  );
};

export default CrearProducto;