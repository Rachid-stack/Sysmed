/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMCMotif = mongoose.model('SMCMotif');

router.route('/').get(function(req, res){
    SMCMotif.find({del: 0}, function(err, cmotif){
        if(err){
            console.log(err);
        }
        res.json(cmotif);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMCMotif.findById(id, function(err, cmotif){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(cmotif).statusCode=200;
    });
});

router.route('/add').post(function(req, res){
    var cmotif = new SMCMotif(req.body);
    cmotif.del = 0;
    cmotif.create_by = 0;
    cmotif.save().then(cmotif=>{res.json(cmotif).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMCMotif.findById(id, function(err, cmotif){
        if(!cmotif){
            return next(new Error('Type rende-vous introuvable!'));
        }else{
            cmotif.code_cmotif = req.body.code_cmotif;
            cmotif.libelle_cmotif = req.body.libelle_cmotif;
            cmotif.desc_cmotif = req.body.desc_cmotif;
            cmotif.update_by = 0;
            cmotif.update_date = Date.now();
            cmotif.save().then(cmotif=>{res.json(cmotif).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMCMotif.findById(id, function(err, cmotif){
        if(!cmotif){
            return next(new Error('Type rendez-vous introuvable!'));
        }else{
            cmotif.del = 1;
            cmotif.update_by = 0;
            cmotif.update_date = Date.now();
            cmotif.save().then(cmotif=>{res.json(cmotif).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;