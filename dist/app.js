"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./models/server"));
dotenv_1.default.config();
const server = new server_1.default();
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
//# sourceMappingURL=app.js.map