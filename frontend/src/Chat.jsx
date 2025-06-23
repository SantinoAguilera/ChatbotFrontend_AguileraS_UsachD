import React from 'react';
import './Chat.css';

function Chat({ historial, cargando, error }) {
  return (
    <div className="chatbox">
      {historial.map((msg, i) => (
        <div key={i} className={`mensaje ${msg.tipo}`}>
          {msg.texto}
        </div>
      ))}
      {cargando && <div className="mensaje agente">Pensando...</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Chat;