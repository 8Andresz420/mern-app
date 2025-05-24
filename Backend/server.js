
// server.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './src/index.js';

dotenv.config();


mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Conectado a MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
  });
})
.catch(err => {
  console.error('❌ Error conectando MongoDB:', err.message);
});