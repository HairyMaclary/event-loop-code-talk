const fs = require('fs');

for (let i = 0; i < 5; ++i) {
	fs.readFile(`stuff${i}.txt`, (_, data) => {
		console.log(data.toString());
	})
}

// Anyone want to guess the order?