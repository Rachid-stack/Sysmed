/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMTitreSchema = new mongoose.Schema({
    code_titre: String,
    libelle_titre: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMTitreSchema.methods.smtitreDto = function(){
    return {
        id: this._id,
        code_titre: this.code_titre,
        libelle_titre: this.libelle_titre,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMTitre', SMTitreSchema);
