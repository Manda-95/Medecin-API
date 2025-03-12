import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Définition des options Swagger
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "Documentation de l'API avec Swagger",
        },
        servers: [
            {
                url: process.env.BACKEND_URL || "http://localhost:3000",
                description: "Serveur local",
            },
        ],
    },
    apis: ["./apps/routers/*.js", "./apps/controllers/*.js"], // Fichiers contenant la doc des routes
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("Swagger Docs disponible sur /api-docs");
};

export default setupSwagger;
