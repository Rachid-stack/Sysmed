/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMTElementSchema = new mongoose.Schema({
    code_telement: String,
    libelle_telement: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMTElementSchema.methods.SMTElementDto = function(){
    return {
        id: this._id,
        code_telement: this.code_telement,
        libelle_telement: this.libelle_telement,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMTElement', SMTElementSchema);
