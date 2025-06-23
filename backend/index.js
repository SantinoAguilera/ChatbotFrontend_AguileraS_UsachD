const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { elAgente } = require('./agent');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  const mensaje = req.body.mensaje;
  console.log('Mensaje recibido:', mensaje);

  if (!mensaje) {
    return res.status(400).json({ error: 'Mensaje no proporcionado' });
  }

  try {
    const respuesta = await elAgente.run(mensaje);
    console.log('Respuesta del agente:', respuesta);
    res.json({ respuesta });
  } catch (error) {
    console.error('Error en el agente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});