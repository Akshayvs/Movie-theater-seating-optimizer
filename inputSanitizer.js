/**
 * Created by asonawane on 10/19/16.
 */
'use strict';

var seatAssigner = require('./index.js');

function sanitizer(file) {

    var data = file.toString();
    var filteredData = data.split('\n');
    var array = filteredData;
    var sanitizedInput = []

    array.forEach(function (element) {
        if (element) { // handling empty string . ie multiple enters at the end of the file
            var filteredData2 = element.split(' ').map(Number)[1];
            sanitizedInput.push(filteredData2);
        }
    });

    seatAssigner(sanitizedInput);
}

module.exports = sanitizer;