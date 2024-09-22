import { NextRequest, NextResponse } from "next/server";
import { client } from "@/libreria/pgAdmin.js";

/**
 * @param {NextRequest} request
 */

export const GET = async (request) => {
  try {
    const data = await client.query(
      "SELECT cedula_de_cliente, nombre, apellido, telefono, nacionalidad FROM cliente;"
    );

    const { rows, rowCount } = data;

    if (rowCount > 0) {
      return NextResponse.json({ results: rows });
    } else {
      return NextResponse.json(
        { message: "No clients found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const POST = async (request) => {
  try {
    const body = await request.json();
    const { clienteDatos } = body;

    // Validate input
    if (
      !clienteDatos ||
      !clienteDatos.cedula ||
      !clienteDatos.nombre ||
      !clienteDatos.apellido ||
      !clienteDatos.telefono ||
      !clienteDatos.documentacion
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const inserted = await client.query(
      "INSERT INTO cliente(cedula_de_cliente, nombre, apellido, telefono, nacionalidad) VALUES($1, $2, $3, $4, $5) RETURNING *;",
      [
        Number(clienteDatos.cedula),
        clienteDatos.nombre,
        clienteDatos.apellido,
        Number(clienteDatos.telefono),
        clienteDatos.documentacion,
      ]
    );

    return NextResponse.json(inserted.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error inserting client data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
