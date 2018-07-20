'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

var port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 
	'Access-Control-Allow-Heades, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

	next();

});

router.get('/', router);

app.listen(port, function() {
	console.log('api running on port 3001');
});