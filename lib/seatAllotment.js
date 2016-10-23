/**
 * Created by asonawane on 10/19/16.
 */

'use strict';

var outputSanitizer = require('./outputSanitizer.js');
var responseArray = [];
var rowSelector = 0;
var deploymentCounter = 0;
var noOfRequests;

var seats = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

function seatAssigner(sanitizedInput) {
    var requests = sanitizedInput;
    noOfRequests = sanitizedInput.length;

    requests.forEach(function(seatsRequested) {
        deploymentCounter++;
        var seats = seatsRequested;
        // CHECK ONE => Number of requested seats is less then number of available seats

        if (seatCounter(seats)) {
            consecutiveSeats(seatsRequested);
        } else {
            console.log('\nREQUESTED SEATS ARE GREATER THAN AVAILABLE SEATS when Number of seats requested is=' + seatsRequested);
            outputGenerator(null, null, null, true);
        }
    });

}

function consecutiveSeats(seatsRequested) {
    var seatsInCurrentRow = seats[rowSelector].length;

    if (seatsRequested <= seatsInCurrentRow) { // then allot them and go to the next request

        seats[rowSelector].splice(0, seatsRequested);
        console.log('seats popped from ' + rowSelector + 'row');
        console.log('No. of seats popped -' + seatsRequested);
        console.log('TOTAL REMAINING SEATS = ');
        console.log(seats);

        outputGenerator(rowSelector, seatsRequested, seatsInCurrentRow);
        rowSelector = 0;
    } else {// ITERATE OVER ALL ROWS
        if (rowSelector < seats.length - 1) {
            rowSelector++;
            consecutiveSeats(seatsRequested);
        }

        // all rows iterated but no consecutive seats found
        // logic for uneven seat allotment
        else {
            rowSelector = 0;
            randomSeats(seatsRequested);
        }
    }
}

function randomSeats(seatsRequested) {
    var selectedRows = [];
    var seatsRemoved = [];
    var rowLengthBeforePop = [];

    console.log('reaching here');

    var neededSeats = seatsRequested;

    for (var i = 0; i < seats.length; i++) {

        var randomSeatsPerRow = seats[i].length;

        if (neededSeats >= randomSeatsPerRow) {

            neededSeats = neededSeats - randomSeatsPerRow;
            seats[rowSelector].splice(0, randomSeatsPerRow);

            selectedRows.push(i);
            seatsRemoved.push(randomSeatsPerRow);
            rowLengthBeforePop.push(randomSeatsPerRow);

        } else {
            if (randomSeatsPerRow > neededSeats);
            seats[rowSelector].splice(0, neededSeats);
            selectedRows.push(i);
            seatsRemoved.push(randomSeatsPerRow);
            rowLengthBeforePop.push(neededSeats);
        }

        outputGenerator(selectedRows, seatsRemoved, rowLengthBeforePop);

        console.log('seats popped from ' + rowSelector + 'row');
        console.log('No. of seats popped -' + seatsRequested);
        console.log('TOTAL REMAINING SEATS = ');
        console.log(seats);
    }
}

function seatCounter(seatsRequested) {
    var totalSeats = 0;
    var i;
    for (i = 0; i < seats.length; i++) {
        totalSeats = totalSeats + seats[i].length;
    }

    if (seatsRequested <= totalSeats) {
        return true;
    } else {
        return false;
    }
}

function outputGenerator(rowSelector, seatsRequested, rowLengthBeforePop, errorCondition) {

    var rowNames = ['J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
    var stringToUpsert = [];

    if (errorCondition) {
        responseArray.push('REQUESTED SEATS ARE GREATER THAN AVAILABLE SEATS');
    } else {
        // For RandomSeats ()
        if (Array.isArray(rowSelector)) {

            rowSelector.forEach(function(row) {
                var i = 0;
                var numberOfSeats = seatsRequested[i];
                var rowLength = rowLengthBeforePop[i];

                        var Name = rowNames[row];
                        for (i = 0; i < numberOfSeats; i++) {
                            var seatNumber = rowLength;
                            var seatValue = Name + seatNumber;
                            stringToUpsert.push(seatValue);
                            rowLengthBeforePop = rowLength - 1;
                        }
            });
            responseArray.push(stringToUpsert.toString());
        }

        // For consecutiveSeats()
        else {

            var Name = rowNames[rowSelector];
            for (var i = 0; i < seatsRequested; i++) {
                var seatNumber = rowLengthBeforePop;
                var seatValue = Name + seatNumber;
                stringToUpsert.push(seatValue);
                rowLengthBeforePop = rowLengthBeforePop - 1;

            }
            responseArray.push(stringToUpsert.toString());
        }
    }

    // when all requests are successfully parsed; generate output
    if (deploymentCounter === noOfRequests) {
        outputSanitizer(responseArray);
    }
}

module.exports = seatAssigner;
