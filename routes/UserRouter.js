const express = require('express');
const multer = require('multer');
const GetUser = require('../DB/connect');
const router = express.Router();
const path = require('node:path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, '../assets');
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});


const upload = multer({ storage: storage });

const fields = [
    { name: 'file', maxCount: 1 },
];

// Create
router.post('/AddUser', upload.fields(fields), async (req, res) => {
    const { username, password, file } = req.body;
    console.log(req.files.file[0].filename);
    console.log({ username, password, file });
    try {
        console.log('User:', GetUser);
        console.log('User.User', GetUser.User)
        const newUser = new GetUser.User({ username, password, file });
        await newUser.save();
        res.send(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Get All
router.get('/GetUsers', async (req, res) => {
    try {
        const user = await GetUser.User.find({});
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Update 
router.put('/UpdateUser/:id', async (req, res) => {
    const { id } = req.params;
    const { username, password, file } = req.body;

    try {
        const updateUser = await GetUser.User.findByIdAndUpdate(id, { username, password, file }, { new: true });
        res.send(updateUser);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Delete 
router.delete('/DelUsers/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const deleteUser = await GetUser.User.findByIdAndDelete(id);
        res.send(deleteUser);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


module.exports = router;