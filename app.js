'use strict';

  var path = require('path');
  var express = require('express');
  var app = express();

  var PORT = 8000;
  var PUBLIC_DIR = path.join(__dirname, 'client');
  var BOWER_DIR = path.join(__dirname, 'bower_components');

  app.use('/bower_components', express.static(BOWER_DIR));
  app.use(express.static(PUBLIC_DIR));

  app.listen(PORT, function () {
    console.log('server listening on port ' + PORT);
  });
