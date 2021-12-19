
// can any new people guess the result?
// note that zero

function myCallback() { 
    console.log('Lightning squad first!');
}

// setTimeout is from a WebAPI/c++ API (if node). This threading is kind of hidden from you.
setTimeout( myCallback, 0);

console.log('Nah log me first!!!');


// Loupe

// function myCallback() { 
//     console.log('Lightning squad first!');
// }

// setTimeout( myCallback, 5000);

// console.log('Nah log me first!!!');