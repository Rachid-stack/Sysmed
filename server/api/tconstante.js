/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMTConstante = mongoose.model('SMTConstante');

router.route('/').get(function(req, res){
    SMTConstante.find({del: 0}, function(err, tconstante){
        if(err){
            console.log(err);
        }
        res.json(tconstante);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMTConstante.findById(id, function(err, tconstante){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(tconstante).statusCode=200;
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMTConstante.find({del: 0, code_tconstante: id}, function(err, tconstante){
        if(err){
            console.log(err);
        }
        res.json(tconstante);
    });
});

router.route('/add').post(function(req, res){
    var tconstante = new SMTConstante(req.body);
    tconstante.del = 0;
    tconstante.create_by = 0;
    tconstante.save().then(tconstante=>{res.json(tconstante).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMTConstante.findById(id, function(err, tconstante){
        if(!tconstante){
            return next(new Error('tconstante introuvable!'));
        }else{
            tconstante.libelle_tconstante = req.body.libelle_tconstante;
            tconstante.code_tconstante = req.body.code_tconstante;
            tconstante.unite_tconstante = req.body.unite_tconstante;
            tconstante.ordre_tconstante = req.body.ordre_tconstante;
            tconstante.update_by = 0;
            tconstante.update_date = Date.now();
            tconstante.save().then(tconstante=>{res.json(tconstante).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMTConstante.findById(id, function(err, tconstante){
        if(!tconstante){
            return next(new Error('tconstante introuvable!'));
        }else{
            tconstante.del = 1;
            tconstante.update_by = 0;
            tconstante.update_date = Date.now();
            tconstante.save().then(tconstante=>{res.json(tconstante).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;