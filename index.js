import { config } from "dotenv";
import { initServer } from "./configs/app.js";

config();

process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error(promise, reason);
    process.exit(1);
});

console.log("Iniciando el Sistema de Gestión de Opiniones...");
initServer();