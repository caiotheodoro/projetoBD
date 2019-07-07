const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")


module.exports = function(passport){


    passport.use(new localStrategy({usernameField: 'login', passwordField: 'senha'},(login, senha, done) => {
  
      Usuario.findOne({login: login}).then((usuarios) => {
        if(!usuarios){
          return done(null,false, {message:"Conta inexistente."})
        }
  
        bcrypt.compare(senha, usuarios.senha, (erro,batem) => {
          if(batem){
            return done(null,usuarios)
          }
        else{
          return done(null, false, {message: "Senha incorreta."})
        }
        })
      })
    }))
    passport.serializeUser((usuarios,done) => {
      done(null,usuarios.id)
    })
  
    passport.deserializeUser((id,done) => {
      Usuario.findById(id,(err,usuarios) => {
        done(err,usuarios)
      })
    })
  }