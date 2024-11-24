const express = require('express');
let GetConnection = require('../DB/connect');

const router = express.Router();

// Create Responce to Vacancy
router.post('/AddResponce', async (req, res) => {
    const { user_id, vacancy_id } = req.body;

    //console.log({ user_id, vacancy_id });
    try {
        if (user_id, vacancy_id) {
            const user = await GetConnection.User.findById(user_id);
            const vacancy = await GetConnection.Vacancy.findById(vacancy_id);
            if (user && vacancy) {
                const connectHappened = await GetConnection.Connection.findOne({ user_id });
                if (!connectHappened) {
                    const newConnection = new GetConnection.Connection({ user_id, vacancy_id });
                    await newConnection.save();
                    res.send(newConnection);
                }
                else {
                    res.status(403).send('U have already sent your rezume');
                }
            }
            else {
                res.status(404).send('User or vacancy are not found');

            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Get All
router.get('/GetInfoByVacancyId', async (req, res) => {
    console.log(req.query);
    const { vacancy_id } = req.query;
    try {
        if (vacancy_id) {
            const responces = await GetConnection.Connection.find({ vacancy_id });
            res.send(responces);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


router.get('/GetInfoByUserId', async (req, res) => {
    console.log(req.query);
    const { user_id } = req.query;
    try {
        if (user_id) {
            const responces = await GetConnection.Connection.find({ user_id });
            res.send(responces);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

module.exports = router;