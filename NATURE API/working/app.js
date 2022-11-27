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
app.use(express.json());  //-> This is a middle ware
// middleware is a function that can simply modify the incoming request

// now creating our own middleware


app.use((req, res, next) => {
    console.log('Hello from the middleware 👋👋');
    // we have to call req and res else we will be stuck
    next();
});
// Hit a request and then
// This will be printed in the terminal

// This middle ware is applied to each and every request





// creating a new middleware

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


app.get('/api/v1/tours', (req, res) => {
    console.log(req.requestTime);
    res
        .status(200)
        .json(
            {
                status: 'success',
                requestedAt: req.requestTime,
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

    // Now note down here we have no database connected right now so we are going to take the last id from the json file which is inside of dev-data and we're going to add 1 to the previous json id.

    // this is the new id which we going to use
    const newID = tours[tours.length - 1].id + 1;

    // This allow us to create new object and merge them
    const newTour = Object.assign({ id: newID }, req.body)

    tours.push(newTour);
    fs.writeFile('C:\\Users\\abhin\\Desktop\\REST-API\\NATURE API\\dev-data', JSON.stringify(tours), err => {
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        });
    });

    // res.send('Done');
    // we can't send two resp to the client
});


// find value using the id

// :id can be replaced by aything :var or :x etc
app.get('/api/v1/tours/:id', (req, res) => {
    console.log(req.params);
    // Note :- Params value is in string  type cast it
    const id = req.params.id * 1;

    // changing the status code to 404 from 200

    if (id > tours.length) {
        return res.status(404).json(
            {
                'status': 'failed',
                'message': 'something went wrong'
            }
        );
    }


    // for middleware 
    /*
    
    Note If we put the middleware here then all the requests or route below it can only access them
    above one can't access them
    
    
    */

    // .find() is a simple js function
    // simply find that value which has a id of :id params.
    const tour = tours.find(el => el.id === id);
    res
        .status(200)
        .json(
            {
                status: "success",
                data: {
                    tour
                }
            }
        )
});

/*

we can do multiple

app.get('/api/v1/tours/:id/:x/:var', (req, res) => {
    console.log(req.params);
    res
        .status(200)
        .json(
            {
                status: "success"
            }
        )
});

*/


// Update data or PATCH Request

app.patch('api/v1/tours/:id', (req, res) => {

    const id = req.params.id * 1;

    // changing the status code to 404 from 200

    if (id > tours.length) {
        return res.status(404).json(
            {
                'status': 'fail',
                'message': 'Invalid ID'
            }
        );
    }


    res
        .status(200)
        .json({
            status: 'success',
            data: {
                tour: '<Updated tour here....>'
            }
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}....`);
});