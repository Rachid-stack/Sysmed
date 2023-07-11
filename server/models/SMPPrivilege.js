/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMPPrivilegeSchema = new mongoose.Schema({
    id_profile: String,
    id_privilege: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMPPrivilegeSchema.methods.SMPPrivilegeDto = function(){
    return {
        id: this._id,
        id_privilege: this.id_privilege,
        id_profile: this.id_profile,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMPPrivilege', SMPPrivilegeSchema);