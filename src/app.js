const express = require('express');
const bodyParser = require('body-parser');
const { swaggerUi, swaggerDocs } = require('./swagger'); // Asegúrate de importar swaggerUi y swaggerDocs correctamente desde './swagger'
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());

// Middleware para servir la interfaz de Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware para enrutar las solicitudes a las rutas definidas en routes.js
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger docs are available at http://localhost:${PORT}/api-docs`);
});
