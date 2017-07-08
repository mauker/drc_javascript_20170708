var express = require("express");
var mongoose = require("mongoose");

//representar as nossas rotas
var router = express.Router();

//MODELO da entidade 
var Contato = mongoose.model("Contato",{

	first_name:String,
	last_name:String,
	age:Number,
	emails:[String],
	phones:[String]

},"contact");

router.get("/contact",function (req, res) {
	
	Contato.find({}, function(err, doc){
		
		if(err){ res.send(err); }

		res.json(doc);

	})
})

router.get("/contact/:id",function (req, res) {
	
	Contato.find({_id:req.params.id}, function(err, doc){
		
		if(err){ res.send(err); }

		res.json(doc);

	})
	
})

router.delete("/contact/:id",function (req, res) {
	
	Contato.remove({_id:req.params.id}, function(err, doc){
		
		if(err){ res.send(err); }

		res.json(doc);

	})

})

router.post("/contact",function (req, res) {
	console.log("POST");
	
	var contact = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		age: req.body.age,
		emails: req.body.emails,
		phones: req.body.phones
	}

	Contato.create(contact, function(err, doc){
		
		if(err){ res.send(err); }

		res.json(doc);

	})
});

router.put("/contact",function (req, res) {
	console.log("PUT");
	var contact = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		age: req.body.age,
		emails: req.body.emails,
		phones: req.body.phones
	}
	
	Contato.update(contact, function(err, doc){
		
		if(err){ res.send(err); }

		res.json(doc);

	})
});

module.exports = router;