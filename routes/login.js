var express = require('express');
var app = express.Router();
var md5 = require('md5');


app.get('/', function(req, res) {
	// render to views/index.ejs template file
	res.render('login', {title: 'Login'})
})


app.post('/process', function(req, res, next){
    sess = req.session;
    sess.is_login = false;

    req.assert('email', 'Email is required').notEmpty();
    req.assert('pass', 'Password is required').notEmpty();

    var errors = req.validationErrors();

    if(!errors){

        var email = req.sanitize('email').escape().trim();
        var pass = req.sanitize('pass').escape().trim();
        
        req.getConnection((error, conn)=>{
            conn.query('SELECT * FROM login WHERE email = ? AND pass = ?', [email, md5(pass)], 
                (err, rows, fields)=>{
                if(err){
                    req.flash('error', err);
                    res.render('login', {title: 'Login'});
                }else{

                    console.log(rows);
                    if(rows.length){
                        sess.email = rows[0].email;
                        sess.is_login = true;
                        res.redirect('/');
                    }else{
                        req.flash('error', 'Invalid email/password!');
                        res.render('login', {title: 'Login'});     
                    }
                    
                }
            });

        });

        
    }else{
        var error_msg = '';
        errors.forEach(function(err){
            error_msg += err.msg + '<br>';
        });

        req.flash('error', error_msg);

        res.render('login', {title: 'Login'});
    }

});

module.exports = app;
