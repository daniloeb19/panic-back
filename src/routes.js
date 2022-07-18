const express = require('express');
const router = express.Router();

const Mentorado = require('./controller/MentoradoController');

//rotas de mentorados
router.get('/', Mentorado.index);
router.post('/api/mentorado',Mentorado.create);
router.get('/api/mentorado', Mentorado.index);
router.get('/api/mentorado.details/:_id',Mentorado.details);
router.get('/api/mentorado.find/:email',Mentorado.pesquisarPorEmail);
router.delete('/api/mentorado/:_id',Mentorado.delete);
router.put('/api/mentorado',Mentorado.update);

module.exports = router;