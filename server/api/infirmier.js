/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMInfirmier = mongoose.model('SMInfirmier');

router.route('/').get(function(req, res){
    SMInfirmier.find({del: 0}, function(err, infirmier){
        if(err){
            console.log(err);
        }
        res.json(infirmier);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMInfirmier.findById(id, function(err, infirmier){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(infirmier).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMInfirmier.find({del: 0, id_personne: id}, function(err, infirmier){
        if(err){
            console.log(err);
        }
        res.json(infirmier);
    });
});

router.route('/add').post(function(req, res){
    var infirmier = new SMInfirmier(req.body);
    infirmier.del = 0;
    infirmier.create_by = 0;
    infirmier.save().then(infirmier=>{res.json(infirmier).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMInfirmier.findById(id, function(err, infirmier){
        if(!infirmier){
            return next(new Error('Type rende-vous introuvable!'));
        }else{
            infirmier.id_personne = req.body.id_personne;
            infirmier.id_service = req.body.id_service;
            infirmier.id_titre = req.body.id_titre;
            infirmier.code_inf = req.body.code_inf;
            infirmier.update_by = 0;
            infirmier.update_date = Date.now();
            infirmier.save().then(infirmier=>{res.json(infirmier).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMInfirmier.findById(id, function(err, infirmier){
        if(!infirmier){
            return next(new Error('Type rendez-vous introuvable!'));
        }else{
            infirmier.del = 1;
            infirmier.update_by = 0;
            infirmier.update_date = Date.now();
            infirmier.save().then(infirmier=>{res.json(infirmier).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;