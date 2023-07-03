import dotenv from "dotenv";
import Server from "./models/server";

dotenv.config();
const server = new Server();

server.listen();

/*

Comando para compilar
esto generará el js, en .dist/app.js

tsc

Para ver los cambios en tiempo real, no basta con tener "nodemon dist/app.js"
debido a que esto sólo reconocerá los cambios en dicho archivo, y ese archivo sólo
se actualizará cuando se compile la aplicación con el comando "tsc"

Una forma "fácil" de solucionar esto y que nodemon este escuchando los cambios de
TS es usar un observable propio de tsc, para ello

en una termina tener abierto:

"nodemon dist/app"

y en otra terminal 

"tsc --watch"


*/
