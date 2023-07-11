/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMGSanguinSchema = new mongoose.Schema({
    code_gs: String,
    libelle_gs: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMGSanguinSchema.methods.SMGSanguinDto = function(){
    return {
        id: this._id,
        code_gs: this.code_gs,
        libelle_gs: this.libelle_gs,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMGSanguin', SMGSanguinSchema);
