const express = require('express');
const cookieParser = require('cookie-parser');
const port = 1008;
const app = express();
const db = require('./config/db');

app.set("view engine","ejs")
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use("/", require("./routes/route"));

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`Server is running on port http://localhost:${port}`);
})