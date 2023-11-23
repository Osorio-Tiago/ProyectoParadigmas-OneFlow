// PrologRequests.js
const http = require('http');

function sendRequestToProlog({ text }) {
  return new Promise((resolve, reject) => {
    // Configuración de la solicitud HTTP al servidor Prolog
    const options = {
      hostname: 'localhost',
      port: 8000,
      path: '/transpile', // Ajusta la ruta según tu configuración en Prolog
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Crear la solicitud HTTP al servidor Prolog
    const httpReq = http.request(options, (httpRes) => {
      let responseData = '';

      // Manejar los datos recibidos del servidor Prolog
      httpRes.on('data', (chunk) => {
        responseData += chunk;
      });

      // Enviar la respuesta recibida del servidor Prolog
      httpRes.on('end', () => {
        resolve(responseData);
      });
    });

    // Manejar errores de la solicitud al servidor Prolog
    httpReq.on('error', (error) => {
      reject(error);
    });

    // Enviar los datos en el cuerpo de la solicitud al servidor Prolog utilizando desestructuración
    const requestDataToProlog = JSON.stringify({ text });
    httpReq.write(requestDataToProlog);
    httpReq.end();
  });
}

module.exports = {
  sendRequestToProlog,
};
