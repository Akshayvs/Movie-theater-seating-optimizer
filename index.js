/**
 * Created by asonawane on 10/19/16.
 */

'use strict'


function seatAssigner(sanitizedInput){

    var requests = sanitizedInput
    console.log('INPUT ARRAY RECIEVED IN LOGIC IS  :' + requests);

//var requests = [5, 7, 15, 3, 1, 7]


var rowA = ['a1', 'a2', 'a3', 'a4', 'a5'];
var rowB = ['b1', 'b2', 'b3', 'b4', 'b5'];
var rowC = ['c1', 'c2', 'c3', 'c4', 'c5'];
var rowD = ['d1', 'd2', 'd3', 'd4', 'd5'];
var rowE = ['e1', 'e2', 'e3', 'e4', 'e5'];

var rows = [rowE, rowD, rowC, rowB, rowA];

var response = [];
/*

function executer() {

    requests.forEach(function (value) {


        var rowSelector = 0;
        var currentRow = rows[rowSelector];

        console.log('Current Row is ' + currentRow);
        console.log('Current Row length is' + currentRow.length);


        if (value <= currentRow.length) {

            var i;
            for (i = 0; i <= value; i++) {

                var seatNumber = currentRow.pop();
                response.push(seatNumber);
                i++
            }

            console.log('OUTPUT VALUE IS ' + response);
        }

        else {
            console.log('reaching here when request value is ' + value);
        }


    })

}

executer();*/

}

module.exports= seatAssigner;