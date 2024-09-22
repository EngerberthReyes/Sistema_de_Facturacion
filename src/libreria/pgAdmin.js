import { Client } from "pg";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const {
  NAME_DATABASE,
  HOST_DATABASE,
  PORT_DATABASE,
  USER_DATABASE,
  PASSWORD_DATABASE,
} = process.env;

// Log the database name for debugging purposes (consider removing in production)
console.log(`Connecting to database: ${NAME_DATABASE}`);

const client = new Client({
  database: NAME_DATABASE, // e.g., sistemadefacturacionalp_2
  host: HOST_DATABASE, // e.g., localhost
  port: PORT_DATABASE, // e.g., 5432
  user: USER_DATABASE, // e.g., postgres
  password: PASSWORD_DATABASE, // e.g., password
});

// Connect to the database with error handling
client
  .connect()
  .then(() => {
    console.log("Connected to the database successfully!");
  })
  .catch((err) => {
    console.error("Database connection error:", err.stack);
  });

// Export the client for use in other parts of your application
export { client };

// Remember to close the connection when done (e.g., on application exit)
process.on("exit", () => {
  client.end();
});
