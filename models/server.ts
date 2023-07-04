import express, { Application } from "express";
// Este tipo de importación, con * as, sirve para cuando el
// archivo importado, tiene varias cosas para exportar,
// import * as userRoutes from "../routes/usuarios";
// En el caso de tener solo una, basta con lo siguiente:
import userRoutes from "../routes/usuarios";

import cors from "cors";
import db from "../db/connection";

class Server {
  // Definir propiedades con TS
  private app: Application; // Desestructurado, viene de express.Aplication
  private port: string;
  private paths = {
    usuarios: "/api/usuarios",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("Base de datos conectada");
    } catch (err: any) {
      throw new Error(err);
    }
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    // Lectura del body
    this.app.use(express.json());

    // Carpeta pública
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.usuarios, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto:", this.port);
    });
  }
}

export default Server;

/*
    otra manera es directamente en
    export class Server {
        ...
    }

*/
