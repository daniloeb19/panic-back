const express = require('express');
const router = express.Router();

const Mentorado = require('./controller/MentoradoController');
const Mentor = require('./controller/MentorController');
const Auth = require('./controller/AuthController');
const checkToken = require('./middlewares/Jwt');

router.post('/auth/login', Auth.authLogin);
router.post('/auth/senha', Auth.authSenha);
router.post('/auth/senha-log', checkToken, Auth.authSenhaLog);
router.get('/auth/check', checkToken, async (req, res) => {
    const retorno = await Auth.authCheck({ _id: req.id }, res);
    return retorno;
});

//rotas de mentorados
router.get('/', Mentorado.index);
router.post('/api/mentorado', Mentorado.create);
router.get('/api/mentorado', Mentorado.index);
router.get('/api/mentorado.details/:_id', Mentorado.detailsId);
router.delete('/api/mentorado/:_id', Mentorado.delete);
router.put('/api/mentorado', Mentorado.update);
router.put('/api/mentorado-data', Mentorado.updateData);
//rotas de mentores
router.get('/', Mentor.index);
router.post('/api/mentor', Mentor.create);
router.get('/api/mentor', Mentor.index);
router.get('/api/mentor.details/:_id', Mentor.detailsId);
router.delete('/api/mentor/:_id', Mentor.delete);
router.put('/api/mentor', Mentor.update);
router.put('/api/mentor-data', Mentor.updateData);

module.exports = router;