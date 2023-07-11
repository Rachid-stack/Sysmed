/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMConsultation = mongoose.model('SMConsultation');

router.route('/').get(function(req, res){
    SMConsultation.find({del: 0}, function(err, consultation){
        if(err){
            console.log(err);
        }
        res.json(consultation);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMConsultation.findById(id, function(err, consultation){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(consultation).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMConsultation.find({del: 0, id_patient: id}, function(err, consultation){
        if(err){
            console.log(err);
        }
        res.json(consultation);
    });
});

router.route('/add').post(function(req, res){
    var consultation = new SMConsultation(req.body);
    consultation.is_confidential = false;
    consultation.del = 0;
    consultation.create_by = 0;
    consultation.save().then(consultation=>{res.json(consultation).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;
    SMConsultation.findById(id, function(err, consultation){
        if(!consultation){
            return next(new Error('Type rende-vous introuvable!'));
        }else{
            consultation.id_patient = req.body.id_patient;
            consultation.id_specialite = req.body.id_specialite;
            consultation.code_consultation = req.body.code_consultation;
            consultation.libelle_consultation = req.body.libelle_consultation;
            consultation.commentaire_consultation = req.body.commentaire_consultation;
            consultation.resultat_consultation = req.body.resultat_consultation;
            consultation.date_consultation = req.body.date_consultation;
            consultation.update_by = 0;
            consultation.update_date = Date.now();
            consultation.save().then(consultation=>{res.json(consultation).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMConsultation.findById(id, function(err, consultation){
        if(!consultation){
            return next(new Error('Type rendez-vous introuvable!'));
        }else{
            consultation.del = 1;
            consultation.update_by = 0;
            consultation.update_date = Date.now();
            consultation.save().then(consultation=>{res.json(consultation).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;