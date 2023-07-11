/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMRhesus = mongoose.model('SMRhesus');

router.route('/').get(function(req, res){
    SMRhesus.find({del: 0}, function(err, rhesus){
        if(err){
            console.log(err);
        }
        res.json(rhesus);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMRhesus.findById(id, function(err, rhesus){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(rhesus).statusCode=200;
    });
});

router.route('/add').post(function(req, res){
    var rhesus = new SMRhesus(req.body);
    rhesus.del = 0;
    rhesus.create_by = 0;
    rhesus.save().then(rhesus=>{res.json(rhesus).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMRhesus.findById(id, function(err, rhesus){
        if(!rhesus){
            return next(new Error('Forme pharmaceutique introuvable!'));
        }else{
            rhesus.libelle_rh = req.body.libelle_rh;
            rhesus.code_rh = req.body.code_rh;
            rhesus.update_by = 0;
            rhesus.update_date = Date.now();
            rhesus.save().then(rhesus=>{res.json(rhesus).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMRhesus.findById(id, function(err, rhesus){
        if(!rhesus){
            return next(new Error('forme pharmaceutique introuvable!'));
        }else{
            rhesus.del = 1;
            rhesus.update_by = 0;
            rhesus.update_date = Date.now();
            rhesus.save().then(rhesus=>{res.json(rhesus).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;