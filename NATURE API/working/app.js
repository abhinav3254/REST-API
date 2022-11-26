const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 4500;

// app.get('/', (req, res) => {
//     // res.status(200).send('Hello from the server side!!');
//     res
//         .status(200)
//         .json({ name: 'Abhinav Jha', message: 'Hello from server side' });
// });

// let start

// read the dev-data/data directory
const dirPath = path.join('C:\\Users\\abhin\\Desktop\\REST-API\\NATURE API\\dev-data');
const tours = JSON.parse(
    fs.readFileSync(`${dirPath}/data/tours-simple.json`)
);

// using the middleware for json in express
app.use(express.json());
// middleware is a function that can simply modify the incoming request

app.get('/api/v1/tours', (req, res) => {
    res
        .status(200)
        .json(
            {
                status: 'success',
                results: tours.length, // --> here calculating the length of the array since our json is in the format of array
                data: {
                    // tours:tours
                    // this upper way is also correct
                    tours
                }
            }
        );
});

// working with the post method

app.post('/api/v1/tours', (req, res) => {
    console.log(req.body);
    // to get this response req.body as in json we used app.use(express.json())
    res.send('Done');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}....`);
});