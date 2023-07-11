/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMTLicenceSchema = new mongoose.Schema({
    code_tlicence: String,
    libelle_tlicence: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMTLicenceSchema.methods.SMTLicenceDto = function(){
    return {
        id: this._id,
        code_tlicence: this.code_tlicence,
        libelle_tlicence: this.libelle_tlicence,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMTLicence', SMTLicenceSchema);
