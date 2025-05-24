import express from 'express';
import {
  obtenerTareas,
  crearTarea,
  eliminarTarea,
} from '../controllers/tareaController.js';

const router = express.Router();

router.get('/', obtenerTareas);
router.post('/', crearTarea);
router.delete('/:id', eliminarTarea);

export default router;

