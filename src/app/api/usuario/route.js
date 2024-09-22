import { NextRequest, NextResponse } from "next/server";
import { client } from "@/libreria/pgAdmin.js";

/**
 * @param {NextRequest} request
 */

export const GET = async (request) => {
  try {
    const datos = await client.query(
      "SELECT id_usuario, nombre_de_usuario FROM usuario;"
    );

    const { rows, rowCount } = datos;

    if (rowCount > 0) {
      return NextResponse.json({ results: rows });
    } else {
      return NextResponse.json({ message: "No users found." }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const POST = async (request) => {
  try {
    const body = await request.json();
    const { nombre } = body;

    const inserted = await client.query(
      "INSERT INTO usuario(nombre_de_usuario) VALUES($1) RETURNING *;",
      [nombre]
    );

    return NextResponse.json(inserted.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error inserting user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
