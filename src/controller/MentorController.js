const Mentor = require('../models/MentorModel')

module.exports = {
    async index(req, res) {
        const user = await Mentor.find();
        if (user == null) {
            return res.json({erro:"Erro"});
        } else {
            return res.json(user);
        }
    },
    async create(req, res) {

        const { name,date,sexo,pass,email,area,profissao,cpf,contato,seg } = req.body;
        let data = {};
        let user = await Mentor.findOne({ name });
        if (!user) {

            data = { name,date,sexo,pass,email,area,profissao,cpf,contato,seg };
            user = await Mentor.create(data);

            return res.status(200).json(user);

        } else {
            return res.status(500).json(user);
        }
    },
    async details(req, res) {
        const { _id } = req.params;
        const user = await Mentor.findOne({ _id });
        if (user == null) {
            return res.json({erro:"Erro"});
        } else {
            return res.json(user);
        }
    },
    async pesquisarPorEmail(req, res) {
        const { email } = req.params;
        const user = await Mentor.findOne({ email });
        if (user == null) {
            return res.json({erro:"Erro"});
        } else {
            return res.json(user);
        }
    },
    async delete(req, res) {
        const { _id } = req.params;
        const user = await Mentor.findByIdAndDelete({ _id });
        if (user == null) {
            return res.json({erro:"Erro"});
        } else {
            return res.json(user);
        }
    },

    async update(req, res) {
        const { _id, name,date,sexo,pass,email,area,profissao,cpf,contato,seg} = req.body;
        const data = { name,date,sexo,pass,email,area,profissao,cpf,contato,seg};
        const user = await Mentor.findOneAndUpdate({ _id }, data, { new: true });
        if (user == null) {
            return res.json({erro:"Erro"});
        } else {
            return res.json(user);
        }
    }
}