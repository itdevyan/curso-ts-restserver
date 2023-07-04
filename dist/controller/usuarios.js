"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuarios_1 = __importDefault(require("../models/usuarios"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuarios_1.default.findAll();
    return res.json(usuarios);
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuarios_1.default.findByPk(id);
    if (!usuario) {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`,
        });
    }
    return res.json(usuario);
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield usuarios_1.default.findOne({
            where: {
                email: body.email,
            },
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el email ${body.email}`,
            });
        }
        const usuario = yield usuarios_1.default.create(body);
        return res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor, contacte al administrador.",
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuarios_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`,
            });
        }
        if (body.email) {
            const existeEmail = yield usuarios_1.default.findOne({
                where: {
                    email: body.email,
                },
            });
            if (existeEmail) {
                return res.status(400).json({
                    msg: `Ya existe un usuario con el email ${body.email}`,
                });
            }
        }
        yield usuario.update(body);
        return res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor, contacte al administrador.",
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuarios_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`,
            });
        }
        // Eliminación física
        // await usuario.destroy();
        // Eliminación lógica
        yield usuario.update({
            estado: false, // esto lo convierte automaticamente en 0
        });
        return res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor, contacte al administrador.",
        });
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map