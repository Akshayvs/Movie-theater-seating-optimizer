/**
 * Created by asonawane on 10/22/16.
 */
'use strict';

var fileWriter = require('./fileWriter.js');

function outputSanitizer(outputArray) {

    var finalArr = [];
    var incrementor = 1;

    outputArray.forEach(function(element) {

        var str = '' + incrementor;
        var pad = '000';
        var ans = pad.substring(0, pad.length - str.length) + str;

        var outputString = 'R' + ans + ' ' + element;
        finalArr.push(outputString);
        incrementor++;
    });
    fileWriter(finalArr);
}

module.exports = outputSanitizer;
