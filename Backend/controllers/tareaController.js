import Tarea from '../models/tarea.js';

export const obtenerTareas = async (req, res) => {
  const tareas = await Tarea.find();
  res.json(tareas);
};

export const crearTarea = async (req, res) => {
  const nueva = new Tarea({ nombre: req.body.nombre });
  await nueva.save();
  res.status(201).json(nueva);
};

export const eliminarTarea = async (req, res) => {
  await Tarea.findByIdAndDelete(req.params.id);
  res.status(200).json({ mensaje: 'Eliminado' });
};
