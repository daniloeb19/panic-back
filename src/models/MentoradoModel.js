const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DataSchema = new mongoose.Schema({
  mentorado_name: String,
  mentorado_date : String,
  mentorado_sexo: String,
  mentorado_pass: String,
  mentorado_email: String,
  mentorado_cpf: String,
  mentorado_contato: String,
  mentorado_desc: {type: String, default:""},
  mentorado_seg: String, 
}, {
    timestamps: true
});

DataSchema.pre('save', function (next) {
    if (!this.isModified("mentorado_pass")) {
        return next();
    }

    this.mentorado_pass = bcrypt.hashSync(this.mentorado_pass, 10);
    next();

});

DataSchema.pre('findOneAndUpdate', function (next) {
    var password = this.getUpdate().mentorado_pass + '';
    if (password.length < 55) {
        this.getUpdate().mentorado_pass = bcrypt.hashSync(password, 10);
    }
    next();

});

const mentorado = mongoose.model('Mentorado', DataSchema);
module.exports = mentorado;
