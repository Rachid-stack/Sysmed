/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMTConsultSchema = new mongoose.Schema({
    id_tconsult: Number,
    code_tconsult: String,
    libelle_tconsult: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    desc_tconsult: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMTConsultSchema.methods.smtconsultDto = function(){
    return {
        id: this._id,
        id_tconsult: this.id_tconsult,
        code_tconsult: this.code_tconsult,
        libelle_tconsult: this.libelle_tconsult,
        desc_tconsult: this.desc_tconsult,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMTConsult', SMTConsultSchema);