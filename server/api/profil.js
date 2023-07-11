/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMProfil = mongoose.model('SMProfil');

router.route('/').get(function(req, res){
    SMProfil.find({del: 0}, function(err, profil){
        if(err){
            console.log(err);
        }
        res.json(profil);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMProfil.findById(id, function(err, profil){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(profil).statusCode=200;
    });
});

router.route('/add').post(function(req, res){
    var profil = new SMProfil(req.body);
    profil.del = 0;
    profil.create_by = 0;
    profil.save().then(profil=>{res.json(profil).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMProfil.findById(id, function(err, profil){
        if(!profil){
            return next(new Error('Type rende-vous introuvable!'));
        }else{
            profil.code_profile = req.body.code_profile;
            profil.libelle_profile = req.body.libelle_profile;
            profil.desc_profile = req.body.desc_profile;
            profil.update_by = 0;
            profil.update_date = Date.now();
            profil.save().then(profil=>{res.json(profil).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMProfil.findById(id, function(err, profil){
        if(!profil){
            return next(new Error('Type rendez-vous introuvable!'));
        }else{
            profil.del = 1;
            profil.update_by = 0;
            profil.update_date = Date.now();
            profil.save().then(profil=>{res.json(profil).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;