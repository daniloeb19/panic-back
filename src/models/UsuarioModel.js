const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DataSchema = new mongoose.Schema({
  user_name: String,
  user_date : String,
  user_pass: String,
  user_email: String,
  user_cpf: String,
  ment_id: { type: Number, default: 1 },
  user_contato: String,
  user_sexo: String,
  user_desc: String,
}, {
    timestamps: true
});

DataSchema.pre('save', function (next) {
    if (!this.isModified("user_pass")) {
        return next();
    }

    this.user_pass = bcrypt.hashSync(this.user_pass, 10);
    next();

});

DataSchema.pre('findOneAndUpdate', function (next) {
    var password = this.getUpdate().user_pass + '';
    if (password.length < 55) {
        this.getUpdate().user_pass = bcrypt.hashSync(password, 10);
    }
    next();

});

const usuarios = mongoose.model('Usuarios', DataSchema);
module.exports = usuarios;
