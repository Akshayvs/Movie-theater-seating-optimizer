/**
 * Created by asonawane on 10/19/16.
 */

'use strict';

var outputSanitizer = require('./outputSanitizer.js');
var responseArray = [];
var rowSelector = 0;
var deploymentCounter = 0;
var noOfRequests;

// array describing the seating arrangement. This can also be constructed using a for loop thereby quickly constructing any size of M x N seating arrangement
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

//function takes as input all the requests and sequentially allots seats for each request by iterating over the seat map array`seats[]` above.
function seatAssigner(sanitizedInput) {
    var requests = sanitizedInput;
    noOfRequests = sanitizedInput.length;

    requests.forEach(function (seatsRequested) {
        deploymentCounter++;

        // `seatCounter()` takes as input the number of seats requested and returns true if Number of requested seats is less then number of available seats.

        if (seatCounter(seatsRequested)) {
            consecutiveSeats(seatsRequested);       // LOGIC FOR SEAT ALLOTMENT
        }

        else {
            console.log('\nREQUESTED SEATS ARE GREATER THAN AVAILABLE SEATS when Number of seats requested is=' + seatsRequested);
            outputGenerator(null, null, null, true);
        }
    });
}


function consecutiveSeats(seatsRequested) {
    var seatsInCurrentRow = seats[rowSelector].length;

    if (seatsRequested <= seatsInCurrentRow) { // then allot them and go to the next request

        seats[rowSelector].splice(0, seatsRequested);


        chartGenerator(rowSelector, seatsRequested, seats);

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

    console.log('\nREACHING RANDOM SEAT DISTRIBUTION \n');
    var neededSeats = seatsRequested;

    for (var i = 0; i < seats.length; i++) {
        if (neededSeats != 0) {
            var randomSeatsPerRow = seats[i].length;

            if (neededSeats >= randomSeatsPerRow) {
                neededSeats = neededSeats - randomSeatsPerRow;
                seats[i].splice(0, randomSeatsPerRow);
                selectedRows.push(i);
                seatsRemoved.push(randomSeatsPerRow);
                rowLengthBeforePop.push(randomSeatsPerRow);


                chartGenerator(i, seatsRequested, seats);

            } else {
                if (randomSeatsPerRow > neededSeats) {
                    neededSeats = 0;
                    seats[i].splice(0, neededSeats);
                    selectedRows.push(i);
                    seatsRemoved.push(randomSeatsPerRow);
                    rowLengthBeforePop.push(neededSeats);
                    chartGenerator(i, seatsRequested, seats);
                }
            }
        }
    }
    outputGenerator(selectedRows, seatsRemoved, rowLengthBeforePop);
}
// `seatCounter()` takes as input the number of seats requested and returns true if Number of requested seats is less then number of available seats.
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

function chartGenerator(rowSelector, seatsRequested, seats) {
    console.log('seats popped from ' + rowSelector + ' row');
    console.log('No. of seats popped -' + seatsRequested);
    console.log('SEAT MAP UPDATED :');
    console.log(seats);
}


// function stores logic to convert the popped seats into exact seat name-number string.
// This logic is used to s

function outputGenerator(rowSelector, seatsRequested, rowLengthBeforePop, errorCondition) {
    var rowNames = ['J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
    var stringToUpsert = [];
    if (errorCondition) {
        responseArray.push('REQUESTED SEATS ARE GREATER THAN AVAILABLE SEATS');
    } else {
        // For RandomSeats ()
        if (Array.isArray(rowSelector)) {

            rowSelector.forEach(function (row) {
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
