/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMBMedicament = mongoose.model('SMBMedicament');

router.route('/').get(function(req, res){
    SMBMedicament.find({del: 0}, function(err, bmedicament){
        if(err){
            console.log(err);
        }
        res.json(bmedicament);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMBMedicament.findById(id, function(err, bmedicament){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(bmedicament).statusCode=200;
    });
});

router.route('/add').post(function(req, res){
    var bmedicament = new SMBMedicament(req.body);
    bmedicament.del = 0;
    bmedicament.create_by = 0;
    bmedicament.save().then(bmedicament=>{res.json(bmedicament).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMBMedicament.findById(id, function(err, bmedicament){
        if(!bmedicament){
            return next(new Error('Type rende-vous introuvable!'));
        }else{
            bmedicament.code_med = req.body.code_med;
            bmedicament.nom_comercial = req.body.nom_comercial;
            bmedicament.nom_generique = req.body.nom_generique;
            bmedicament.dosage_med = req.body.dosage_med;
            bmedicament.form_pharma = req.body.form_pharma;
            bmedicament.voie_admin = req.body.voie_admin;
            bmedicament.labo_pharma = req.body.labo_pharma;
            bmedicament.is_generic = req.body.is_generic;
            bmedicament.prix_moyen = req.body.prix_moyen;
            bmedicament.update_by = 0;
            bmedicament.update_date = Date.now();
            bmedicament.save().then(bmedicament=>{res.json(bmedicament).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMBMedicament.findById(id, function(err, bmedicament){
        if(!bmedicament){
            return next(new Error('Type rendez-vous introuvable!'));
        }else{
            bmedicament.del = 1;
            bmedicament.update_by = 0;
            bmedicament.update_date = Date.now();
            bmedicament.save().then(bmedicament=>{res.json(bmedicament).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;