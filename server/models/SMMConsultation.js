/**
 * Created by NTS-HP-PC on 23/10/2018.
 */
var mongoose = require('mongoose');

var SMMConsultationSchema = new mongoose.Schema({
    id_consultation: String,
    id_motif: String,
    create_date: {type: Date, default: Date.now()},
    create_by: Number,
    update_date: Date,
    update_by: Number,
    del: Number
}, {timestamps: true});

SMMConsultationSchema.methods.SMMConsultationDto = function(){
    return {
        id: this._id,
        id_consultation: this.id_consultation,
        id_motif: this.id_motif,
        create_date: this.create_date,
        create_by: this.create_by,
        update_date: this.update_date,
        update_by: this.update_by,
        del: this.del
    }
};

mongoose.model('SMMConsultation', SMMConsultationSchema);