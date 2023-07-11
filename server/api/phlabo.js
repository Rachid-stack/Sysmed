/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMPHLabo = mongoose.model('SMPHLabo');

router.route('/').get(function(req, res){
    SMPHLabo.find({del: 0}, function(err, phlabo){
        if(err){
            console.log(err);
        }
        res.json(phlabo);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMPHLabo.findById(id, function(err, phlabo){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(phlabo).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMPHLabo.find({del: 0, id_service: id}, function(err, phlabo){
        if(err){
            console.log(err);
        }
        res.json(phlabo);
    });
});

router.route('/add').post(function(req, res){
    var phlabo = new SMPHLabo(req.body);
    phlabo.del = 0;
    phlabo.create_by = 0;
    phlabo.save().then(phlabo=>{res.json(phlabo).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMPHLabo.findById(id, function(err, phlabo){
        if(!phlabo){
            return next(new Error('Forme pharmaceutique introuvable!'));
        }else{
            phlabo.nom_labo = req.body.nom_labo;
            phlabo.code_labo = req.body.code_labo;
            phlabo.class_labo = req.body.class_labo;
            phlabo.update_by = 0;
            phlabo.update_date = Date.now();
            phlabo.save().then(phlabo=>{res.json(phlabo).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMPHLabo.findById(id, function(err, phlabo){
        if(!phlabo){
            return next(new Error('forme pharmaceutique introuvable!'));
        }else{
            phlabo.del = 1;
            phlabo.update_by = 0;
            phlabo.update_date = Date.now();
            phlabo.save().then(phlabo=>{res.json(phlabo).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;