/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMTitre = mongoose.model('SMTitre');

router.route('/').get(function(req, res){
    SMTitre.find({del: 0}, function(err, titre){
        if(err){
            console.log(err);
        }
        res.json(titre);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMTitre.findById(id, function(err, titre){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(titre).statusCode=200;
    });
});

router.route('/add').post(function(req, res){
    var titre = new SMTitre(req.body);
    titre.del = 0;
    titre.create_by = 0;
    titre.save().then(titre=>{res.json(titre).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMTitre.findById(id, function(err, titre){
        if(!titre){
            return next(new Error('type élément introuvable!'));
        }else{
            titre.libelle_titre = req.body.libelle_titre;
            titre.code_titre = req.body.code_titre;
            titre.class_titre = req.body.class_titre;
            titre.update_by = 0;
            titre.update_date = Date.now();
            titre.save().then(titre=>{res.json(titre).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMTitre.findById(id, function(err, titre){
        if(!titre){
            return next(new Error('type élément introuvable!'));
        }else{
            titre.del = 1;
            titre.update_by = 0;
            titre.update_date = Date.now();
            titre.save().then(titre=>{res.json(titre).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;