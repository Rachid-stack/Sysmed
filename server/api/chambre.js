/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMChambre = mongoose.model('SMChambre');

router.route('/').get(function(req, res){
    SMChambre.find({del: 0}, function(err, chambre){
        if(err){
            console.log(err);
        }
        res.json(chambre);
    });
});

router.route('/where/:id').get(function(req, res){
    var id = req.params.id;
    SMChambre.find({del: 0, id_unite: id}, function(err, chambre){
        if(err){
            console.log(err);
        }
        res.json(chambre);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMChambre.findById(id, function(err, chambre){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(chambre).statusCode=200;
    });
});

router.route('/add').post(function(req, res){
    var chambre = new SMChambre(req.body);
    chambre.del = 0;
    chambre.create_by = 0;
    chambre.save().then(chambre=>{res.json(chambre).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMChambre.findById(id, function(err, chambre){
        if(!chambre){
            return next(new Error('chambre introuvable!'));
        }else{
            chambre.id_unite = req.body.id_unite;
            chambre.libelle_chambre = req.body.libelle_chambre;
            chambre.desc_chambre = req.body.desc_chambre;
            chambre.code_chambre = req.body.code_chambre;
            chambre.update_by = 0;
            chambre.update_date = Date.now();
            chambre.save().then(chambre=>{res.json(chambre).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMChambre.findById(id, function(err, chambre){
        if(!chambre){
            return next(new Error('chambre introuvable!'));
        }else{
            chambre.del = 1;
            chambre.update_by = 0;
            chambre.update_date = Date.now();
            chambre.save().then(chambre=>{res.json(chambre).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;