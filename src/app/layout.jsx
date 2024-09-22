import "./global.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sistema de Facturación",
  description: "Sistema de Facturación - Version 2.0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <title>Sistema de Facturación</title>
      <body>{children}</body>
    </html>
  );
}
