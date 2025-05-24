import mongoose from 'mongoose';

const tareaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Tarea', tareaSchema);
