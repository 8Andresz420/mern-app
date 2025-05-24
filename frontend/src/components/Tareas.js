import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://backend:5000';


function Tareas() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTareas = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setTareas(res.data);
      setError('');
    } catch (err) {
      console.error('Error al obtener tareas:', err);
      setError('No se pudieron cargar las tareas.');
    } finally {
      setLoading(false);
    }
  };

  const crearTarea = async () => {
    if (!nuevaTarea.trim()) {
      setError('El nombre de la tarea no puede estar vacío.');
      return;
    }
    try {
      const res = await axios.post(API_URL, { nombre: nuevaTarea });
      if (res.status === 201 || res.status === 200) {
        setNuevaTarea('');
        fetchTareas();
      } else {
        throw new Error('Respuesta inesperada del servidor');
      }
    } catch (err) {
      console.error('Error al crear tarea:', err);
      setError('No se pudo crear la tarea.');
    }
  };

  const eliminarTarea = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      if (res.status === 200) {
        fetchTareas();
      } else {
        throw new Error('No se pudo eliminar');
      }
    } catch (err) {
      console.error('Error al eliminar tarea:', err);
      setError('No se pudo eliminar la tarea.');
    }
  };

  useEffect(() => {
    fetchTareas();
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lista de Tareas</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nueva tarea"
          className="border px-3 py-2 mr-2 flex-grow rounded"
        />
        <button
          onClick={crearTarea}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Agregar
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Cargando tareas...</p>
      ) : (
        <ul className="space-y-2">
          {tareas.length > 0 ? (
            tareas.map((tarea) => (
              <li
                key={tarea._id}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded"
              >
                <span>{tarea.nombre}</span>
                <button
                  onClick={() => eliminarTarea(tarea._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No hay tareas disponibles.</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Tareas;
