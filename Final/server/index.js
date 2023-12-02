//index.js
const express = require("express");
const mysql = require("mysql");
const contactRouter = require("./routes/routes_contact");
const tourRouter = require("./routes/routes_tour");
const travelerRouter = require("./routes/routes_traveler");
const cors = require("cors");

const app = express();
app.use(cors());

const connection = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "ntnu3528",
    database: 'travelgency'
});


app.use(express.json());
app.use("/api/contacts", contactRouter(connection));
app.use("/api/tours", tourRouter(connection));
app.use("/api/travelers", travelerRouter(connection));

app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
});