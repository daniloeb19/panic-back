const Mentor = require('../controller/MentorController')
const Mentorado = require('../controller/MentoradoController')
const MentorModel = require('../models/MentorModel')
const MentoradoModel = require('../models/MentoradoModel')
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
module.exports = {
    async findUser(req, res) {
        const { email, cpf } = req.body;
        const findMentoradoEmail = await MentoradoModel.findOne({ email });
        const findMentorEmail = await MentorModel.findOne({ email });
        const findMentoradoCpf = await MentoradoModel.findOne({ cpf });
        const findMentorCpf = await MentorModel.findOne({ cpf });
        let userExists = false;
        if (findMentoradoEmail || findMentorEmail || findMentoradoCpf || findMentorCpf) {
            userExists = true;
        }
        return res.send(userExists);

    },
    async authCheck(req, res) {
        const _id = req._id;
        const findMentorado = await Mentorado.details({ _id }, res);
        const findMentor = await Mentor.details({ _id }, res);
        if (findMentorado) {
            // console.log({ findMentorado })
            return res.status(202).json({ ...findMentorado });
        }

        if (findMentor) {
            //console.log({ ...findMentor })
            return res.status(202).json({ ...findMentor });
        }
        return res.status(203).json({ msg: "Acesso Negado" });
    },
    async authLogin(req, res) {
        const email = req.body.email;
        const pass = req.body.pass;
        const findMentorado = await Mentorado.autenticacao({ email, pass });
        const findMentor = await Mentor.autenticacao({ email, pass });
        if (findMentorado) {
            return res.status(202).json({ ...findMentorado });
        }

        if (findMentor) {
            return res.status(202).json({ ...findMentor });
        }
        return res.status(203).json({ msg: "Acesso Negado" });
    },
    async authSenha(req, res) {
        const { email, seg } = req.body;
        const findMentorado = await Mentorado.autenticacaoSenha({ email, seg });
        const findMentor = await Mentor.autenticacaoSenha({ email, seg });

        if (findMentorado) {
            return res.status(202).json({ ...findMentorado });
        }

        if (findMentor) {
            return res.status(202).json({ ...findMentor });
        }
        return res.status(203).json({ msg: "Acesso Negado" });
    },
    async authSenhaLog(req, res) {
        const _id = req.id;
        const senha = req.body.pass;
        const currentPass = req.body.currentPass;
        const findMentor = await Mentor.autenticado({ _id, currentPass }, res);
        const findMentorado = await Mentorado.autenticado({ _id, currentPass }, res);
        if (findMentorado.user) {
            const mentorado = await Mentorado.update({ body: { pass: senha, _id: _id } }, res)
            return mentorado
        }
        if (findMentor.user) {
            const mentor = await Mentor.update({ body: { pass: senha, _id: _id } }, res);
            return mentor
        }
        return res.status(203).json({ msg: "Acesso Negado" });
    }

}