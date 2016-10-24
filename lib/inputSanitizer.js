/**
 * Created by asonawane on 10/19/16.
 */
'use strict';

var seatAssigner = require('./seatAllotment.js');

function sanitizer(file) {
    var data = file.toString();
    var filteredData = data.split('\n');
    var array = filteredData;
    var sanitizedInput = [];

    array.forEach(function(element) {
        if (element) { // handling empty string . ie multiple enters at the end of the file
            var filteredData2 = element.split(' ').map(Number)[1];

            // input validation . making sure only inteer values are passed. any invalid value like 'abc' , 7.35, $$$  generates an error.

            if (filteredData2 === parseInt(filteredData2, 10)) {
                sanitizedInput.push(filteredData2);
            } else {
                throw new Error('INVALID VALUE PASSED IN REQUEST, Check the Input File.');
            }
        }
    });
    if (sanitizedInput.length === 0) {
        throw new Error('no input passed / empty file');
    } else {
        seatAssigner(sanitizedInput);
    }
}

module.exports = sanitizer;
