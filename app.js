
/**
 * Module dependencies.
 */

var express = require('express');
var swig = require('swig');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

app.engine('html', swig.renderFile);

// all environments
app.set('port', process.env.PORT || 8000);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', true);
swig.setDefaults({ cache: false });
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('rjh somewhat secret'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// set up routes
app.get('/', routes.index);
app.get('/channel.html', routes.channel);
app.post('/getFacebookInfo', routes.getFacebookInfo);

// start up server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
