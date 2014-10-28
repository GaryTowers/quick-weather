/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var useragent = require('express-useragent');


var app = express();

// all environments
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(useragent.express());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.locals.pretty = true;
}

app.get('/', function(req, res){

    var force_mobile = req.query.mobile;
    if( force_mobile == "true" || req.useragent.isMobile){
        res.render('mobile', { 
            title: 'Mobile view'
        });
    }
    else{
        res.render('desktop', { 
            title: 'Desktop view'
        });
    }
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on PORT:" + port);
});
