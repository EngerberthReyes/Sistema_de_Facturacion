export async function fetch({ method = "GET", url, body = null }) {
  const opciones = {
    body: body ? JSON.stringify(body) : body,
    method,
    headers: { "Content-Type": "application/json" },
  };

  const response = await window.fetch(url, opciones);

  if (response.ok) {
    //response.ok es Estatus 200 (Correcto / Exitoso)

    const resBody = await response.json();

    return resBody;
  }

  return null;
}