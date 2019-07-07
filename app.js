const express = require("express");
const app = express();
const path = require("path")
const passport = require('passport')
require("./config/auth")(passport)
const handlebars =  require('express-handlebars')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const mongoose = require("mongoose")
require("./models/Post")
const Post =  mongoose.model("redacoes")
require("./models/Usuario")
const Usuario = mongoose.model("usuarios")
const session = require("express-session")
const flash = require("connect-flash")
var users = require('./routes/users');
app.use('/routes/users', users);



//config
    //sessao

    app.use(session({
      secret: "curso",
      resave: true,
      saveUnitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());
    
    //middleware
    app.use((req, res, next) => {
      res.locals.success_msg = req.flash("sucees_msg")
      res.locals.error_msg = req.flash("error_msg") 
      res.locals.user = req.user || null
      next();
    });
    //handlebars
    app.engine('handlebars',handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    //body parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    // public/bootstrap
    app.use(express.static(path.join(__dirname, 'public')));
    //mongoose
    mongoose.Promise =  global.Promise;
    mongoose.connect("mongodb://localhost/readacao", {
        useNewUrlParser: true
    }).then(() => {
        console.log("Conectado!")
    }).catch((err) => {
        console.log("erro" + err)
    })














    // Rotas (express)
app.get("/", function(req,res) {
  Post.find().then((redacoes) => {
    res.render('index', {redacoes: redacoes})
  })
  })
app.get('/enviarRedacao', function(req, res, next) {
    res.render('enviarRedacao', { title: 'Express' });
  });
  app.get('/redacoesCorrigidas', function(req, res, next) {
    Post.find().then((redacoes) => {
      res.render('redacoesCorrigidas', {redacoes: redacoes})
    })
  });
  app.get("/redacoesCorrigidas/edit/:id",(req, res) => {
    Post.findOne({_id: req.params.id}).then((redacoes) => {
   res.render("redacaoEdit", {redacoes: redacoes})
    })
  })
  app.get('/redacaoEdit', function(req, res, next) {
    res.render('redacaoEdit', { title: 'Express' });
  });
  app.get("/redacoesCorrigidas/edit/:id",(req, res) => {
    res.render("redacaoEdit")
  })
  app.get('/registro', function(req, res, next) {
    res.render('registro', { title: 'Express' });
  });
  app.get('/areaAluno', function(req, res, next) {
    res.render('areaAluno', { title: 'Express' });
  });
  app.get('/redacao', function(req, res, next) {
    res.render('redacao', { title: 'Express' });
  });
  app.get('/redacoesRecebidas', function(req, res, next) {
    res.render('redacoesRecebidas', { title: 'Express' });
  });
  app.get('/redacoesPostadas', function(req, res, next) {
    res.render('redacoesPostadas', { title: 'Express' });
  });
  app.get('/redacaoSend', function(req, res, next) {
    res.render('redacaoSend', { title: 'Express' });
  });

 app.post('/feedback', (req, res)  => {


    const novoPost = {
        texto: req.body.redacao
    }
    new Post(novoPost).save().then(() =>{
      res.redirect('/redacoesCorrigidas')
  }).catch((err) =>{
    res.send("Erro..." + erro)
  })
  });
  app.post("/redacoesCorrigidas/edit", (req,res) => {
    Post.findOne({_id: req.body.id}).then((redacoes) => {

      redacoes.texto = req.body.texto

      redacoes.save().then(() => {
        res.redirect("/redacoesCorrigidas")
      })
    })
  })
  app.get("/redacoesCorrigidas/deletar/:id", (req,res) => {
    Post.remove({_id: req.params.id}).then(() => {
      res.redirect("/redacoesCorrigidas")
    })
  })

app.get("/redacao/:id", (req,res) => {
    Post.findOne({_id: req.params.id}).then((redacoes) => {
      res.render("redacao", {redacoes: redacoes})
    })
})
app.post("/registro", (req,res) => {
  Usuario.findOne({login: req.body.login}).then((usuarios) => {
    if(usuarios){
      res.redirect("/registro")
    } else {
      const novoUsuario = new Usuario({
        login: req.body.login,
        email: req.body.email,
        senha: req.body.senha

      })
      bcrypt.genSalt(10, (erro, salt) => {
        bcrypt.hash(novoUsuario.senha, salt,(erro, hash) => {
          if(erro){
            res.redirect("/registro")
          }
          novoUsuario.senha = hash

          novoUsuario.save().then(() => {
            res.redirect("/areaAluno")
          })
        })
      })
    }
  })
})

app.post("/areaAluno", (req, res, next) => {

  passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/areaAluno",
    failureFlash: true
  })(req, res, next) 
})
app.get("/logout", (req,res) => {
    req.logout()
    res.redirect("/")
})





// module.exports = function(passport){


//   passport.use(new localStrategy({usernameField: 'login', passwordField: 'senha'},(login, senha, done) => {

//     Usuario.findOne({login: login}).then((usuarios) => {
//       if(!usuarios){
//         return done(null,false, {message:"Conta inexistente."})
//       }

//       bcrypt.compare(senha, usuarios.senha, (erro,batem) => {
//         if(batem){
//           return done(null,usuarios)
//         }
//       else{
//         return done(null, false, {message: "Senha incorreta."})
//       }
//       })
//     })
//   }))
//   passport.serializeUser((usuarios,done) => {
//     done(null,usuarios.id)
//   })

//   passport.deserializeUser((id,done) => {
//     Usuario.findById(id,(err,usuarios) => {
//       done(err,usuarios)
//     })
//   })
// }







    // servidor/porta 




 /* app.get('/deletar/:id', function(req,res){
    Post.destroy({where: {'id': req.params.id}}).then(function(){
      res.send("Postagem Deletada.")
    }).catch(function(erro) {
      res.send("Erro..." + erro)
    })
  })*/
app.listen(3000,() =>{
    console.log("servidor rodando na url http://localhost:3000");
})

/*app.get("/sobre/:login/:id", function(req,res) {
    res.send(req.params.login);
})
*/
