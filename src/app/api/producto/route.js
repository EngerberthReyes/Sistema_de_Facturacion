import { NextResponse } from "next/server";
import { client } from "@/libreria/pgAdmin.js";

/**
 * @param {NextRequest} request
 */

export const GET = async (request) => {
  try {
    const data = await client.query(
      "SELECT codigo, nombre_de_producto, precio_de_producto, url_imagen FROM producto;"
    );

    const { rows, rowCount } = data;

    if (rowCount > 0) {
      return NextResponse.json({ results: rows });
    } else {
      return NextResponse.json(
        { message: "No products found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const POST = async (request) => {
  try {
    const body = await request.json();
    const { codigo, nombreProducto, precioProducto, nombreImagen } = body;

    // Validate input
    if (!codigo || !nombreProducto || !precioProducto || !nombreImagen) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const inserted = await client.query(
      "INSERT INTO producto(codigo, nombre_de_producto, precio_de_producto, url_imagen) VALUES($1, $2, $3, $4) RETURNING *;",
      [codigo, nombreProducto, precioProducto, nombreImagen]
    );

    return NextResponse.json(inserted.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error inserting product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (request) => {
  try {
    const body = await request.json();
    const { codigo } = body;

    // Validate input
    if (!codigo) {
      return NextResponse.json(
        { message: "Missing required field 'codigo'" },
        { status: 400 }
      );
    }

    const result = await client.query(
      "DELETE FROM producto WHERE codigo = $1 RETURNING *;",
      [codigo]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
