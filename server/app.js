const express = require("express");
const http = require("http");
const debug = require("debug")("development:app");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/AuthRoutes");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8000;
const databaseUrl = process.env.DATABASE_URL;

app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials: true
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/api/auth",authRouter);


server.listen(port,(err)=>{
    if(err) debug(`error in connecting to the port: ${port}`,err.message);
    debug(`server successfully connected to port: ${port}`);
});

mongoose.connect(databaseUrl)
.then(()=>{debug("Database connected successfully!")})
.catch((err)=>{debug("error in connecting the db: ",err.message)});
