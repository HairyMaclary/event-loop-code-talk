const { sleep } = require("./sleep");

// What came first, the chicken or the egg?

// console.log('🐣 synchronous 1');

// setTimeout(() => console.log('🐔 task queue'), 0);

// Promise.resolve().then(() => {console.log('🥚 micro task queue')});

// console.log('🍗 synchronous 2');

//************************************************************************************ */

Promise.resolve().then(()=> console.log('Micro Task 1')); 

setTimeout(
    () => {
        Promise.resolve().then(()=> console.log('Micro Task 2'));
        Promise.resolve().then(()=> console.log('Micro Task 3'));
        console.log('Log 1');
        console.log('Log 2');
    },
    0
)

console.log('Middle');

setTimeout(
    () => {
        Promise.resolve().then(()=> console.log('Micro Task 4'));
        console.log('Log 3');
    },
    0
)


//************************************************************************************ */

// function firstFunc() {
//     Promise.resolve().then(()=> console.log('Micro Task 1'));
//     console.log('Log 1'); 
// }

// function secondFunc() {
//     Promise.resolve().then(()=> console.log('Micro Task 2'));
//     console.log('Log 2');
// }

// function parentFunc() {
//     firstFunc();
//     secondFunc();
// }

// parentFunc();


//************************************************************************************ */

// Why could this be important? What about an automated test that clicks a button with Javascript?
// That Javascript may still be on the stack so that any microtask has not yet been run.

// const nextClick = new Promise( resolve => {
//     link.addEventListner('click', resolve, {once: true});
// });

// nextClick.then(event => {
//     event.preventDefault();
//     // handle event
// });

// link.click(); // oh no: will not leave the stack until all event handlers have finished. Micro task is blocked


//************************************************************************************ */

// let's re-explore non-blocking code

// const tick = Date.now();
// const log = (value) => console.log(`\n${value} \n Elapsed: ${Date.now() - tick}ms\n`);

// const codeBlocker = () => {
//     let i = 0;
//     while( i < 1000000000) { i++ };
//     console.log('One Billion 💰!')
//     return;
// }

// log('Synchronous 1');
// codeBlocker();
// log('Synchronous 2');



//************************************************************************************ */

// Let's try and wrap this code up in a promise so that we can get the blocking code off the main thread.
// This example shows how we might mess it up.

// const tick = Date.now();
// const log = (value) => console.log(`\n${value} \n Elapsed: ${Date.now() - tick}ms\n`);


// const codeBlocker = () => {

//     return new Promise((resolve, reject) => {

//         let i = 0;
//         while( i < 1000000000) { i++ };
//         console.log('One Billion 💰!');
//         resolve();
//     })
// }

// log('Synchronous 1');
// codeBlocker();
// log('Synchronous 2');



//************************************************************************************ */

// It is only value resolution that happens as a micro task

// const tick = Date.now();
// const log = (value) => console.log(`\n${value} \n Elapsed: ${Date.now() - tick}ms\n`);


// const codeBlocker = () => {
//     return Promise.resolve().then(() => {
//         let i = 0;
//         while( i < 1000000000) { i++ };
//         console.log('One Billion 💰!');
//     })
// }

// log('Synchronous 1');
// codeBlocker();
// log('Synchronous 2');


//************************************************************************************ */

// The async keyword wraps a return value in a promise.
// These two functions are the identical.


// const getFruit = async (name) => {
//     const fruits = {
//         pineapple: '🍍',
//         peach: '🍑',
//         apple: '🍎'
//     }
//     return fruits[name];
// }

// // const getFruit = (name) => {
// //     const fruits = {
// //         pineapple: '🍍',
// //         peach: '🍑',
// //         apple: '🍎'
// //     }
// //     return Promise.resolve(fruits[name]);
// // }

// getFruit('apple').then(fruit => console.log(fruit));


//************************************************************************************ */

// The async keyword also sets up a context for you to use the await keyword.
// Combining await and async allows you to pause execution.
// Here, instead of chaining a number of then callbacks, we will use await

// const tick = Date.now();
// const log = (value) => console.log(`\n${value} \n Elapsed: ${Date.now() - tick}ms\n`);

// log('Start');

// const getFruit = async (name) => {
//     const fruits = {
//         pineapple: '🍍',
//         peach: '🍑',
//         apple: '🍎'
//     }
//     await sleep(1000);

//     return fruits[name];
// }
// const makeSmoothie = async () => {
//     const firstFruit = await getFruit('pineapple');
//     const secondFruit = await getFruit('peach');  // This code is mis-using async/await.

//     return [firstFruit, secondFruit];
// }
// makeSmoothie().then(log);


//************************************************************************************ */

// In the above example the second fruit is not dependant on the first fruit
// The point of the event loop is to prevent blocking code.
// We should be running code concurrently.

// const tick = Date.now();
// const log = (value) => console.log(`\n${value} \n Elapsed: ${Date.now() - tick}ms\n`);

// log('Start');

// const getFruit = async (name) => {
//     const fruits = {
//         pineapple: '🍍',
//         peach: '🍑',
//         apple: '🍎'
//     }

//     await sleep(1000);

//     return fruits[name];
// }

// const makeSmoothie = () => {
//     const firstFruit = getFruit('pineapple');
//     const secondFruit = getFruit('peach');

//     return Promise.all([firstFruit, secondFruit]); // we know async always returns a promise
// }

// makeSmoothie().then(log);



