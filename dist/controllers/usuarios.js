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
exports.DeleteUsuario = exports.PutUsuario = exports.PostUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json({ usuarios });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        res.status(404).json({
            msg: `No existe ese usuario`
        });
    }
    else {
        res.json({ usuario });
    }
});
exports.getUsuario = getUsuario;
const PostUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield usuario_1.default.findOne({ where: { email: body.email } });
        if (existeEmail) {
            return res.status(400).json({
                msg: 'El Email: ' + body.email + ' ya esta en uso'
            });
        }
        const usuario = yield usuario_1.default.create(body);
        res.json({
            usuario
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.PostUsuario = PostUsuario;
const PutUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(400).json({
                msg: 'No se encontro al usuario'
            });
        }
        if (body.email) {
            const existeEmail = yield usuario_1.default.findOne({ where: { email: body.email } });
            if (existeEmail) {
                return res.status(400).json({
                    msg: 'El Email: ' + body.email + ' ya esta en uso'
                });
            }
        }
        yield usuario.update(body);
        res.json({
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.PutUsuario = PutUsuario;
const DeleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        return res.status(400).json({
            msg: 'No se encontro al usuario'
        });
    }
    //Eliminacion fisica
    //await usuario.destroy();
    //eliminacion logica
    yield usuario.update({ estado: false });
    res.json({
        msg: 'getUsuario',
        id
    });
});
exports.DeleteUsuario = DeleteUsuario;
//# sourceMappingURL=usuarios.js.map