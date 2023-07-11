/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMService = mongoose.model('SMService');

router.route('/').get(function(req, res){
    SMService.find({del: 0}, function(err, service){
        if(err){
            console.log(err);
        }
        res.json(service);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMService.findById(id, function(err, service){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(service).statusCode=200;
    });
});

router.route('/add').post(function(req, res){
    var service = new SMService(req.body);
    service.del = 0;
    service.create_by = 0;
    service.save().then(service=>{res.json(service).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMService.findById(id, function(err, service){
        if(!service){
            return next(new Error('Service introuvable!'));
        }else{
            service.libelle_service = req.body.libelle_service;
            service.code_service = req.body.code_service;
            service.desc_service = req.body.desc_service;
            service.update_by = 0;
            service.update_date = Date.now();
            service.save().then(service=>{res.json(service).status(201);}).catch(err=>{res.status(404).send('Echec!');});
        }
    });
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMService.findById(id, function(err, service){
        if(!service){
            return next(new Error('Service introuvable!'));
        }else{
            service.del = 1;
            service.update_by = 0;
            service.update_date = Date.now();
            service.save().then(service=>{res.json(service).status(201);}).catch(err=>{res.status(404).send('Echec!');});
        }
    });
});

module.exports = router;