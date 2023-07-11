/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMADPersonnel = mongoose.model('SMADPersonnel');

router.route('/').get(function(req, res){
    SMADPersonnel.find({del: 0}, function(err, adpersonnel){
        if(err){
            console.log(err);
        }
        res.json(adpersonnel);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMADPersonnel.findById(id, function(err, adpersonnel){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(adpersonnel).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMADPersonnel.find({del: 0, id_personne: id}, function(err, adpersonnel){
        if(err){
            console.log(err);
        }
        res.json(adpersonnel);
    });
});

router.route('/add').post(function(req, res){
    var adpersonnel = new SMADPersonnel(req.body);
    adpersonnel.del = 0;
    adpersonnel.create_by = 0;
    adpersonnel.save().then(adpersonnel=>{res.json(adpersonnel).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMADPersonnel.findById(id, function(err, adpersonnel){
        if(!adpersonnel){
            return next(new Error('Type rende-vous introuvable!'));
        }else{
            adpersonnel.id_personne = req.body.id_personne;
            adpersonnel.id_titre = req.body.id_titre;
            adpersonnel.id_service = req.body.id_service;
            adpersonnel.num_matricule = req.body.num_matricule;
            adpersonnel.update_by = 0;
            adpersonnel.update_date = Date.now();
            adpersonnel.save().then(adpersonnel=>{res.json(adpersonnel).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMADPersonnel.findById(id, function(err, adpersonnel){
        if(!adpersonnel){
            return next(new Error('Type rendez-vous introuvable!'));
        }else{
            adpersonnel.del = 1;
            adpersonnel.update_by = 0;
            adpersonnel.update_date = Date.now();
            adpersonnel.save().then(adpersonnel=>{res.json(adpersonnel).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;