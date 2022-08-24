'use strict';

require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db.config.js");
// const userRouter = require("./routers/user.routes.js");
const userRouter = require("./routes/user.routes.js");

// here we import 3rd party middleware.
const bodyParser = require("body-parser");
const cors = require("cors");

// here we use 3rd party middleware.
app.use(express.json());
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// here we connect a database connection
const DATABASE_URL = process.env.DB_URL;
connectDB(DATABASE_URL);

// here we use a routers.
app.use("/api", userRouter);

const port = process.env.PORT || 3005;

app.listen(port, (err, res)=>{
    if(err) throw err;
    console.log(`server is running on http://127.0.0.1:${port}`);
});
