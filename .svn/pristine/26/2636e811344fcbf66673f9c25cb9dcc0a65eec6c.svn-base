const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: '3.1.0',
        info: {
            title: 'API REST TICKETERA',
            version: '1.0.0',
            description: 'Documentación de la API',
        },
        components: {
            securitySchemes: {
                'x-token': {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-token',
                }
            }
        },
        security: [
            {
                'x-token': []
            }
        ]
    },
    apis: ['./routes/*.js'],
    sorter: 'alpha'
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
