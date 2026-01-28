import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import sushiRouter from "./routes/sushi.routes.js";


const app = express();

const port = 3000;
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sushi API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.ts"],
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware: lets us read JSON bodies
app.use(express.json());

app.use("/api/sushi", sushiRouter);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
