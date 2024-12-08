require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;
const router = require("./src/routes/routes");
const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./openapi3.json');
const cors = require("cors")

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors())

app.use("/", router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(port, "0.0.0.0", () => {
  console.log(`App listening at http://localhost:${port}`);
});
