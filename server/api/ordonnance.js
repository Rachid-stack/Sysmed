/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMOrdonnance = mongoose.model('SMOrdonnance');

router.route('/').get(function(req, res){
    SMOrdonnance.find({del: 0}, function(err, ordonnance){
        if(err){
            console.log(err);
        }
        res.json(ordonnance);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMOrdonnance.findById(id, function(err, ordonnance){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(ordonnance).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMOrdonnance.find({del: 0, id_patient: id}, function(err, ordonnance){
        if(err){
            console.log(err);
        }
        res.json(ordonnance);
    });
});

router.route('/add').post(function(req, res){
    var ordonnance = new SMOrdonnance(req.body);
    ordonnance.del = 0;
    ordonnance.create_by = 0;
    ordonnance.save().then(ordonnance=>{res.json(ordonnance).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;
    SMOrdonnance.findById(id, function(err, ordonnance){
        if(!ordonnance){
            return next(new Error('Type rende-vous introuvable!'));
        }else{
            ordonnance.id_patient = req.body.id_patient;
            ordonnance.id_medecin = req.body.id_medecin;
            ordonnance.code_ordonnance = req.body.code_ordonnance;
            ordonnance.titre = req.body.titre;
            ordonnance.is_confidential = req.body.is_confidential;
            ordonnance.update_by = 0;
            ordonnance.update_date = Date.now();
            ordonnance.save().then(ordonnance=>{res.json(ordonnance).status(201);}).catch(err=>{res.status(404).send('Echec!');});
        }
    });
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMOrdonnance.findById(id, function(err, ordonnance){
        if(!ordonnance){
            return next(new Error('Type rendez-vous introuvable!'));
        }else{
            ordonnance.del = 1;
            ordonnance.update_by = 0;
            ordonnance.update_date = Date.now();
            ordonnance.save().then(ordonnance=>{res.json(ordonnance).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;