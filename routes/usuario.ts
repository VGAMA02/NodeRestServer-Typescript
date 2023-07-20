import { Router } from "express";
import { DeleteUsuario, getUsuario, getUsuarios, PostUsuario, PutUsuario } from "../controllers/usuarios";

const router = Router();

router.get('/',    getUsuarios);
router.get('/:id', getUsuario);
router.post('/',   PostUsuario);
router.put('/:id', PutUsuario);
router.delete('/:id', DeleteUsuario);

export default router;