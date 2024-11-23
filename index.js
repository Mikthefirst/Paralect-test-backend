require('dotenv').config()
const express = require('express'), app = express();

const db = require('./DB/connect');
const routesVacancies = require('./routes/VacancyRouter')
const routesUsers = require('./routes/UserRouter')

//constants
const port = process.env.PORT || 8080;


//
//Middleware
//
app.use(express.json());



//routes
app.use('/app', routesVacancies);
app.use('/app', routesUsers);

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})
