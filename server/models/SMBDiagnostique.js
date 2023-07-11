/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMBDiagnostiqueSchema = new mongoose.Schema({
    id_diagnostique: Number,
    code_diagnostique: String,
    libelle_diagnostique: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    desc_diagnostique: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMBDiagnostiqueSchema.methods.smbdiagnostiqueDto = function(){
    return {
        id: this._id,
        id_diagnostique: this.id_diagnostique,
        code_diagnostique: this.code_diagnostique,
        libelle_diagnostique: this.libelle_diagnostique,
        desc_diagnostique: this.desc_diagnostique,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMBDiagnostique', SMBDiagnostiqueSchema);