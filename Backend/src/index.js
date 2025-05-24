// src/index.js
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import tareasRouter from './routes/tareas.js';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/tareas', tareasRouter);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando');
});

// Exportamos la app, sin levantar el servidor aún
export default app;




