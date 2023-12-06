const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./database").connectDB;

//Routes
const authRouter = require("./routes/userRoutes")

db();
app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(process.env.PORT, ()=>{
    console.log(`Server listening on port ${process.env.PORT}`);
})
