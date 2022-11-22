const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post')

// Config
// Template Engine
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
//Body Parser
    app.use (bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

// Rotas
app.get('/', function (req,res){
    Post.findAll({order: [['id','DESC']]}).then(function (posts){
        res.render('home', {posts: posts})
    })
    // res.send("Luca")
})

app.get('/cad', function (req,res){
    res.render('formulario')
})

app.post('/add', function (req,res){
    // res.send("Texto:"+ req.body.titulo + "Conteudo:"+ req.body.conteudo)
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
    }).then(function (){
        // res.send("POST criado com sucesso!")
        res.redirect("/")
    }).catch(function (erro){
        res.send("Erro ao criar o POST:" + erro)
    })
})

app.get('/deletar/:id', function (req,res){
    Post.destroy({where: {'id': req.params.id}})
        .then(function (){
            res.send('Postagem deleta com sucesso!')
        })
        .catch(function (erro){
            res.send('Esta postagem não existe!')
        })
})

app.listen(8000,function (){
    console.log('Servidor Rodando!')
})

