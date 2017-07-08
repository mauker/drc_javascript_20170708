//importar a biblioteca do express
var express = require("express");

//criar a aplicação do express
var app = express();


//vamos criar nossas chamadas de GET e POST e Etc.:
app.get("/", function (req, res) {
	
	res.send("<h1>WELCOME TO EXPRESS</h1>");

})




//vamos start o servidor
var listener = app.listen(8080,function() {
	console.log("Server Started at " + listener.address().port);
})