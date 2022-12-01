import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Assignment",
      description: "Assignment",
      contact: {
        name: "Sukhbir singh",
        email: "s.sukhbirsohal@gmail.com",
      },
    },
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        jwt: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
