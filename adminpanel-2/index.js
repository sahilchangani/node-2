const express = require("express");
const port = 1008;
const app = express();
const db = require("./config/db");
const path = require("path");
const cookie = require("cookie-parser");
const passport = require("./Middleware/password");
const session = require("express-session");
const route = require("./Routes/route");
const catroute = require("./Routes/catroute");
const subroute = require("./Routes/subroute");
const productroute = require("./Routes/Productroute");

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.use(cookie());

app.use(
    session({
        name: "local",
        secret: 'sahil',
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: 100 * 100 * 60 },
    })
)

app.use(passport.initialize());
app.use(passport.session());

app.use("/",route);
app.use("/",catroute);
app.use("/",subroute);
app.use("/",productroute);

app.listen(port,(err)=>{
    err?console.log(err):console.log(`Server Started: http://localhost:${port}`);    
});