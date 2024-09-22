import styles from "../../app/facturar/styles-facturar.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const MetodoPago = ({
  register,
  errors,
  watch,
  elementos,
  cantidadTotal,
  totalConIva,
  totalSinIva,
  quitarProducto,
  cedulaDeCliente,
  nombreDeUsuario,
  tipoDocumentacion,
  nombreCliente,
  apellidoCliente,
}) => {
  const [checkboxSiChecked, setCheckboxSiChecked] = useState(false);
  const [checkboxNoChecked, setCheckboxNoChecked] = useState(false);
  const [deshabilitarBotonFacturar, setDeshabilitarBotonFacturar] =
    useState(true);

  const [checkboxUnoChecked, setCheckboxUnoChecked] = useState(false);
  const [checkboxDosChecked, setCheckboxDosChecked] = useState(false);
  const [checkboxTresChecked, setCheckboxTresChecked] = useState(false);
  const [metodoSelecionado, setMetodoSelecionado] = useState(null);

  const handleChangeCheckBoxMetodo = (e) => {
    const id = e.target.id;
    if (id === "checkboxUno") {
      setCheckboxUnoChecked(e.target.checked);
      setCheckboxDosChecked(false);
      setCheckboxTresChecked(false);
      setMetodoSelecionado("Tarjeta");
    } else if (id === "checkboxDos") {
      setCheckboxUnoChecked(false);
      setCheckboxDosChecked(e.target.checked);
      setCheckboxTresChecked(false);
      setMetodoSelecionado("Pago Movil");
    } else if (id === "checkboxTres") {
      setCheckboxUnoChecked(false);
      setCheckboxDosChecked(false);
      setCheckboxTresChecked(e.target.checked);
      setMetodoSelecionado("Divisa");
    }
  };

  const handleChangeCheckBoxPago = (e) => {
    if (e.target.value === "Si") {
      setCheckboxSiChecked(e.target.checked);
      setCheckboxNoChecked(false);
      setDeshabilitarBotonFacturar(!e.target.checked);
    } else if (e.target.value === "No") {
      setCheckboxNoChecked(e.target.checked);
      setCheckboxSiChecked(false);
      setDeshabilitarBotonFacturar(e.target.checked);
    }
  };

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setVisible((visibilidad) => !visibilidad);
    }, 1000);

    return () => {
      clearInterval(intervalo);
    };
  }, []);

  const enrutadorFactura = useRouter();

  const enrutador = () => {
    enrutadorFactura.push(`/factura`);

    enrutadorFactura.push(
      `/factura?elementos=${JSON.stringify(
        elementos
      )}&cantidadTotal=${cantidadTotal}&totalConIva=${totalConIva}&totalSinIva=${totalSinIva}&cedulaDeCliente=${cedulaDeCliente}&nombreCliente=${nombreCliente}&apellidoCliente=${apellidoCliente}&nombreDeUsuario=${nombreDeUsuario}&tipoDocumentacion=${tipoDocumentacion}&metodoPago=${metodoSelecionado}`
    );
  };

  return (
    <>
      {elementos.length === 0 && (
        <h1
          className={styles.textoEsperaDeProductos}
          style={{ visibility: visible ? "visible" : "hidden" }}
        >
          En Espera de Productos...
        </h1>
      )}
      {elementos.length > 0 && (
        <>
          <section className={styles.containerOpacidad}>
            <h1 className={styles.tituloMetodoPago}>Metodo de Pago</h1>
            <section className={styles.contenedorMetodoPago}>
              <input
                {...register("metodo", {
                  required: {
                    value: false,
                  },
                })}
                onChange={handleChangeCheckBoxMetodo}
                id="checkboxUno"
                className={styles.input}
                type="checkbox"
                value="Tarjeta"
                checked={checkboxUnoChecked}
              />
              <label htmlFor="checkboxUno" className={styles.label}>
                Tarjeta
              </label>

              <input
                {...register("metodo", {
                  required: {
                    value: false,
                  },
                })}
                onChange={handleChangeCheckBoxMetodo}
                id="checkboxDos"
                className={styles.input}
                type="checkbox"
                value="Pagomovil"
                checked={checkboxDosChecked}
              />
              <label htmlFor="checkboxDos" className={styles.label}>
                Pagomovil
              </label>

              <input
                {...register("metodo", {
                  required: {
                    value: false,
                  },
                })}
                onChange={handleChangeCheckBoxMetodo}
                id="checkboxTres"
                className={styles.input}
                type="checkbox"
                value="Divisa"
                checked={checkboxTresChecked}
              />
              <label htmlFor="checkboxTres" className={styles.label}>
                Divisa
              </label>
            </section>
          </section>
        </>
      )}

      {(checkboxUnoChecked || checkboxDosChecked || checkboxTresChecked) &&
        elementos.length > 0 && (
          <>
            <section className={styles.containerOpacidad}>
              <h1 className={styles.tituloPago}>
                ¿El Cliente Realizo el Pago?
              </h1>
              <section className={styles.contenedorPago}>
                <input
                  {...register("pagoUno", {
                    required: {
                      value: false,
                    },
                  })}
                  onChange={handleChangeCheckBoxPago}
                  id="checkboxSi"
                  className={styles.input}
                  type="checkbox"
                  value="Si"
                  checked={checkboxSiChecked}
                />
                <label htmlFor="checkboxSi" className={styles.labelPago}>
                  Si
                </label>

                <input
                  {...register("pagoDos", {
                    required: false,
                  })}
                  onChange={handleChangeCheckBoxPago}
                  id="checkboxNo"
                  className={styles.input}
                  type="checkbox"
                  value="No"
                  checked={checkboxNoChecked}
                />
                <label htmlFor="checkboxNo" className={styles.labelPago}>
                  No
                </label>
              </section>
            </section>

            {(checkboxUnoChecked ||
              checkboxDosChecked ||
              checkboxTresChecked) &&
              elementos.length > 0 && (
                <button
                  name="facturar"
                  id="botonFacturar"
                  type="button"
                  className={styles.botonFactura}
                  style={{ width: "14rem" }}
                  disabled={deshabilitarBotonFacturar}
                  onClick={enrutador}
                >
                  Facturar
                </button>
              )}
          </>
        )}
    </>
  );
};

export default MetodoPago;