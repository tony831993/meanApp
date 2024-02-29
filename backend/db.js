const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const employeeRouter = require('./routes/employee');

const connectToMongo = () => {
    mongoose.connect('mongodb://localhost:27017/meanDB?directConnection=true&readPreference=primary').then(() => {
        const port = 8000;
        
        const app = express();
        app.use(cors());
        app.use(bodyParser.json());

        // Available routes
        app.use('/api/v1/employees', employeeRouter);

        app.listen(port, () => {
            console.log(`meanApp Backend app listening on port http://localhost:${port}/`);
        });
    }).catch((error) => {
        console.log('Error while connecting to MongoDB: ', error);
    });
}

module.exports = connectToMongo;