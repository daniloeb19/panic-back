const express = require('express');
const router = express.Router();

const Mentorado = require('./controller/MentoradoController');
const Mentor = require('./controller/MentorController');
const Auth = require('./controller/AuthController');
const Mentoria = require('./controller/MentoriaController');
const checkToken = require('./middlewares/Jwt');

//Teste para o deploy

router.get("/", (req, res)=>{
    res.status(200).json({msg: "Servidor Diz: Tudo certo por aqui!"})
});

//rotas de autenticação
router.post('/auth/login', Auth.authLogin);
router.post('/auth/find', Auth.findUser);
router.post('/auth/senha',async (req,res)=>{
    let retorno = await Auth.authSenha(req,res);
    return retorno;
});
router.post('/auth/senha-log', checkToken, Auth.authSenhaLog);
router.get('/auth/check', checkToken, async (req, res) => {
    const retorno = await Auth.authCheck({ _id: req.id }, res);
    return retorno;
});
router.get('/api/return/name', checkToken, async (req, res) => {
    return res.status(202).json({ name: req.name });
})
//rotas de mentoria
router.post('/api/mentoria', checkToken, async (req, res) => {
    const retorno = await Mentorado.details({ _id: req.id });
    const retornoForFront = await Mentoria.create({ _id_mentorado: req.id, _id_mentor: req.body._id_mentor, nome_mentorado: retorno.user.name, contato_mentorado: retorno.user.contato, email_mentorado: retorno.user.email }, res)
    return retornoForFront;

});

router.get('/api/mentoria', checkToken, async (req, res) => {
    const retorno = await Mentoria.mostrarConexoesMentor({ _id_mentor: req.id }, res);
    return retorno;
});

router.put('/api/mentoria-data', checkToken, async (req, res) => { 
    const retorno = await Mentoria.updateData(req, res);
    return retorno;
});

//rotas de mentorados
//router.get('/mentorado', Mentorado.index);
router.post('/api/mentorado', Mentorado.create);
router.get('/api/mentorado', Mentorado.index);
//router.get('/api/mentorado.details/:_id', Mentorado.detailsId);
//router.delete('/api/mentorado/:_id', Mentorado.delete);
router.put('/api/mentorado', Mentorado.update);
router.put('/api/mentorado-data', Mentorado.updateData);
//rotas de mentores
//router.get('/mentor', Mentor.index);
router.post('/api/mentor', Mentor.create);
router.get('/api/mentor', Mentor.index);
//router.get('/api/mentor.details/:_id', Mentor.detailsId);
//router.delete('/api/mentor/:_id', Mentor.delete);
router.put('/api/mentor', Mentor.update);
router.put('/api/mentor-data', Mentor.updateData);


//Rotas Delete All
router.delete('/api/delete/mentor', checkToken, async (req, res) => {
    const retorno = await Mentor.delete({ _id: req.id }, res)
    return retorno;
})
router.delete('/api/delete/mentorado', checkToken, async (req, res) => {
    const retorno = await Mentorado.delete({ _id: req.id }, res)
    return retorno;
})

router.delete('/api/delete/mentoria/:_id', checkToken, async (req, res) => {
    const retorno = await Mentoria.deleteMentoria(req, res)
    return retorno;
});

router.post('/api/delete/mentoria/mentor', checkToken, async (req, res) => {
    const retorno = await Mentoria.deleteMentoriaMentor({ _id_mentor: req.id }, res)
    return retorno;
});


module.exports = router;