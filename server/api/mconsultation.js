/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMMConsultation = mongoose.model('SMMConsultation');

router.route('/').get(function(req, res){
    SMMConsultation.find({del: 0}, function(err, mconsultation){
        if(err){
            console.log(err);
        }
        res.json(mconsultation);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMMConsultation.findById(id, function(err, mconsultation){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(mconsultation).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMMConsultation.find({del: 0, id_consultation: id}, function(err, mconsultation){
        if(err){
            console.log(err);
        }
        res.json(mconsultation);
    });
});

router.route('/where/:consultation/:motif').get(function(req, res){
    var consultation = req.params.consultation;
    var motif = req.params.motif;
    SMMConsultation.find({del: 0, id_consultation: consultation, id_motif: motif}, function(err, mconsultation){
        if(err){
            console.log(err);
        }
        res.json(mconsultation);
    });
});

router.route('/add').post(function(req, res){
    var mconsultation = new SMMConsultation(req.body);
    mconsultation.del = 0;
    mconsultation.create_by = 0;
    mconsultation.save().then(mconsultation=>{res.json(mconsultation).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMMConsultation.findById(id, function(err, mconsultation){
        if(!mconsultation){
            return next(new Error('Type rende-vous introuvable!'));
        }else{
            mconsultation.id_consultation = req.body.id_consultation;
            mconsultation.id_motif = req.body.id_motif;
            mconsultation.update_by = 0;
            mconsultation.update_date = Date.now();
            mconsultation.save().then(mconsultation=>{res.json(mconsultation).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMMConsultation.findById(id, function(err, mconsultation){
        if(!mconsultation){
            return next(new Error('Type rendez-vous introuvable!'));
        }else{
            mconsultation.del = 1;
            mconsultation.update_by = 0;
            mconsultation.update_date = Date.now();
            mconsultation.save().then(mconsultation=>{res.json(mconsultation).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;