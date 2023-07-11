/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMTLicence = mongoose.model('SMTLicence');

router.route('/').get(function(req, res){
    SMTLicence.find({del: 0}, function(err, tlicence){
        if(err){
            console.log(err);
        }
        res.json(tlicence);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMTLicence.findById(id, function(err, tlicence){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(tlicence).statusCode=200;
    });
});

router.route('/add').post(function(req, res){
    var tlicence = new SMTLicence(req.body);
    tlicence.del = 0;
    tlicence.create_by = 0;
    tlicence.save().then(tlicence=>{res.json(tlicence).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMTLicence.findById(id, function(err, tlicence){
        if(!tlicence){
            return next(new Error('type élément introuvable!'));
        }else{
            tlicence.libelle_tlicence = req.body.libelle_tlicence;
            tlicence.code_tlicence = req.body.code_tlicence;
            tlicence.update_by = 0;
            tlicence.update_date = Date.now();
            tlicence.save().then(tlicence=>{res.json(tlicence).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMTLicence.findById(id, function(err, tlicence){
        if(!tlicence){
            return next(new Error('type élément introuvable!'));
        }else{
            tlicence.del = 1;
            tlicence.update_by = 0;
            tlicence.update_date = Date.now();
            tlicence.save().then(tlicence=>{res.json(tlicence).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;