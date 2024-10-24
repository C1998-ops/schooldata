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
const path = require("path");
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
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../build")));

// This is the crucial part: Serve index.html for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});
//server listening
server.listen(PORT, () => {
  console.log(`Listening on port ${process.env.HOST}`);
});

module.exports = server;
