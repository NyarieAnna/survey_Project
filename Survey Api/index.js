const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const todosRouter = require("./routes/ansapi");
const quesRouter = require("./routes/quesApi")
const responseRouter = require("./routes/responseapi")
const surveyRouter = require("./routes/surveyapi")
const userRouter = require("./routes/userapi")
const authentificationRouter = require("./routes/authentificationAPI")
const PORT = process.env.PORT || 3000;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SURVEY API",
      version: "1.0.0",
      description: "Survey Api",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],

  // apis: ["./routes/ansapi.js","./routes/quesApi.js","./routes/responseapi.js","./routes/surveyapi.js","./routes/userapi.js"],
};
const specs = swaggerJsDoc(options);
const app = express();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/answers", todosRouter);
app.use("/questions", quesRouter);
app.use("/responses", responseRouter);
app.use("/surveys", surveyRouter);
app.use("/users", userRouter);
app.use("/accounts", authentificationRouter);
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));