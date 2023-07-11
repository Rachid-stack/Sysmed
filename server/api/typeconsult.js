/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMTConsult = mongoose.model('SMTConsult');

router.route('/').get(function(req, res){
    SMTConsult.find({del: 0}, function(err, tconsult){
        if(err){
            console.log(err);
        }
        res.json(tconsult);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMTConsult.findById(id, function(err, tconsult){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(tconsult).statusCode=200;
    });
});

router.route('/add').post(function(req, res){
    var tconsult = new SMTConsult(req.body);
    tconsult.del = 0;
    tconsult.create_by = 0;
    tconsult.save().then(tconsult=>{res.json(tconsult).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMTConsult.findById(id, function(err, tconsult){
        if(!tconsult){
            return next(new Error('Type rende-vous introuvable!'));
        }else{
            tconsult.libelle_tconsult = req.body.libelle_tconsult;
            tconsult.desc_tconsult = req.body.desc_tconsult;
            tconsult.code_tconsult = req.body.code_tconsult;
            tconsult.update_by = 0;
            tconsult.update_date = Date.now();
            tconsult.save().then(tconsult=>{res.json(tconsult).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMTConsult.findById(id, function(err, tconsult){
        if(!tconsult){
            return next(new Error('Type rendez-vous introuvable!'));
        }else{
            tconsult.del = 1;
            tconsult.update_by = 0;
            tconsult.update_date = Date.now();
            tconsult.save().then(tconsult=>{res.json(tconsult).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;