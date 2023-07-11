/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMMedecin = mongoose.model('SMMedecin');

router.route('/').get(function(req, res){
    SMMedecin.find({del: 0}, function(err, medecin){
        if(err){
            console.log(err);
        }
        res.json(medecin);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMMedecin.findById(id, function(err, medecin){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(medecin).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMMedecin.find({del: 0, id_personne: id}, function(err, medecin){
        if(err){
            console.log(err);
        }
        res.json(medecin);
    });
});

router.route('/add').post(function(req, res){
    var medecin = new SMMedecin(req.body);
    medecin.del = 0;
    medecin.create_by = 0;
    medecin.save().then(medecin=>{res.json(medecin).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMMedecin.findById(id, function(err, medecin){
        if(!medecin){
            return next(new Error('Type rende-vous introuvable!'));
        }else{
            medecin.id_personne = req.body.id_personne;
            medecin.id_specialite = req.body.id_specialite;
            medecin.id_service = req.body.id_service;
            medecin.id_titre = req.body.id_titre;
            medecin.code_med = req.body.code_med;
            medecin.update_by = 0;
            medecin.update_date = Date.now();
            medecin.save().then(medecin=>{res.json(medecin).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMMedecin.findById(id, function(err, medecin){
        if(!medecin){
            return next(new Error('Type rendez-vous introuvable!'));
        }else{
            medecin.del = 1;
            medecin.update_by = 0;
            medecin.update_date = Date.now();
            medecin.save().then(medecin=>{res.json(medecin).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;