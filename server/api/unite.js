/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMUnite = mongoose.model('SMUnite');

router.route('/').get(function(req, res){
    SMUnite.find({del: 0}, function(err, unite){
        if(err){
            console.log(err);
        }
        res.json(unite);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMUnite.findById(id, function(err, unite){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(unite).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMUnite.find({del: 0, id_service: id}, function(err, unite){
        if(err){
            console.log(err);
        }
        res.json(unite);
    });
});

router.route('/add').post(function(req, res){
    var unite = new SMUnite(req.body);
    unite.del = 0;
    unite.create_by = 0;
    unite.save().then(unite=>{res.json(unite).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMUnite.findById(id, function(err, unite){
        if(!unite){
            return next(new Error('unite introuvable!'));
        }else{
            unite.libelle_unite = req.body.libelle_unite;
            unite.id_service = req.body.id_service;
            unite.code_unite = req.body.code_unite;
            unite.desc_unite = req.body.desc_unite;
            unite.update_by = 0;
            unite.update_date = Date.now();
            unite.save().then(unite=>{res.json(unite).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMUnite.findById(id, function(err, unite){
        if(!unite){
            return next(new Error('unite introuvable!'));
        }else{
            unite.del = 1;
            unite.update_by = 0;
            unite.update_date = Date.now();
            unite.save().then(unite=>{res.json(unite).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;