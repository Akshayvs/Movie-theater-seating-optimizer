/**
 * Created by asonawane on 10/19/16.
 */
'use strict';

var fs = require('fs');

function fileWriter(finalArr) {

    var arrayString = finalArr.toString();
    var formattedString = arrayString.split(',R').join('\nR');

    fs.writeFile('./output/result.txt', formattedString, function(err) {
        if (err) console.log('ERROR GENERATING FILE >result.txt' + err);

        else {
            console.log('FILE SUCCESSFULLY GENERATED \n');
            console.log('PATH TO FILE : /Users/asonawane/WebstormProjects/traversal/output/result.txt');
        }
    });
}

module.exports = fileWriter;
