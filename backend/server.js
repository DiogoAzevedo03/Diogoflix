require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Importando o CORS
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuração do CORS
const allowedOrigins = ['https://diogoflix-frontend.onrender.com'];  // URL do seu frontend no Render
const corsOptions = {
  origin: allowedOrigins,  // Permitir apenas o frontend específico
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
  credentials: true,  // Permite o envio de cookies ou credenciais
};
app.use(cors(corsOptions));  // Usando o middleware CORS com as opções

// Middleware
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Rotas
app.use('/api', movieRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
