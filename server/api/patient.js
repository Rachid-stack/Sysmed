/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMPatient = mongoose.model('SMPatient');

router.route('/').get(function(req, res){
    SMPatient.find({del: 0}, function(err, patient){
        if(err){
            console.log(err);
        }
        res.json(patient);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMPatient.findById(id, function(err, patient){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(patient).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMPatient.find({del: 0, id_personne: id}, function(err, patient){
        if(err){
            console.log(err);
        }
        res.json(patient);
    });
});

router.route('/add').post(function(req, res){
    var patient = new SMPatient(req.body);
    patient.del = 0;
    patient.create_by = 0;
    patient.save().then(patient=>{res.json(patient).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMPatient.findById(id, function(err, patient){
        if(!patient){
            return next(new Error('Type rende-vous introuvable!'));
        }else{
            patient.id_personne = req.body.id_personne;
            patient.id_rhesus = req.body.id_rhesus;
            patient.id_gsanguin = req.body.id_gsanguin;
            patient.profession = req.body.profession;
            patient.signe_particulier = req.body.signe_particulier;
            patient.code_patient = req.body.code_patient;
            patient.num_as_ss = req.body.num_as_ss;
            patient.commentaire = req.body.commentaire;
            patient.update_by = 0;
            patient.update_date = Date.now();
            patient.save().then(patient=>{res.json(patient).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMPatient.findById(id, function(err, patient){
        if(!patient){
            return next(new Error('Type rendez-vous introuvable!'));
        }else{
            patient.del = 1;
            patient.update_by = 0;
            patient.update_date = Date.now();
            patient.save().then(patient=>{res.json(patient).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;