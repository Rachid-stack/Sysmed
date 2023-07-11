/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMFPharmaceutique = mongoose.model('SMFPharmaceutique');

router.route('/').get(function(req, res){
    SMFPharmaceutique.find({del: 0}, function(err, fpharmaceutique){
        if(err){
            console.log(err);
        }
        res.json(fpharmaceutique);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMFPharmaceutique.findById(id, function(err, fpharmaceutique){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(fpharmaceutique).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMFPharmaceutique.find({del: 0, id_service: id}, function(err, fpharmaceutique){
        if(err){
            console.log(err);
        }
        res.json(fpharmaceutique);
    });
});

router.route('/add').post(function(req, res){
    var fpharmaceutique = new SMFPharmaceutique(req.body);
    fpharmaceutique.del = 0;
    fpharmaceutique.create_by = 0;
    fpharmaceutique.save().then(fpharmaceutique=>{res.json(fpharmaceutique).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMFPharmaceutique.findById(id, function(err, fpharmaceutique){
        if(!fpharmaceutique){
            return next(new Error('Forme pharmaceutique introuvable!'));
        }else{
            fpharmaceutique.libelle_form_pharm = req.body.libelle_form_pharm;
            fpharmaceutique.code_form_pharm = req.body.code_form_pharm;
            fpharmaceutique.class_form_pharm = req.body.class_form_pharm;
            fpharmaceutique.update_by = 0;
            fpharmaceutique.update_date = Date.now();
            fpharmaceutique.save().then(fpharmaceutique=>{res.json(fpharmaceutique).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMFPharmaceutique.findById(id, function(err, fpharmaceutique){
        if(!fpharmaceutique){
            return next(new Error('forme pharmaceutique introuvable!'));
        }else{
            fpharmaceutique.del = 1;
            fpharmaceutique.update_by = 0;
            fpharmaceutique.update_date = Date.now();
            fpharmaceutique.save().then(fpharmaceutique=>{res.json(fpharmaceutique).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;