const Mentor = require('../models/MentorModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    async index(req, res) {
        const user = await Mentor.find();
        if (user == null) {
            return res.json({ erro: "Erro" });
        } else {
            return res.json(user);
        }
    },
    async create(req, res) {

        const { name, date, sexo, pass, email, area, profissao, cpf, contato, seg, tipo, desc } = req.body;
        let data = {};
        let user = await Mentor.findOne({ email });
        if (!user) {

            data = { name, date, sexo, pass, email, area, profissao, cpf, contato, seg, tipo, desc };
            user = await Mentor.create(data);

            return res.status(201).json(user);

        } else {
            return res.status(500).json(user);
        }
    },
    async details(req, res) {
        const { _id } = req;
        const user = await Mentor.findOne({ _id });
        if (user == null) {
            return false;
        } else {
            return { user };
        }
    },

    async detailsId(req, res) {
        const { _id } = req.params;
        const user = await Mentor.findOne({ _id });
        if (user == null) {
            return res.json({ erro: "Erro" });
        } else {
            return res.json(user);
        }
    },
    async autenticacao(req) {
        const { email, pass } = req;
        const user = await Mentor.findOne({ email });
        if (user == null) {
            return false;

        } else {
            const checkPass = await bcrypt.compare(pass, user.pass);
            if (checkPass) {
                let token = null;
                try {
                    token = jwt.sign({
                        _id: user._id,
                        name: user.name,
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
    }, async autenticacaoSenha(req) {
        const { email, seg } = req;
        const user = await Mentor.findOne({ email });
        if (user == null) {
            return false;

        } else {
            return false;
        }


    },
    async delete(req, res) {
        const { _id } = req;
        const user = await Mentor.findByIdAndDelete({ _id });
        if (user == null) {
            return res.status(203).json({ erro: "Erro" });
        } else {
            return res.status(202).json(user);
        }
    },
    // async update(req, res) {
    //     const { _id, name, date, sexo, pass, email, area, profissao, cpf, contato, seg, tipo, desc } = req.body;
    //     const data = { name, date, sexo, pass, email, area, profissao, cpf, contato, seg, tipo, desc };
    //     const user = await Mentor.findOneAndUpdate({ _id }, data, { new: true });
    //     if (user == null) {
    //         return res.json({ erro: "Erro" });
    //     } else {
    //         return res.status(202).json(user);
    //     }
    // },
    async update(req, res) {
        const { _id, pass } = req.body;
        const user = await Mentor.findOneAndUpdate({ _id: _id }, { pass: pass }, { new: true });
        if (user == null) {
            return { erro: "Erro" };
        } else {
            return res.status(202).json(user);
        }
    },
    async updateData(req, res) {
        const { _id, name, date, sexo, area, profissao, contato, seg, desc } = req.body;
        const data = { name, date, sexo, area, profissao, contato, seg, desc };
        const user = await Mentor.updateOne({ _id }, data, { new: true });
        if (user == null) {
            return res.json({ erro: "Erro" });
        } else {
            return res.json(user);
        }
    }, async autenticado(req, res) {
        const { _id, currentPass } = req;
        const user = await Mentor.findOne({ _id });
        if (user == null) {
            return { statusCode: 404 };
        } else {
            const checkPass = await bcrypt.compare(currentPass, user.pass);
            if (checkPass) {
                return { statusCode: 202, user };
            } else {
                return { statusCode: 203 };
            }

        }
    },
}