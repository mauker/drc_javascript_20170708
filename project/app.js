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


//definimos o local da pasta publica
app.use(express.static(__dirname + '/public'));  


//vamos start o servidor
var listener = app.listen(8080,function() {
	console.log("Server Started at " + listener.address().port);
})