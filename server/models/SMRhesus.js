/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMRhesusSchema = new mongoose.Schema({
    code_rh: String,
    libelle_rh: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMRhesusSchema.methods.SMRhesusDto = function(){
    return {
        id: this._id,
        code_rh: this.code_rh,
        libelle_rh: this.libelle_rh,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMRhesus', SMRhesusSchema);
