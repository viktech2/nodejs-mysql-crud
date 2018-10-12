var express = require('express');
var app = express.Router();

app.get('/', function(req, res){

    req.session.destroy(err=>{
        if(err){
            req.flash('error', err);
            res.render('index', {title: 'Home'});
        }else{
            res.redirect('login');
        }
    })

});

module.exports = app;