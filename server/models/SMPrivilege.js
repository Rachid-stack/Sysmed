/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMPrivilegeSchema = new mongoose.Schema({
    id_privilege: Number,
    code_privilege: String,
    libelle_privilege: { type: String, required: [true, "Le champs libelle est obligatoire !"], index: true},
    desc_privilege: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMPrivilegeSchema.methods.SMPrivilegeDto = function(){
    return {
        id: this._id,
        id_privilege: this.id_privilege,
        code_privilege: this.code_privilege,
        libelle_privilege: this.libelle_privilege,
        desc_privilege: this.desc_privilege,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMPrivilege', SMPrivilegeSchema);