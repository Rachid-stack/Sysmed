/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMChambreSchema = new mongoose.Schema({
    id_chambre: Number,
    id_unite: String,
    code_chambre: String,
    libelle_chambre: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    desc_chambre: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMChambreSchema.methods.smchambreDto = function(){
    return {
        id: this._id,
        id_chambre: this.id_chambre,
        id_unite: this.id_unite,
        code_chambre: this.code_chambre,
        libelle_chambre: this.libelle_chambre,
        desc_chambre: this.desc_chambre,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMChambre', SMChambreSchema);
