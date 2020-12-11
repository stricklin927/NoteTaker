
// Dependencies
var express = require("express");
var cors = require("cors");
const apiRoutes = require("./routes/apiroute");
const htmlRoutes = require("./routes/htmlroute");

var app = express();
var PORT = process.env.PORT ||  3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);
app.use(cors());
// Listener 
app.listen(PORT, function() {
    console.log("App listening on PORT" + PORT); 
});