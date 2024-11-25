const express = require('express');
const multer = require('multer');
const GetUser = require('../DB/connect');
const router = express.Router();
const path = require('node:path');
const jwt = require('jsonwebtoken');

const secret = process.env.secret;
const storage = multer.memoryStorage();


const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit 
    fileFilter: (req, file, cb) => {
        // Allowed file types
        const allowedMimeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type. Only DOC, DOCX, and PDF are allowed.'));
        }

        cb(null, true); // Accept file
    },
});


const fields = [
    { name: 'file', maxCount: 1 },
];

// Create
router.post('/AddUser', upload.fields(fields), async (req, res) => {
    const { username, password } = req.body, file = req.files.file[0];
    console.log({ username, password, file });
    try {
        if (file && username && password) {

            console.log('first check passed')
            const userExist = await GetUser.User.find({ username });
            console.log('userExist:', userExist)
            if (userExist.length === 0) {
                console.log('all checks passed')
                const newUser = new GetUser.User({ username, password, file: file.buffer });
                await newUser.save();
                console.log("New user:", newUser)
                let id = newUser._id;
                res.cookie('username', username);
                res.cookie('token', (await jwt.sign({ id, username }, secret)));
                res.status(200).send('Evething is okay');

            }
            else if (userExist.length !== 0 && userExist[0].password === password) {
                console.log('all checks passed 2')
                let id = userExist[0]._id;
                res.cookie('username', username);
                res.cookie('token', (await jwt.sign({ id, username }, secret)));
                res.status(200);
            }
            else {
                res.status(401).send('Wrong password');
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Get All
router.get('/GetUsers', async (req, res) => {
    try {
        console.log(req.cookies);
        const { token, username } = req.cookies;
        const decoded = await jwt.verify(token, secret);
        if (decoded.username === username) {
            const users = await GetUser.User.find({});
            res.send(users);
        }
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