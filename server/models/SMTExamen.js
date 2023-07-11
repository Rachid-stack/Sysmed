/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMTExamenSchema = new mongoose.Schema({
    id_texamen: Number,
    id_telement: String,
    code_texamen: String,
    libelle_texamen: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    desc_texamen: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMTExamenSchema.methods.SMTExamenDto = function(){
    return {
        id: this._id,
        id_texamen: this.id_texamen,
        id_telement: this.id_telement,
        code_texamen: this.code_texamen,
        libelle_texamen: this.libelle_texamen,
        desc_texamen: this.desc_texamen,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMTExamen', SMTExamenSchema);