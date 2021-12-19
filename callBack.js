const myCallback = () => console.log('Lightning squad first!');

// setTimeout is from a WebAPI (i.e. it is executed on another thread)
setTimeout(myCallback, 0);  // sewt timeout is not something the OS does, but is async.

console.log('Nah log me first!!!');