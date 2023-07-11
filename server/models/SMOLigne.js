/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMOLigneSchema = new mongoose.Schema({
    id_ordonnance: String,
    medicament: String,
    quantite: Number,
    posologies: String,
    create_date: {type: Date, default: Date.now()},
    create_by: String,
    update_date: Date,
    update_by: String,
    del: Number
}, {timestamps: true});

SMOLigneSchema.methods.SMOLigneDto = function(){
    return {
        id: this._id,
        id_ordonnance: this.id_ordonnance,
        medicament: this.medicament,
        quantite: this.quantite,
        posologies: this.posologies,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMOLigne', SMOLigneSchema);