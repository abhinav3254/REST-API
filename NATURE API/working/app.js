const express = require('express');

const app = express();
const PORT = 4500;

app.get('/', (req, res) => {
    // res.status(200).send('Hello from the server side!!');
    res
        .status(200)
        .json({ name: 'Abhinav Jha', message: 'Hello from server side' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}....`);
});