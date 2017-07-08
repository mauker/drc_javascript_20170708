//Iniciando uma aplicação angular
var app = angular.module("myApp",[]);

//vamos criar nossa controller
app.controller("FormCtrl",["$scope","$http","RestAPI",function($scope,$http, RestAPI){

	$scope.mensagem = "LEONARD PRESTA ATENÇÃO!";
	$scope.contact = {
		first_name: "",
		last_name:"",
		age:undefined,
		emailsContainer:[{value:""}],
		phonesContainer:[{value:""}]
	}
	$scope.contacts = [];

	$scope.enviado = function (contact) {
		console.log(contact);
		var emails =[];
		var phones = [];

		contact.phonesContainer.forEach(function (item) {
			phones.push(item.value);
		})
		contact.phones = phones;

		contact.emailsContainer.forEach(function (item) {
			emails.push(item.value);
		})
		contact.emails = emails;

		RestAPI.insertContacts(contact,function(result) {
			console.log(result);
		})
	}
	$scope.appendPhone = function () {
		$scope.contact.phonesContainer.push({value:""});
	}
	$scope.appendEmail = function () {
		$scope.contact.emailsContainer.push({value:""});
	}


	$scope.editContact = function (contact) {

		var emails =[];
		var phones = [];

		contact.phones.forEach(function (item) {
			phones.push({"value":item});
		})
		contact.phonesContainer = phones;

		contact.emails.forEach(function (item) {
			emails.push({"value":item});
		})
		contact.emailsContainer = emails;

		$scope.contact = contact;
		
	}

	$scope.deleteContact = function (contact) {

		RestAPI.deleteContact(contact._id, function(result) {
			console.log(result);
			loadContacts();
		});

	}

	function loadContacts() {
		
		RestAPI.getContacts(function(result) {
			console.log(result)
			$scope.contacts = result.data;
		})
	}

	loadContacts();

}])

app.factory("RestAPI", function ($http) {

	var apiURL = "http://localhost:8080/api";

	function getContacts(callback) {

		$http({
		  method: 'GET',
		  url: apiURL + "/contact"
		}).then(function successCallback(response) {
		    
		    callback(response);

		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    callback(response);
		  });
	}

	function deleteContact(id,callback) {

		$http({
		  method: 'DELETE',
		  url: apiURL + "/contact/" + id
		}).then(function successCallback(response) {
		    
		    callback(response);

		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    callback(response);
		  });
	}

	function insertContacts(data,callback) {

		$http({
		  method: 'POST',
		  url: apiURL + "/contact",
		  data:data,
		}).then(function successCallback(response) {
		    
		    callback(response);

		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    callback(response);
		  });
	}

	return{
		getContacts:getContacts,
		insertContacts:insertContacts,
		deleteContact:deleteContact
	}
})
