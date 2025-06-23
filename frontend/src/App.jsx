import React, { useState } from 'react';
import axios from 'axios';
import Chat from './Chat';
import './App.css';

function App() {
  const [mensaje, setMensaje] = useState('');
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const enviarMensaje = async () => {
    if (!mensaje) return;

    setHistorial([...historial, { tipo: 'usuario', texto: mensaje }]);
    setCargando(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:3001/api/chat', { mensaje });

      setHistorial((prev) => [...prev, { tipo: 'agente', texto: res.data.respuesta }]);
    } catch (err) {
      setError('Ocurrió un error al contactar al asistente.');
    } finally {
      setCargando(false);
      setMensaje('');
    }
  };

  return (
    <div className="App">
      <h1>Asistente Web</h1>
      <Chat historial={historial} cargando={cargando} error={error} />
      <input
        type="text"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
        placeholder="Escribí tu pregunta..."
      />
      <button onClick={enviarMensaje}>Enviar</button>
    </div>
  );
}

export default App;