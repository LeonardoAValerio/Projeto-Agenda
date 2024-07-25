const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contato = null;
    }

    async register() {
        this.valida();
        if(this.errors.length > 0) return;
        this.contato = await ContatoModel.create(this.body);
    }

    valida() {
        this.cleanUp();
        // Validação
        // O email precisa ser válido
        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
        // A senha precusar ter entre 3 e 50
        if(!this.body.nome) this.errors.push('Nome é um campo obrigatório');
        if(!this.body.email && !this.body.telefone) this.errors.push("Pelo menos um contato precisa ser enviado (email ou telefone).");
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = ';'
            }
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            telefone: this.body.telefone,
            email: this.body.email
        }
    }

    static async buscaPorId(id) {
        if(typeof id !== "string") return;
        const user = await ContatoModel.findById(id);
        return user;
    }

    static async buscaTodos() {
        const contatos = await ContatoModel.find()
            .sort({ criadoEm: -1 });
        return contatos;
    }

    async edit(id) {
        if(typeof id !== "string") return;
        this.valida();
        if(this.errors.length > 0) return;
        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    static async delete(id) {
        if(typeof id !== "string") return;
        const contato = await ContatoModel.findOneAndDelete({_id:id});
        return contato;
    }
}

module.exports = Contato;