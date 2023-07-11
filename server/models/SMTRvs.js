/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMTRvsSchema = new mongoose.Schema({
    id_trvs: Number,
    code_trvs: String,
    libelle_trvs: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    desc_trvs: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMTRvsSchema.methods.smtrvsDto = function(){
    return {
        id: this._id,
        id_trvs: this.id_trvs,
        code_trvs: this.code_trvs,
        libelle_trvs: this.libelle_trvs,
        desc_trvs: this.desc_trvs,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMTRvs', SMTRvsSchema);