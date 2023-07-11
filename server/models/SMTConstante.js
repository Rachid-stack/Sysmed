/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMTConstanteSchema = new mongoose.Schema({
    code_tconstante: String,
    libelle_tconstante: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    unite_tconstante: String,
    ordre_tconstante: Number,
    create_date: {type: Date, default: Date.now()},
    create_by: String,
    update_date: Date,
    update_by: String,
    del: Number
}, {timestamps: true});

SMTConstanteSchema.methods.SMTConstanteDto = function(){
    return {
        id: this._id,
        code_tconstante: this.code_tconstante,
        libelle_tconstante: this.libelle_tconstante,
        unite_tconstante: this.unite_tconstante,
        ordre_tconstante: this.ordre_tconstante,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMTConstante', SMTConstanteSchema);
