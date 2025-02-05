import swaggerJsDoc from "swagger-jsdoc";


const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Todo API Documentation",
            version: "1.0.0",
            description: "API documentation for the Todo project",
        },
        servers: [
            {
                url: "http://localhost:5050",
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
