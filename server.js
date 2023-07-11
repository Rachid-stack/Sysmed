const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var logger = require('morgan');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/sysmed', {useNewUrlParser: true})
    .then(()=>console.log('Connecte avec succes!'))
    .catch((err)=>console.error(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'dist/sysMed')));
app.use('/', express.static(path.join(__dirname, 'dist/sysMed')));

//Models
require('./server/models/SMService');
require('./server/models/SMSpecialite');
require('./server/models/SMUnite');
require('./server/models/SMEquipement');
require('./server/models/SMChambre');
require('./server/models/SMLit');
require('./server/models/SMPathologie');
require('./server/models/SMTRvs');
require('./server/models/SMTConsult');
require('./server/models/SMTExamen');
require('./server/models/SMBMedicament');
require('./server/models/SMBDiagnostique');
require('./server/models/SMPrivilege');
require('./server/models/SMPPrivilege');
require('./server/models/SMUPrivilege');
require('./server/models/SMCEquipement');
require('./server/models/SMProfil');
require('./server/models/SMFPharmaceutique');
require('./server/models/SMVAdministration');
require('./server/models/SMPHLabo');
require('./server/models/SMTElement');
require('./server/models/SMTitre');
require('./server/models/SMPersonne');
require('./server/models/SMMedecin');
require('./server/models/SMInfirmier');
require('./server/models/SMADPersonnel');
require('./server/models/SMUtilisateur');
require('./server/models/SMLicence');
require('./server/models/SMTLicence');
require('./server/models/SMMenu');
require('./server/models/SMSMenu');
require('./server/models/SMRhesus');
require('./server/models/SMGSanguin');
require('./server/models/SMPatient');
require('./server/models/SMCMotif');
require('./server/models/SMMConsultation');
require('./server/models/SMTConstante');
require('./server/models/SMReleve');
require('./server/models/SMConsultation');
require('./server/models/SMOrdonnance');
require('./server/models/SMCTransfert');
require('./server/models/SMRdv');
require('./server/models/SMOLigne');

//API
const api = require('./server/api');
app.use('/api', api);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(function(req, res, next){
    next(createError(404));
});

app.use(function(err, req, res, next){
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'developement' ? err : {};

    res.status(err.status || 500);
    res.send(err.status);
});

module.exports = app;