/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
const router = require('express').Router();
const mongoose = require('mongoose');

const SMTElement = mongoose.model('SMTElement');

router.route('/').get(function(req, res){
    SMTElement.find({del: 0}, function(err, telement){
        if(err){
            console.log(err);
        }
        res.json(telement);
    });
});

router.route('/:id').get(function(req, res){
    var id = req.params.id;
    SMTElement.findById(id, function(err, telement){
        if(err){
            return res.sendStatus(404);
        }
        return res.json(telement).statusCode=200;
    });
});

router.route('/add').post(function(req, res){
    var telement = new SMTElement(req.body);
    telement.del = 0;
    telement.create_by = 0;
    telement.save().then(telement=>{res.json(telement).status(201);}).catch(err=>{res.status(404).send('Echec!');});
});

router.route('/update/:id').post(function(req, res){
    var id = req.params.id;

    SMTElement.findById(id, function(err, telement){
        if(!telement){
            return next(new Error('type élément introuvable!'));
        }else{
            telement.libelle_telement = req.body.libelle_telement;
            telement.code_telement = req.body.code_telement;
            telement.class_telement = req.body.class_telement;
            telement.update_by = 0;
            telement.update_date = Date.now();
            telement.save().then(telement=>{res.json(telement).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

router.route('/delete/:id').post(function(req, res){
    var id = req.params.id;
    SMTElement.findById(id, function(err, telement){
        if(!telement){
            return next(new Error('type élément introuvable!'));
        }else{
            telement.del = 1;
            telement.update_by = 0;
            telement.update_date = Date.now();
            telement.save().then(telement=>{res.json(telement).status(201);}).catch(err=>{res.status(404).send('Echec!');});
}
});
});

module.exports = router;