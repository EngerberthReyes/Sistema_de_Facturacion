import React, { useState, useEffect } from "react";
import Image from "next/image";
import stylesModal from "../../app/facturar/styles-facturar.module.css";
import styleInputs from "../../app/cliente-registrado/styles-clienteregistrado.module.css";

const VentanaModal = ({
  estadoModal,
  modificadorEstadoModal,
  onSubmit,
  mostrarModal,
  setMostrarModal,
}) => {
  const [nombreProducto, setNombreProducto] = useState("X Producto");
  const [precioProducto, setPrecioProducto] = useState(0);
  const [nombreImagen, setNombreImagen] = useState("/PatronMas.png");
  const [imagen, setImagen] = useState();
  const [imagenAgregada, setImagenAgregada] = useState();

  const manejadorInformacion = async (event) => {
    event.preventDefault();

    onSubmit(
      nombreProducto,
      precioProducto,
      imagen,
      nombreImagen,
      imagenAgregada
    );
    setNombreProducto("X Producto");
    setPrecioProducto(0);
    setImagen("");
    setImagenAgregada("");
    setNombreImagen("/PatronMas.png");
    modificadorEstadoModal(false);
  };

  const cambiarNombre = (event) => {
    const { value, scrollHeight } = event.target;

    event.target.style.height = "auto";
    event.target.style.height = `${scrollHeight}px`;

    setNombreProducto(value);
  };

  const cambiarPrecio = (event) => {
    const { value } = event.target;
    if (value.length <= 5 && /^\d*$/.test(value)) {
      setPrecioProducto(parseFloat(value));
    }
  };

  let obtenerImagenValor;

  const obtenerImagen = (event) => {
    const archivo = event.target.files[0];
    const nombreImage = archivo.name;

    setImagen(archivo);
    setNombreImagen(nombreImage);

    obtenerImagenValor = archivo
      ? URL.createObjectURL(archivo)
      : "/PatronMas.png";
    setImagenAgregada(obtenerImagenValor);
  };

  return estadoModal ? (
    <form method="POST" onSubmit={manejadorInformacion}>
      <section
        className={`${stylesModal.contenedorModal} ${
          mostrarModal ? stylesModal.open : stylesModal.close
        }`}
      >
        <section
          className={`${stylesModal.contenedorInternoModal} ${
            mostrarModal ? stylesModal.open : stylesModal.close
          }`}
          style={{
            boxShadow:
              "#eeeeee36 0.5rem 0.5rem 1rem, #eeeeee36 -0.5em -0.5rem 1rem",
            width: "100vw",
            height: "87vh",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <section
            className={stylesModal.modalCabezera}
            style={{ margin: "0 0 10px 0" }}
          >
            <h1 className={stylesModal.tituloModal}>Registro de Producto</h1>
          </section>
          <button
            type="button"
            className={stylesModal.botonCierre}
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              border: "2px solid #eeeeee",
            }}
            onClick={() => {
              setMostrarModal(false);

              setTimeout(() => {
                modificadorEstadoModal(false);
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
          <section style={{ display: "flex", flexDirection: "column" }}>
            <label
              className={styleInputs.label}
              style={{
                width: "14rem",
                boxShadow: "0px 0px 0.7rem 0 #eeeeee86",
              }}
              htmlFor="Nombre"
            >
              Nombre de Producto
            </label>
            <textarea
              className={styleInputs.input}
              id="Nombre"
              style={{
                boxShadow: "0px 0px 0.7rem 0 #eeeeee86",
                height: "45px",
                resize: "none",
                width: "100%",
                overflow: "hidden",
                transition: "height 0.2s ease-out",
              }}
              maxLength={20}
              placeholder="Nombre del Nuevo Producto"
              onInput={cambiarNombre}
            ></textarea>
            <label
              className={styleInputs.label}
              style={{
                width: "14rem",
                boxShadow: "0px 0px 0.7rem 0 #eeeeee86",
              }}
              htmlFor="Precio"
            >
              Precio del Producto
            </label>
            <section
              style={{
                display: "flex",
                columnGap: "1rem",
                marginBottom: "7px",
              }}
            >
              <input
                className={styleInputs.input}
                style={{
                  boxShadow: "0px 0px 0.7rem 0 #eeeeee86",
                  width: "100vw",
                }}
                placeholder="Precio del Nuevo Producto"
                id="Precio"
                maxLength={5}
                onChange={cambiarPrecio}
                type="number"
              />
              <input
                className={styleInputs.input}
                value="US$"
                style={{
                  height: "3rem",
                  boxShadow: "0px 0px 0.7rem 0 #eeeeee86",
                  width: "5rem",
                  pointerEvents: "none",
                  textAlign: "center",
                }}
                readOnly
              />
            </section>
            <section className={stylesModal.contenedorModalImagen}>
              <section className={stylesModal.contenedorInternoImagen}>
                <section
                  className={`${stylesModal.modalCabezera} ${stylesModal.modalCabezeraEditado}`}
                >
                  <h1 className={stylesModal.tituloModal}>
                    {nombreImagen
                      ? `Nombre de la Imagen Seleccionada: ${nombreImagen}`
                      : "Seleccione Una Imagen Para el Producto: Imagen Por Defecto."}
                  </h1>
                </section>
                <Image
                  src={imagenAgregada ? imagenAgregada : "/PatronMas.png"}
                  alt={nombreImagen ? nombreImagen : "PatronMas.png"}
                  title={nombreImagen ? nombreImagen : "Imagen Por Defecto"}
                  layout="intrinsic"
                  width={350}
                  height={350}
                  style={{
                    borderRadius: "0.5rem",
                    boxShadow:
                      "#eeeeee17 0.5rem 0.5rem 1rem, #eeeeee17 -0.5em -0.5rem 1rem",
                    marginBottom: "10px",
                  }}
                />
                <section
                  className={`${stylesModal.modalCabezera} ${stylesModal.modalCabezeraEditadoDos}`}
                >
                  <p className={stylesModal.textoImagenTitulo}>
                    El Tamano Apropiado Para la Imagen Debe Ser 200 x 200
                    Pixeles
                  </p>
                  <label
                    className={stylesModal.botonFactura}
                    style={{
                      width: "20rem",
                      boxShadow: "0px 0px 0.7rem 0 #eeeeee86",
                    }}
                    htmlFor="Imagen"
                  >
                    Seleccionar Una Imagen
                  </label>
                  <input
                    accept=".png, .apng, .gif, .jpg, .jpeg, .svg"
                    className={styleInputs.input}
                    style={{
                      display: "none",
                    }}
                    onChange={obtenerImagen}
                    id="Imagen"
                    type="file"
                  />
                </section>
              </section>
            </section>
            <section style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => {
                  setMostrarModal(false);

                  setTimeout(() => {
                    modificadorEstadoModal(false);
                  }, 500);
                }}
                className={stylesModal.botonFactura}
                style={{
                  width: "27rem",
                  marginBottom: "0",
                  boxShadow: "0px 0px 0.7rem 0 #eeeeee86",
                }}
              >
                Agregar Nuevo Producto
              </button>
            </section>
          </section>
        </section>
      </section>
    </form>
  ) : null;
};

export default VentanaModal;