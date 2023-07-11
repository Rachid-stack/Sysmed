/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMRdv = mongoose.model('SMRdv');

router.route('/').get(function(req, res){
    SMRdv.find({del: 0}, function(err, rdv){
        if(err){
            console.log(err);
        }
        res.json(rdv);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMRdv.findById(id, function(err, rdv){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(rdv).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMRdv.find({del: 0, id_medecin: id}, function(err, rdv){
        if(err){
            console.log(err);
        }
        res.json(rdv);
    });
});

router.route('/add').post(function(req, res){
    var rdv = new SMRdv(req.body);
    rdv.del = 0;
    rdv.create_by = 0;
    rdv.save().then(rdv=>{res.json(rdv).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;
    SMRdv.findById(id, function(err, rdv){
        if(!rdv){
            return next(new Error('Type rende-vous introuvable!'));
        }else{
            rdv.id_patient = req.body.id_patient;
            rdv.id_medecin = req.body.id_medecin;
            rdv.id_motif = req.body.id_motif;
            rdv.code = req.body.code;
            rdv.commentaire = req.body.commentaire;
            rdv.date_rdv = req.body.date_rdv;
            rdv.heure_rdv = req.body.heure_rdv;
            rdv.update_by = 0;
            rdv.update_date = Date.now();
            rdv.save().then(rdv=>{res.json(rdv).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMRdv.findById(id, function(err, rdv){
        if(!rdv){
            return next(new Error('Type rendez-vous introuvable!'));
        }else{
            rdv.del = 1;
            rdv.update_by = 0;
            rdv.update_date = Date.now();
            rdv.save().then(rdv=>{res.json(rdv).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;