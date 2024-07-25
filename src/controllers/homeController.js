const Contato = require('../models/contatoModel');

exports.index = async (req, res, next) => {
    const contatos = await Contato.buscaTodos();
    res.render('index', { contatos });
}