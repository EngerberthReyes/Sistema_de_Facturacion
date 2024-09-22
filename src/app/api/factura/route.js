import { NextRequest, NextResponse } from "next/server";
import { client } from "@/libreria/pgAdmin.js";

/**
 * @param {NextRequest} request
 */

export const POST = async (request) => {
  try {
    const body = await request.json();
    const {
      datos,
      nombreCliente,
      nombreUsuario,
      cedulaCliente,
      metodoDePago,
      totalConIva,
    } = body;

    // Validate input
    if (!datos || !Array.isArray(datos) || datos.length === 0) {
      return NextResponse.json(
        { message: "Invalid or missing 'datos'" },
        { status: 400 }
      );
    }

    // Insert each item in datos into the database
    const insertedItems = await Promise.all(
      datos.map(async (item) => {
        try {
          const result = await client.query(
            "INSERT INTO factura(nombre_de_usuario, nombre_de_cliente, codigo_de_producto, cedula_de_cliente, nombre_de_producto, precio_de_producto, metodo_de_pago, total, cantidad_de_producto) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;",
            [
              nombreUsuario,
              nombreCliente,
              item.codigo,
              Number(cedulaCliente),
              item.nombre,
              Number(item.precio), // Ensure price is a number
              metodoDePago,
              Number(totalConIva),
              Number(item.cantidad), // Ensure quantity is a number
            ]
          );
          return result.rows[0]; // Return the inserted row
        } catch (insertError) {
          console.error("Error inserting item:", insertError);
          throw new Error("Failed to insert item into the database");
        }
      })
    );

    // Return a response with the inserted items
    return NextResponse.json(insertedItems, { status: 201 });
  } catch (error) {
    console.error("Error inserting invoice data:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};
