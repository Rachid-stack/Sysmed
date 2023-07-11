const express = require('express');
const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const DIR = './src/assets/uploads';
var store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});


var upload = multer({ storage: store });

router.post('/upload', upload.single('file'), function (req, res) {
    if (!req.file) {
        console.log({ error: 'Fichier non envoyé!' });
        return res.status(501).json({ error: 'Fichier non envoyé!' });
    }
    console.log({ originalname: req.file.originalname, uploadname: req.file.filename });
    return res.json({ originalname: req.file.originalname, uploadname: req.file.filename });
});


router.route('/download').post(function (req, res, next) {
    filepath = path.join(__dirname, '../uploads') + '/' + req.body.filename;
    res.sendFile(filepath);
});

module.exports = router;