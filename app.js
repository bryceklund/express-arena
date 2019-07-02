const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));
app.get('/allen', (req, res) => {
    console.log('allen endpoint accessed');
    res.send('<h1 style="color:pink;font-size:100px;">fuck allen allen sucks</h1>');
});

app.get('/burgers', (req, res) => {
    console.log(req);
    res.send('We have juicy burdgjess!');
});
app.get('/pizza/pepperoni', (req, res) => {
    res.send('Your pizza is on the way!');
})
app.get('/pizza/pineapple', (req, res) => {
    res.send('We welcome you here, comrade. Pizza pineapple is delicious.');
});
app.get('/conner', (req, res) => {
    res.send('<h1 style="color:red;font-family:comic-sans;">Conner cool guy</h1>');
});
app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:<br>
        Base URL: ${(req.baseURL) ? req.baseURL : undefined}<br>
        Host: ${req.host}<br>
        Path: ${req.path}<br>
        `;
    res.send(responseText);
});
app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end();
});
app.get('/greetings', (req, res) => {
    const { name, race } = req.query;

    if (!name) {
        return res.status(400).send('Please provide a name');
    }
    if (!race) {
        return res.status(400).send('Please provide a race');
    }

    const greeting = `Greetings, ${name} of race ${race}.  Welcome to my webpage!`;

    res.send(greeting);
});
app.get('/sum', (req, res) => {
    const { a, b } = req.query;
    const sum = parseInt(a) + parseInt(b);

    res.send(`The sum of ${a} and ${b} is ${sum}.`);
});
function shifter(input, shiftAmt) {
    let shifted = [];
    const textArr = input.toUpperCase().split('');
    for (let i = 0; i < textArr.length; i++) {
        let charCode = textArr[i].charCodeAt(0);
        let charCodeShifted = charCode + parseInt(shiftAmt);
        let charShifted = String.fromCharCode(charCodeShifted);
        shifted.push(charShifted);
    }
    const result = shifted.join('');
    return result;
}
app.get('/cipher', (req, res) => {
    const { text, shift } = req.query;
    res.send(shifter(text, shift));
});
app.get('/lotto', (req, res) => {
    const { numbers } = req.query;
    const answer = [Math.floor(Math.random()*20), Math.floor(Math.random()*20), Math.floor(Math.random()*20), Math.floor(Math.random()*20), Math.floor(Math.random()*20), Math.floor(Math.random()*20)]
    let count = 0;
    for (let i = 0; i < numbers.length; i++) {
        if (answer.includes(parseInt(numbers[i]))) {
            count++;
        }
    }
    let response = '';
    if (count < 4) {
        response = `Sorry, you lose. (you only matched ${count} numbers.)`;
    } else if (count === 4) {
        response = '4 numbers matched! You win a free ticket!';
    } else if (count === 5) {
        response = '5 numbers matched! Congrats, you win $100!';
    } else if (count === 6) {
        response = 'Holy moly, you just matched all the numbers and won the M E G A   M I L L I O N S !!!!!';
    };
    res.send(response);
})
app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});