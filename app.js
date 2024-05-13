const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/api");
const pagesRouter = require("./routes/pages");

const cookieParser = require("cookie-parser");
const cors = require("./middlewares/cors");
const connectToDatabase = require("./database/connect");

const PORT = 3001;
const app = express();

connectToDatabase();

app.use(
    cors,
    cookieParser(), // миддлвар для работы с куки
    bodyParser.json(),
    pagesRouter,
    apiRouter,
    express.static(path.join(__dirname, "public"))
);

app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
});
