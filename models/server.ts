import express, { Application } from "express";

class Server {
  // Definir propiedades con TS
  private app: Application; // Desestructurado, viene de express.Aplication
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";
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
