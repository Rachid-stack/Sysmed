/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMOLigne = mongoose.model('SMOLigne');

router.route('/').get(function(req, res){
    SMOLigne.find({del: 0}, function(err, oligne){
        if(err){
            console.log(err);
        }
        res.json(oligne);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMOLigne.findById(id, function(err, oligne){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(oligne).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMOLigne.find({del: 0, id_ordonnance: id}, function(err, oligne){
        if(err){
            console.log(err);
        }
        res.json(oligne);
    });
});

router.route('/add').post(function(req, res){
    var oligne = new SMOLigne(req.body);
    oligne.del = 0;
    oligne.create_by = 0;
    oligne.save().then(oligne=>{res.json(oligne).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;
    SMOLigne.findById(id, function(err, oligne){
        if(!oligne){
            return next(new Error('Type rende-vous introuvable!'));
        }else{
            oligne.id_ordonnance = req.body.id_ordonnance;
            oligne.medicament = req.body.medicament;
            oligne.quantite = req.body.quantite;
            oligne.posologie = req.body.posologie;
            oligne.update_by = 0;
            oligne.update_date = Date.now();
            oligne.save().then(oligne=>{res.json(oligne).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMOLigne.findById(id, function(err, oligne){
        if(!oligne){
            return next(new Error('Type rendez-vous introuvable!'));
        }else{
            oligne.del = 1;
            oligne.update_by = 0;
            oligne.update_date = Date.now();
            oligne.save().then(oligne=>{res.json(oligne).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;