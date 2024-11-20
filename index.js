require('dotenv').config()
const express = require('express'), app = express();

const db = require('./DB/connect');
const routes = require('./routes/CrudRoute')

//constants
const port = process.env.PORT || 3000;


//
//Middleware
//
//app.use(bodyParser);
app.use(express.json());



//routes
app.use('/app', routes);


app.listen(3000, () => {
    console.log(`server listening on port ${port}`);
})
