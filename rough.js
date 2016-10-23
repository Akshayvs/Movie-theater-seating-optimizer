var seats=[
    ['A1', 'A2', 'A3', 'A4', 'A5'],
    ['B1', 'B1', 'B1', 'B1', 'B1'],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1]
]

console.log('seats length= ' +seats.length );


console.log(seats);

seats[0].pop();
console.log(seats.length);
console.log(seats);
console.log(seats[1].length);


var length =0;
for(i=0;i<seats.length; i++){

    length= length+ seats[i].length;

}

console.log('FINA LENGTH = ' + length);