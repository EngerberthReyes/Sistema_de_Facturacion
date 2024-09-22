import Link from "next/link";
import Image from "next/image";
import stylesIndex from "../../app/styles-index.module.css";
import styleClienteRegistrado from "../../app/cliente-registrado/styles-clienteregistrado.module.css";
import styleClienteNoRegistrado from "../../app/registro-de-cliente/styles-registrodecliente.module.css";
import stylesFacturar from "../../app/facturar/styles-facturar.module.css";
import { useSearchParams } from "next/navigation";

export function EnlaceIngresarCliente() {
  return (
    <Link href="/cliente-registrado">
      <button type="submit" className={stylesIndex.botonEnviar}>
        Ingresar
      </button>
    </Link>
  );
}

export function EnlaceIngresarClienteDos() {
  return (
    <Link href="/cliente-registrado">
      <button type="submit" className={styleClienteNoRegistrado.btnEnviar}>
        Registrar
      </button>
    </Link>
  );
}

export function NuevoClienteLink() {
  return (
    <Link href="/registro-de-cliente">
      <button
        type="submit"
        className={styleClienteNoRegistrado.botonRegcliente}
      >
        ¿Nuevo Cliente?
      </button>
    </Link>
  );
}

export function EnlaceIngresarFacturar() {
  return (
    <Link href="/facturar">
      <button
        type="submit"
        className={`${styleClienteRegistrado.botonEnviar} ${styleClienteRegistrado.botonFactura}`}
      >
        Ingresar
      </button>
    </Link>
  );
}

export function EnlaceVolverFacturar() {
  return (
    <Link href="/facturar">
      <button type="submit" className={styleListaDeCodigos.botonFactura}>
        Volver a la Facturación
      </button>
    </Link>
  );
}

export function EnlaceRegistrado() {
  return (
    <Link href="/cliente-registrado">
      <button
        type="submit"
        className={styleClienteNoRegistrado.botonRegcliente}
      >
        ¿Cliente Ya Registrado?
      </button>
    </Link>
  );
}

export function VolverRegistroCliente({ nombreDeUsuario }) {
  return (
    <Link
      className={stylesFacturar.dropdownLink}
      styleClienteRegistrado={{ textDecoration: "none" }}
      href="/cliente-registrado"
    >
      <Image
        width={20}
        height={20}
        alt="projects.svg"
        src="/IMG/SVG/projects.svg"
        className={stylesFacturar.dropdownIcon}
      />
      <span
        className={stylesFacturar.dropdownSpan}
        styleClienteRegistrado={{ color: "rgb(184, 187, 191)" }}
      >
        Volver a Cliente Ya Registrado
      </span>
    </Link>
  );
}

export function ListadoCodigos() {
  return (
    <Link
      className={stylesFacturar.dropdownLink}
      styleClienteRegistrado={{ textDecoration: "none" }}
      href="/lista-de-codigos"
    >
      <Image
        width={20}
        height={20}
        alt="projects.svg"
        src="/IMG/SVG/projects.svg"
        className={stylesFacturar.dropdownIcon}
      />
      <span
        className={stylesFacturar.dropdownSpan}
        styleClienteRegistrado={{ color: "rgb(184, 187, 191)" }}
      >
        Listado de Codigos
      </span>
    </Link>
  );
}

export function CerrarSesionMenu() {
  return (
    <Link
      className={stylesFacturar.dropdownLink}
      styleClienteRegistrado={{ textDecoration: "none" }}
      href="/"
    >
      <Image
        width={20}
        height={20}
        alt="exit.png"
        src="/IMG/SVG/exit.png"
        className={stylesFacturar.dropdownIcon}
      />
      <span
        className={stylesFacturar.dropdownSpan}
        styleClienteRegistrado={{ color: "rgb(184, 187, 191)" }}
      >
        Cerrar Sesión
      </span>
    </Link>
  );
}

export function EnlaceCerrarSesion() {
  return (
    <Link href="/">
      <button
        type="submit"
        className={styleClienteNoRegistrado.botonRegcliente}
      >
        Cerrar Sesión
      </button>
    </Link>
  );
}

export function EnlaceFactura() {
  return (
    <Link href="/factura">
      <button
        type="submit"
        name="facturar"
        className={stylesIndex.botonEnviar}
        style={{ width: "14rem" }}
      >
        Facturar
      </button>
    </Link>
  );
}