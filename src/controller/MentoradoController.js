const Mentorado = require('../models/MentoradoModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    async index(req, res) {
        const user = await Mentorado.find();
        if (user == null) {
            return res.json({ erro: "Erro" });
        } else {
            return res.json(user);
        }
    },
    async create(req, res) {

        const { name, date, pass, email, cpf, seg, contato, sexo, desc } = req.body;
        let data = {};
        let user = await Mentorado.findOne({ name });
        if (!user) {

            data = { name, date, pass, email, cpf, seg, contato, sexo, desc };
            user = await Mentorado.create(data);

            return res.status(200).json(user);

        } else {
            return res.status(500).json(user);
        }
    },
    async details(req, res) {
        const { _id } = req.params;
        const user = await Mentorado.findOne({ _id });
        if (user == null) {
            return res.json({ erro: "Erro" });
        } else {
            return res.json(user);
        }
    },
    async autenticacao(values) {
        const { email, pass } = values;
        const user = await Mentorado.findOne({ email });
        if (user == null) {
            return false;
            
        } else {
            const checkPass = await bcrypt.compare(pass, user.pass);
            if (checkPass) {
                let token=null;
                try {
                    token = jwt.sign({
                        _id: user._id,
                    },
                        process.env.SECRET,
                    );
                    
                    console.log("Autenticação realizada com sucesso");
                } catch (error) {
                    console.log(`Ocorreu um erro ${error}`);
                }
                return { user, token };
            } else {
                return false;
            }

        }
    },
    async delete(req, res) {
        const { _id } = req.params;
        const user = await Mentorado.findByIdAndDelete({ _id });
        if (user == null) {
            return res.json({ erro: "Erro" });
        } else {
            return res.json(user);
        }
    },

    async update(req, res) {
        const { _id, name, date, pass, email, cpf, seg, contato, sexo, desc } = req.body;
        const data = { name, date, pass, email, cpf, seg, contato, sexo, desc };
        const user = await Mentorado.findOneAndUpdate({ _id }, data, { new: true });
        if (user == null) {
            return res.json({ erro: "Erro" });
        } else {
            return res.json(user);
        }
    }
}