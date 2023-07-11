/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMVAdministrationSchema = new mongoose.Schema({
    code_voie_admin: String,
    libelle_voie_admin: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMVAdministrationSchema.methods.SMVAdministrationDto = function(){
    return {
        id: this._id,
        code_voie_admin: this.code_voie_admin,
        libelle_voie_admin: this.libelle_voie_admin,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMVAdministration', SMVAdministrationSchema);
