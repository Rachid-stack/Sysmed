/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMSpecialiteSchema = new mongoose.Schema({
    id_spe: Number,
    code_spe: String,
    libelle_spe: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    desc_spe: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMSpecialiteSchema.methods.smspecialiteDto = function(){
    return {
        id: this._id,
        id_spe: this.id_spe,
        code_spe: this.code_spe,
        libelle_spe: this.libelle_spe,
        desc_spe: this.desc_spe,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMSpecialite', SMSpecialiteSchema);
