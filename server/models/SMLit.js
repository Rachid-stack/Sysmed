/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMLitSchema = new mongoose.Schema({
    id_lit: Number,
    id_chambre: String,
    code_lit: String,
    libelle_lit: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    desc_lit: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMLitSchema.methods.smlitDto = function(){
    return {
        id: this._id,
        id_lit: this.id_lit,
        id_chambre: this.id_chambre,
        code_lit: this.code_lit,
        libelle_lit: this.libelle_lit,
        desc_lit: this.desc_lit,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMLit', SMLitSchema);
