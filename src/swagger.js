const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Player API',
            version: '1.0.0',
            description: 'API to manage fictional players',
            contact: {
                name: 'XamSav',
            },
            servers: [{ url: 'http://localhost:3000' }],
        },
    },
    apis: ['./src/routes.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
    swaggerUi,
    swaggerDocs,
};
