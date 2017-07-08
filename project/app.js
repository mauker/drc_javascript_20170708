//importar a biblioteca do express
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

//nos conectamos com nosso banco de dados
mongoose.connect('mongodb://localhost:27017/agenda_dev');


//criar a aplicação do express
var app = express();

//configurações globais para o express

// parse application/json 
app.use(bodyParser.json());


//adicinoar nossa model no projeto
var contactModel = require("./api/Contact");
app.use("/api", contactModel);


//vamos criar nossas chamadas de GET e POST e Etc.:
app.get("/", function (req, res) {
	
	res.send("<h1>WELCOME TO EXPRESS</h1>");

})





//vamos start o servidor
var listener = app.listen(8080,function() {
	console.log("Server Started at " + listener.address().port);
})