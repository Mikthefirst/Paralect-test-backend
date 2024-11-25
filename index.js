require('dotenv').config()
const express = require('express'), app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')

const db = require('./DB/connect');
const routesVacancies = require('./routes/VacancyRouter');
const routesUsers = require('./routes/UserRouter');
const routesUserVacancy = require('./routes/UserVacancyRouter')
//constants
const port = process.env.PORT || 8080;


const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your client URL credentials: true // Allow credentials (cookies, authorization headers, etc.) };
    credentials: true
}

//
//Middleware
//
app.use(express.json());
app.use(cors(corsOptions))
app.use(cookieParser())

//routes
app.use('/app', routesVacancies);
app.use('/app', routesUsers);
app.use('/app', routesUserVacancy)

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})
