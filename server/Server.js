require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
const { connectdb } = require("./Database/dbConn");
const router = require("./routes");
//cors options
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
//http server
const http = require("http");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const server = http.createServer(app);
//database connection
connectdb();
// Cross Origin Resource Sharing
app.use(cors(corsOptions));

//middleware
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers["origin"]);
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));
//for exchange of data b/w F end and B end
app.use(express.json());

//routes
app.use(router);
app.use(notFound);
app.use(errorHandler);

app.get("*", (req, res) => {
  try {
    res.send("Page not found");
    // res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
  } catch (e) {
    console.error(e);
    res.send("Oops! unexpected error");
  }
});

//server listening
server.listen(PORT, () => {
  console.log(`Listening on port ${process.env.HOST}`);
});

module.exports = server;
