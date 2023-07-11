/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMEquipementSchema = new mongoose.Schema({
    code_equipement: String,
    libelle_equipement: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    class_equipement: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMEquipementSchema.methods.smequipementDto = function(){
    return {
        id: this._id,
        code_equipement: this.code_equipement,
        libelle_equipement: this.libelle_equipement,
        class_equipement: this.class_equipement,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMEquipement', SMEquipementSchema);
