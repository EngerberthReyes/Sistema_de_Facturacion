"use client";

import Image from "next/image";
import head from "next/head";
import Link from "next/link";
import styles from "../../app/facturar/styles-facturar.module.css";
import Reloj from "@/components/fecha/Fecha.jsx";
import VentanaModal from "@/components/ventanaModal/VentanaModal.jsx";
import VentanaModalEliminar from "@/components/VentanaModalEliminar/VentanaModalEliminar.jsx";
import CrearProducto from "@/components/crearNuevosProductos/CrearProducto.jsx";
import ElementosTabla from "@/components/crearElementosTabla/elementosTabla.jsx";
import MetodoPago from "@/components/metodoPago/metodoPago.jsx";
import {
  ListadoCodigos,
  VolverRegistroCliente,
} from "@/components/enlace/enlace.jsx";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { fetch } from "@/services/fetch.js";

export default function Facturar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const enturador = useRouter();

  const enrutadorValor = useSearchParams();
  const nombreDeUsuario = enrutadorValor
    .get("nombredeusuario")
    .replace(/[""]/g, "");
  const cedulaCliente = enrutadorValor.get("cedulacliente");
  const cedulaClienteDecodificado = JSON.parse(
    decodeURIComponent(cedulaCliente)
  );
  const cedulaDeCliente = Number(
    cedulaClienteDecodificado.cedula
  ).toLocaleString();
  const tipoDocumentacion = cedulaClienteDecodificado.documentacion;
  const nombreDelUsuario = cedulaClienteDecodificado.nombre;
  const nombreDeUsarioPasado = nombreDeUsuario;

  const [fetchComponents, setFetchComponents] = useState([]);
  const [nombreCliente, setNombreCliente] = useState("");
  const [apellidoCliente, setApellidoCliente] = useState("");

  useEffect(() => {
    const recogerUsuario = (cedula) => {
      return cedula.find(
        (cedula) =>
          cedula.cedula_de_cliente === Number(cedulaClienteDecodificado.cedula)
      );
    };

    (async () => {
      const resp = await fetch({ url: "http://localhost:3000/api/cliente" });
      if (resp) {
        setFetchComponents(resp.results);
        const usuario = recogerUsuario(resp.results);
        if (usuario) {
          setNombreCliente(usuario.nombre);
          setApellidoCliente(usuario.apellido);
        }
      }
    })();
  }, [cedulaClienteDecodificado.cedula]);

  /* console.log(errors); */

  const volverRegistroCliente = () => {
    enturador.push(
      `/cliente-registrado?nombredeusuario=${
        JSON.stringify(nombreDeUsuario) || nombreDelUsuario
      }`
    );
  };

  const detruirSesion = () => enturador.push("/");

  const [deshabilitarBoton, setDeshabilitarBoton] = useState(true);

  const [elementosMarcadosPago, setElementosMarcadosPago] = useState([]);

  const handleChangeCheckBoxPago = (e) => {
    const valor = e.target.value;
    let updatedelementosMarcadosPago = [];

    if (elementosMarcadosPago.includes(valor)) {
      updatedelementosMarcadosPago = elementosMarcadosPago.filter(
        (element) => element !== valor
      );
    } else {
      updatedelementosMarcadosPago = [...elementosMarcadosPago, valor];
    }

    setElementosMarcadosPago(updatedelementosMarcadosPago);

    if (updatedelementosMarcadosPago.length >= 1) {
      setDeshabilitarBotonPago(false);
    } else {
      setDeshabilitarBotonPago(true);
    }
  };

  const [elementos, setElementos] = useState([]);
  const [contador, setContador] = useState(`01`);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [codigo, setCodigo] = useState("");

  const agregarElemento = (event) => {
    const nombreElemento = event.currentTarget.getAttribute("data-nombre");
    const codigoElemento = event.currentTarget.getAttribute("data-codigo");
    const precioElemento = Number(
      event.currentTarget.getAttribute("data-precio")
    );

    const elementoExistenteIndex = elementos.findIndex(
      (elemento) =>
        elemento.nombre === nombreElemento && elemento.codigo === codigoElemento
    );

    if (elementoExistenteIndex !== -1) {
      const elementosActualizados = [...elementos];
      const cantidadExistente = Number(
        elementosActualizados[elementoExistenteIndex].cantidad
      );
      const precioExistente = Number(
        elementosActualizados[elementoExistenteIndex].precio
      );
      const nuevoPrecio = precioExistente + Number(precioElemento);
      const nuevaCantidad = cantidadExistente + Number(contador);

      elementosActualizados[elementoExistenteIndex].precio = nuevoPrecio;

      elementosActualizados[elementoExistenteIndex].cantidad =
        nuevaCantidad < 10 ? `0${nuevaCantidad}` : nuevaCantidad.toString();
      setElementos(elementosActualizados);
    } else {
      const elementoNuevo = {
        nombre: nombreElemento,
        cantidad: contador,
        codigo: codigoElemento,
        precio: precioElemento,
      };

      setElementos([...elementos, elementoNuevo]);
    }

    setContador(`01`);
    setNombre("X Producto");
    setPrecio(0);
    setCodigo("");
  };

  const decrementarCantidad = (index) => {
    const nuevosElementos = elementos.map((elemento, i) => {
      if (i === index) {
        let nuevaCantidad = elemento.cantidad;
        if (nuevaCantidad === "01") {
          return elemento;
        }
        const precioElemento =
          Number(elemento.precio) / Number(elemento.cantidad);
        const nuevoPrecio = precioElemento * (Number(nuevaCantidad) - 1);

        nuevaCantidad = Math.max(Number(nuevaCantidad) - 1, 0)
          .toString()
          .padStart(2, "0");

        return {
          ...elemento,
          cantidad: nuevaCantidad,
          precio: nuevoPrecio,
        };
      }
      return elemento;
    });

    setElementos(nuevosElementos);
  };

  const incrementarCantidad = (index) => {
    const nuevosElementos = elementos.map((elemento, i) => {
      if (i === index) {
        let nuevaCantidad = elemento.cantidad;

        nuevaCantidad = Number(nuevaCantidad) + 1;
        if (nuevaCantidad < 10) {
          nuevaCantidad = nuevaCantidad.toString().padStart(2, "0");
        } else {
          nuevaCantidad = nuevaCantidad.toString();
        }

        const precioElemento =
          Number(elemento.precio) / Number(elemento.cantidad);
        const nuevoPrecio = precioElemento * nuevaCantidad;

        return {
          ...elemento,
          cantidad: nuevaCantidad,
          precio: nuevoPrecio,
        };
      }

      return elemento;
    });

    setElementos(nuevosElementos);
  };

  useEffect(() => {
    const buscarProducto = (event) => {
      if (event.target.matches("#buscador")) {
        if (event.key === "Escape") event.target.value = "";

        const productos = document.querySelectorAll(".producto");

        productos.forEach((elementoProducto) => {
          elementoProducto.textContent
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
            ? elementoProducto.classList.remove(`${styles.desaparecer}`)
            : elementoProducto.classList.add(`${styles.desaparecer}`);
        });
      }
    };

    document.addEventListener("keyup", buscarProducto);

    return () => {
      document.removeEventListener("keyup", buscarProducto);
    };
  }, []);

  const quitarProducto = async (index) => {
    const nuevosElementos = [...elementos];

    nuevosElementos.splice(index, 1);

    setElementos(nuevosElementos);
  };

  // Ventana Modal - Click

  const [estadoModal, setEstadoModal] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const palancaModal = () => {
    setEstadoModal(!estadoModal);
    setTimeout(() => {
      setMostrarModal(!mostrarModal);
    }, 1);
  };

  const [estadoModalEliminar, setEstadoModalEliminar] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const palancaModalEliminar = () => {
    setEstadoModalEliminar(!estadoModalEliminar);

    setTimeout(() => {
      setMostrarModalEliminar(!mostrarModalEliminar);
    }, 500);
  };

  const [codigoActual, setCodigoActual] = useState(9);

  const generarNuevoCodigo = () => {
    const codigoConCero =
      codigoActual < 10
        ? codigoActual.toString().padStart(2, "0")
        : codigoActual.toString();
    setCodigoActual(codigoActual + 1);
    return codigoConCero;
  };

  const [agregarProductos, setAgregarProductos] = useState([]);
  const [productosInvertidos, setProductosInvertidos] = useState([]);
  const [nombreImagenEditada, setNombreImagenEditada] = useState("");
  const [nuevaImagenEditada, setNuevaImagenEditada] = useState("");
  const [codigoEliminar, setCodigoEliminar] = useState();

  const agregarInformacionModal = async (
    nombre,
    precio,
    imagen,
    nombreImagen,
    imagenAgregada
  ) => {
    const codigo = generarNuevoCodigo();
    setCodigoEliminar(codigo);

    (async () => {
      const respuesta = await fetch({
        url: "http://localhost:3000/api/producto",
        method: "POST",
        body: {
          codigo: `Code-${codigo}`,
          nombreProducto: nombre,
          precioProducto: precio,
          nombreImagen: imagenAgregada
            ? `${imagenAgregada}`
            : `http://localhost:3000/_next/image?url=%2F${nombreImagen.replace(
                "/",
                ""
              )}&w=256&q=75`,
        },
      });
    })();

    const nuevosProductos = {
      nombre: nombre,
      precio: precio,
      codigo: codigo,
      imagen: imagen,
      nombreImagen: nombreImagen,
    };

    setAgregarProductos([...agregarProductos, nuevosProductos]);
  };

  const manejadorOrdenInverso = (index) => {
    setProductosInvertidos((elementosAnteriores) => {
      const nuevosInvertidos = [...elementosAnteriores];
      nuevosInvertidos[index] = !nuevosInvertidos[index];
      return nuevosInvertidos;
    });
  };

  const obtenerImagenNueva = (event) => {
    const archivoEditado = event.target.files[0];
    const nombreImagenSeleccionada = archivoEditado.name;
    const imagenSeleccionada = archivoEditado;
    setNombreImagenEditada(nombreImagenSeleccionada);
    setNuevaImagenEditada(imagenSeleccionada);
  };

  const quitarProductoInventario = (index) => {
    const nuevosProductosElementos = [...agregarProductos];
    nuevosProductosElementos.reverse();
    const indiceInvertido = nuevosProductosElementos.length - 1 - index;
    const codigoAnterior =
      nuevosProductosElementos[indiceInvertido - 1]?.codigo;
    const codigoActual = nuevosProductosElementos[indiceInvertido]?.codigo;
    if (codigoAnterior !== undefined && codigoAnterior === codigoActual) {
      nuevosProductosElementos[indiceInvertido - 1].codigo = codigoAnterior - 1;
    }
    nuevosProductosElementos.splice(indiceInvertido, 1);
    nuevosProductosElementos.reverse();
    setAgregarProductos(nuevosProductosElementos);
  };

  const productosElementosInvertidos = [...agregarProductos].reverse();

  const manejadorInformacionEliminar = async (valor, index) => {
    if (valor === "Si") {
      (async () => {
        const respuestaEliminar = await fetch({
          url: "http://localhost:3000/api/producto",
          method: "DELETE",
          body: { codigo: `Code-${codigoEliminar}` },
        });
      })();

      quitarProductoInventario(index);
    }

    setEstadoModalEliminar(!estadoModalEliminar);

    setTimeout(() => {
      setMostrarModalEliminar(!mostrarModalEliminar);
    }, 500);
  };

  const [cantidad, setCantidad] = useState(0);
  const [precioConIva, setPrecioConIva] = useState(0);
  const [precioSinIva, setPrecioSinIva] = useState(0);

  const manejadorCantidad = (nuevaCantidad) => {
    setCantidad(nuevaCantidad);
  };

  const manejadorPrecioConIva = (nuevoPrecioConIva) => {
    setPrecioConIva(nuevoPrecioConIva);
  };

  const manejadorPrecioSinIva = (nuevoPrecioSinIva) => {
    setPrecioSinIva(nuevoPrecioSinIva);
  };

  return (
    <>
      <head>
        <title>Facturación - Sistema de Facturación</title>
        <link rel="favicon" href="/icon.png" type="image/png" />
      </head>
      <body className={styles.body}>
        <header className={styles.header}>
          <nav className={styles.navegacion}>
            <section className={styles.navegacionContenedor}>
              <h1 className={styles.navegacionTitulo}>Facturación</h1>
              <a href="#menu" className={styles.navegacionMenu}>
                <Image
                  width={20}
                  height={20}
                  alt="menu.svg"
                  src="/IMG/SVG/menu.svg"
                  className={styles.navIcon}
                />
              </a>
              <a
                href="#"
                className={`${styles.navegacionMenu} ${styles.navegacionMenuSegundo}`}
              >
                <Image
                  width={20}
                  height={20}
                  alt="close.svg"
                  src="/IMG/SVG/close.svg"
                  className={styles.navegacionIcono}
                />
              </a>
              <ul className={styles.dropdown} id="menu">
                <li className={styles.dropdownLista}>
                  <a
                    className={styles.dropdownLink}
                    styleClienteRegistrado={{ textDecoration: "none" }}
                    onClick={volverRegistroCliente}
                  >
                    <Image
                      width={20}
                      height={20}
                      alt="projects.svg"
                      src="/IMG/SVG/projects.svg"
                      className={styles.dropdownIcon}
                    />
                    <span
                      className={styles.dropdownSpan}
                      styleClienteRegistrado={{ color: "rgb(184, 187, 191)" }}
                    >
                      <form method="POST" onSubmit={volverRegistroCliente}>
                        <button className={styles.botonCerrarSesion}>
                          Volver a Cliente Ya Registrado
                        </button>
                      </form>
                    </span>
                  </a>
                  <a
                    className={styles.dropdownLink}
                    styleClienteRegistrado={{ textDecoration: "none" }}
                    href="/"
                  >
                    <Image
                      width={20}
                      height={20}
                      alt="exit.png"
                      src="/IMG/SVG/exit.png"
                      className={styles.dropdownIcon}
                    />
                    <span
                      className={styles.dropdownSpan}
                      styleClienteRegistrado={{ color: "rgb(184, 187, 191)" }}
                    >
                      <form method="POST" onSubmit={detruirSesion}>
                        <button className={styles.botonCerrarSesion}>
                          Cerrar Sesión
                        </button>
                      </form>
                    </span>
                  </a>
                </li>
              </ul>
            </section>
          </nav>
        </header>
        <section className={styles.contenedorPosteriorDatos}>
          <h2 className={styles.tituloPosterior}>
            Usuario: {nombreDeUsuario || nombreDelUsuario}
          </h2>
          <h2 className={styles.tituloPosterior}>
            Cliente: {`${nombreCliente} ${apellidoCliente}`}
          </h2>
          <h2 className={styles.tituloPosterior}>
            C.I - Cliente: {`${tipoDocumentacion} - ${cedulaDeCliente}`}
          </h2>
        </section>
        <section className={styles.contenedorPosteriorFecha}>
          <h2 className={styles.tituloPosterior}>
            Establecimiento: Porfiados &reg;
          </h2>
          <Reloj />
        </section>
        <VentanaModal
          onSubmit={agregarInformacionModal}
          estadoModal={estadoModal}
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          modificadorEstadoModal={setEstadoModal}
        />
        <VentanaModalEliminar
          onSubmit={manejadorInformacionEliminar}
          estadoModalEliminar={estadoModalEliminar}
          setEstadoModalEliminar={setEstadoModalEliminar}
          setMostrarModalEliminar={setMostrarModalEliminar}
        />
        <section className={styles.contenedorPrincipal}>
          <article className={styles.productoContenedor}>
            <input
              className={`${styles.input} ${styles.contenedorPosteriorInput}`}
              id="buscador"
              type="text"
              placeholder="Buscar Productos y/o Codigo del Producto..."
            />
            <article className={styles.marcoProducto}>
              <section
                className={`producto ${styles.producto}`}
                onClick={palancaModal}
              >
                <section className={styles.gridCuadradoProductoAgregar}>
                  <Image
                    className={styles.imgProducto}
                    src="/PatronMas.png"
                    width={200}
                    height={200}
                    alt="PatronMas.png"
                  />
                  <p className={styles.TituloProducto}>Agregar Producto</p>
                </section>
              </section>
              <CrearProducto
                agregarElemento={agregarElemento}
                manejadorOrdenInverso={manejadorOrdenInverso}
                productosElementosInvertidos={productosElementosInvertidos}
                setProductosElementos={setAgregarProductos}
                quitarProductoInventario={quitarProductoInventario}
                manejadorInformacionEliminar={manejadorInformacionEliminar}
                palancaModalEliminar={palancaModalEliminar}
              />
              <section
                className={`producto ${styles.producto}`}
                onClick={(event) => agregarElemento(event)}
                data-nombre="Muerte"
                data-precio="1"
                data-codigo="Code-08"
              >
                <section
                  className={`producto ${styles.producto} ${styles.gridCuadradoProducto}`}
                >
                  <Image
                    className={styles.imgProducto}
                    src="/IMG/Productos-Img/Muerte.jpg"
                    width={200}
                    height={200}
                    alt="Muerte.jpg"
                  />
                  <h4 className={styles.h4}>
                    Producto: <span>Muerte</span>
                  </h4>
                  <h4 className={styles.h4}>[Album Musical]</h4>
                  <p className={styles.TituloProducto}>Disco CD [Original]</p>
                  <p className={styles.TituloProducto}>
                    Precio: <span>1 US$</span>
                  </p>
                  <p className={styles.TituloProducto}>
                    Codigo: <span>Code-08</span>
                  </p>
                </section>
              </section>

              <section
                className={`producto ${styles.producto}`}
                onClick={agregarElemento}
                data-nombre="Vida"
                data-precio="1"
                data-codigo="Code-07"
              >
                <section
                  className={`${styles.producto} ${styles.gridCuadradoProducto}`}
                >
                  <Image
                    className={styles.imgProducto}
                    src="/IMG/Productos-Img/Vida.jpg"
                    width={200}
                    height={200}
                    alt="Vida.jpg"
                  />
                  <h4 className={styles.h4}>
                    Producto: <span>Vida</span>
                  </h4>
                  <h4 className={styles.h4}>[Album Musical]</h4>
                  <p className={styles.TituloProducto}>Disco CD [Original]</p>
                  <p className={styles.TituloProducto}>
                    Precio: <span>1 US$</span>
                  </p>
                  <p className={styles.TituloProducto}>
                    Codigo: <span>Code-07</span>
                  </p>
                </section>
              </section>
              <section
                className={`producto ${styles.producto}`}
                onClick={(event) => agregarElemento(event)}
                data-nombre="Porfiado"
                data-precio="40"
                data-codigo="Code-06"
              >
                <section
                  className={`${styles.producto} ${styles.gridCuadradoProducto}`}
                >
                  <Image
                    className={styles.imgProducto}
                    src="/IMG/Productos-Img/Porfiado.jpg"
                    width={200}
                    height={200}
                    alt="Porfiado.jpg"
                  />
                  <h4 className={styles.h4}>
                    Producto: <span>Porfiado</span>
                  </h4>
                  <h4 className={styles.h4}>[Album Musical]</h4>
                  <p className={styles.TituloProducto}>
                    Disco Vinilo [Original]
                  </p>
                  <p className={styles.TituloProducto}>
                    Precio: <span>40 US$</span>
                  </p>
                  <p className={styles.TituloProducto}>
                    Codigo: <span>Code-06</span>
                  </p>
                </section>
              </section>
              <section
                className={`producto ${styles.producto}`}
                onClick={agregarElemento}
                style={{ width: "13.3rem" }}
                data-nombre="SX Vintage ST 57 Vintage"
                data-precio="250"
                data-codigo="Code-05"
              >
                <section
                  className={`${styles.producto} ${styles.gridCuadradoProducto}`}
                >
                  <Image
                    className={styles.imgProducto}
                    src="/IMG/Productos-Img/SX Vintage ST 57 Vintage.png"
                    width={200}
                    height={200}
                    alt="SX Vintage ST 57 Vintage.png"
                  />
                  <h4 className={styles.h4}>
                    Producto: <span>SX Vintage ST 57 Vintage</span>
                  </h4>
                  <p className={styles.TituloProducto}>
                    Precio: <span>250 US$ </span>
                  </p>
                  <p className={styles.TituloProducto}>
                    Codigo: <span>Code-05</span>
                  </p>
                </section>
              </section>
              <section
                className={`producto ${styles.producto}`}
                onClick={agregarElemento}
                data-nombre="Bateria"
                data-precio="473"
                data-codigo="Code-04"
              >
                <section
                  className={`${styles.producto} ${styles.gridCuadradoProducto}`}
                >
                  <Image
                    className={styles.imgProducto}
                    src="/IMG/Productos-Img/Bateria.jpg"
                    width={200}
                    height={200}
                    alt="Bateria.jpg"
                  />
                  <h4 className={styles.h4}>
                    Producto: <span>Bateria</span>
                  </h4>
                  <p className={styles.TituloProducto}>
                    Precio: <span>473 US$</span>
                  </p>
                  <p className={styles.TituloProducto}>
                    Codigo: <span>Code-04</span>
                  </p>
                </section>
              </section>

              <section
                className={`producto ${styles.producto}`}
                onClick={agregarElemento}
                data-nombre="Piano"
                data-precio="760"
                data-codigo="Code-03"
              >
                <section
                  className={`${styles.producto} ${styles.gridCuadradoProducto}`}
                >
                  <Image
                    className={styles.imgProducto}
                    src="/IMG/Productos-Img/Piano.jpg"
                    width={200}
                    height={200}
                    alt="Piano.jpg"
                  />
                  <h4 className={styles.h4}>
                    Producto: <span>Piano</span>
                  </h4>
                  <h4 className={styles.h4}>[Instrumento Musical]</h4>
                  <p className={styles.TituloProducto}>
                    Precio: <span>760 US$</span>
                  </p>
                  <p className={styles.TituloProducto}>
                    Codigo: <span>Code-03</span>
                  </p>
                </section>
              </section>
              <section
                className={`producto ${styles.producto}`}
                onClick={agregarElemento}
                data-nombre="Microfono"
                data-precio="100"
                data-codigo="Code-02"
              >
                <section
                  className={`${styles.producto} ${styles.gridCuadradoProducto}`}
                >
                  <Image
                    className={styles.imgProducto}
                    src="/IMG/Productos-Img/Microfono.jpg"
                    width={200}
                    height={200}
                    alt="Microfono.jpg"
                  />
                  <h4 className={styles.h4}>
                    Producto: <span>Microfono</span>
                  </h4>
                  <p className={styles.TituloProducto}>
                    Precio: <span>100 US$</span>
                  </p>
                  <p className={styles.TituloProducto}>
                    Codigo: <span>Code-02</span>
                  </p>
                </section>
              </section>
              <section
                className={`producto ${styles.producto}`}
                onClick={agregarElemento}
                data-nombre="Trompeta"
                data-precio="820"
                data-codigo="Code-01"
              >
                <section
                  className={`${styles.producto} ${styles.gridCuadradoProducto}`}
                >
                  <Image
                    className={styles.imgProducto}
                    src="/IMG/Productos-Img/Trompeta.jpg"
                    width={200}
                    height={200}
                    alt="Trompeta.jpg"
                  />
                  <h4 className={styles.h4}>
                    Producto: <span>Trompeta</span>
                  </h4>
                  <p className={styles.TituloProducto}>
                    Precio: <span>820 US$</span>
                  </p>
                  <p className={styles.TituloProducto}>
                    Codigo: <span>Code-01</span>
                  </p>
                </section>
              </section>
            </article>
          </article>
          <article className={styles.tablaContenedor}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tr}>
                  <th className={styles.th}>Codigo</th>
                  <th className={styles.th}>Nombre del Producto</th>
                  <th className={styles.cantidad}>Cantidad</th>
                  <th className={styles.th}>Precio</th>
                  <th className={styles.th}>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                <ElementosTabla
                  svg="/IMG/SVG/x-square.svg"
                  elementos={elementos}
                  cantidad={cantidad}
                  setPrecioConIva={manejadorPrecioConIva}
                  setPrecioSinIva={manejadorPrecioSinIva}
                  setCantidad={manejadorCantidad}
                  incrementarCantidad={incrementarCantidad}
                  decrementarCantidad={decrementarCantidad}
                  quitarProducto={quitarProducto}
                />
              </tbody>
            </table>
            <MetodoPago
              quitarProducto={quitarProducto}
              register={register}
              errors={errors}
              reset={reset}
              watch={watch}
              totalConIva={precioConIva}
              totalSinIva={precioSinIva}
              cantidadTotal={cantidad}
              elementos={elementos}
              cedulaDeCliente={cedulaDeCliente}
              nombreDeUsuario={nombreDeUsuario}
              tipoDocumentacion={tipoDocumentacion}
              nombreCliente={nombreCliente}
              apellidoCliente={apellidoCliente}
            />
          </article>
        </section>
      </body>
    </>
  );
};