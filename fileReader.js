/**
 * Created by asonawane on 10/19/16.
 */
'use strict';

var fs = require('fs');
var path = require('path');

var inputSanitizer = require('./lib/inputSanitizer.js');

var absolutePath = process.argv[2];
var relativePath = path.relative('/Users/asonawane/WebstormProjects/traversal', absolutePath);

fs.readFile(relativePath, function (err, f) {
    if (err) {
        console.log('ABORT! - error in reading file from the path given : ' + err);
    }
    else inputSanitizer(f);

});