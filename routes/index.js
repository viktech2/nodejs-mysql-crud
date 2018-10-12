var express = require('express');
var app = express();

app.get('/', function(req, res) {
	// render to views/index.ejs template file
	sess = req.session;console.log(sess);
	if(sess.is_login){
		res.render('index', 
		{
			title: 'Home',
			data: 'Welcome to Express CRUD!'
		}
		);		
	}else{
		res.redirect('login');
	}
	
})

/** 
 * We assign app object to module.exports
 * 
 * module.exports exposes the app object as a module
 * 
 * module.exports should be used to return the object 
 * when this file is required in another module like app.js
 */ 
module.exports = app;
