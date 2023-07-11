/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMGSanguin = mongoose.model('SMGSanguin');

router.route('/').get(function(req, res){
    SMGSanguin.find({del: 0}, function(err, gsanguin){
        if(err){
            console.log(err);
        }
        res.json(gsanguin);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMGSanguin.findById(id, function(err, gsanguin){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(gsanguin).statusCode=200;
    });
});

router.route('/add').post(function(req, res){
    var gsanguin = new SMGSanguin(req.body);
    gsanguin.del = 0;
    gsanguin.create_by = 0;
    gsanguin.save().then(gsanguin=>{res.json(gsanguin).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMGSanguin.findById(id, function(err, gsanguin){
        if(!gsanguin){
            return next(new Error('Forme pharmaceutique introuvable!'));
        }else{
            gsanguin.libelle_gs = req.body.libelle_gs;
            gsanguin.code_gs = req.body.code_gs;
            gsanguin.update_by = 0;
            gsanguin.update_date = Date.now();
            gsanguin.save().then(gsanguin=>{res.json(gsanguin).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMGSanguin.findById(id, function(err, gsanguin){
        if(!gsanguin){
            return next(new Error('forme pharmaceutique introuvable!'));
        }else{
            gsanguin.del = 1;
            gsanguin.update_by = 0;
            gsanguin.update_date = Date.now();
            gsanguin.save().then(gsanguin=>{res.json(gsanguin).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;