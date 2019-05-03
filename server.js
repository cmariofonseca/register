const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);

// const express = require('express')

// Inicializacion del servidor
// const app = express()

// Puerto donde corre la aplicacion
//const port = process.env.PORT || 3000

/* app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
  require('./app');
}); */