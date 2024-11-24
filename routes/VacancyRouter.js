const express = require('express');
let GetVacancy = require('../DB/connect');

const router = express.Router();

// Create
router.post('/vacancies', async (req, res) => {
    const { Company, Position, SalaryRange, ApplicationStatus, Note } = req.body;

    console.log({ Company, Position, SalaryRange, ApplicationStatus, Note });
    try {
        const newVacancy = new GetVacancy.Vacancy({ Company, Position, SalaryRange, ApplicationStatus, Note });
        await newVacancy.save();
        res.send(newVacancy);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Get All
router.get('/Vacancies', async (req, res) => {
    try {
        const jobs = await GetVacancy.Vacancy.find({});
        res.send(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Update 
router.put('/Vacancies/:id', async (req, res) => {
    const { id } = req.params;
    const { company, position, salaryRange, status, note } = req.body;

    try {
        const updateVacancy = await GetVacancy.Vacancy.findByIdAndUpdate(id, { company, position, salaryRange, status, note }, { new: true });
        res.send(updateVacancy);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Delete 
router.delete('/Vacancies/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const deleteVacancy = await GetVacancy.Vacancy.findByIdAndDelete(id);
        res.send(deleteVacancy);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


module.exports = router;