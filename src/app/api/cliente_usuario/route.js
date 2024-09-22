import { NextRequest, NextResponse } from "next/server";
import { client } from "@/libreria/pgAdmin.js";

/**
 * @param {NextRequest} request
 */
export const GET = async (request) => {
  try {
    const [dataDeUsuario, dataDeCliente] = await Promise.all([
      client.query(
        "SELECT id_usuario, nombre_de_usuario FROM usuario ORDER BY id_usuario DESC LIMIT 1;"
      ),
      client.query(
        "SELECT cedula_de_cliente, nombre, apellido FROM cliente ORDER BY cedula_de_cliente DESC LIMIT 1;"
      ),
    ]);

    const usuario = dataDeUsuario.rows[0];
    const cliente = dataDeCliente.rows[0];

    const inserted = await client.query(
      "INSERT INTO cliente_usuario (fk_id_usuario, nombre_de_usuario, fk_cedula_de_cliente, nombre_de_cliente) VALUES($1, $2, $3, $4) RETURNING *;",
      [
        usuario.id_usuario,
        usuario.nombre_de_usuario,
        cliente.cedula_de_cliente,
        `${cliente.nombre} ${cliente.apellido}`,
      ]
    );

    return NextResponse.json(inserted.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error inserting client-user data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
