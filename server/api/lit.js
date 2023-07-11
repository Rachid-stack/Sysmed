/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMLit = mongoose.model('SMLit');

router.route('/').get(function(req, res){
    SMLit.find({del: 0}, function(err, lit){
        if(err){
            console.log(err);
        }
        res.json(lit);
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMLit.find({del: 0, id_chambre: id}, function(err, lit){
        if(err){
            console.log(err);
        }
        res.json(lit);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMLit.findById(id, function(err, lit){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(lit).statusCode=200;
    });
});

router.route('/add').post(function(req, res){
    var lit = new SMLit(req.body);
    lit.del = 0;
    lit.create_by = 0;
    lit.save().then(lit=>{res.json(lit).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMLit.findById(id, function(err, lit){
        if(!lit){
            return next(new Error('lit introuvable!'));
        }else{
            lit.libelle_lit = req.body.libelle_lit;
            lit.desc_lit = req.body.desc_lit;
            lit.code_lit = req.body.code_lit;
            lit.id_chambre = req.body.id_chambre;
            lit.update_by = 0;
            lit.update_date = Date.now();
            lit.save().then(lit=>{res.json(lit).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMLit.findById(id, function(err, lit){
        if(!lit){
            return next(new Error('lit introuvable!'));
        }else{
            lit.del = 1;
            lit.update_by = 0;
            lit.update_date = Date.now();
            lit.save().then(lit=>{res.json(lit).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;