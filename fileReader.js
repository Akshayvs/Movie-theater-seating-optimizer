/**
 * Created by asonawane on 10/19/16.
 */
var fs = require("fs");
var fileName = process.argv[2];


var parameter = process.argv[2];

console.log('PARAMETER PASSED IS ' + parameter);

fs.readFile(fileName, function (err, f) {

    var data = f.toString();

    var filteredData = data.split('\n');
    var array = filteredData;
    console.log(array);
    var arrayTwo = []

    array.forEach(function (element) {
        if (element) { // handling empty string . ie multiple enters at the end of the file
            var filteredData2 = element.split(' ').map(Number)[1];
            arrayTwo.push(filteredData2);
        }
    });
    console.log(arrayTwo);
    console.log(typeof (arrayTwo[1]));
});