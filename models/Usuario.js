const mongoose =  require("mongoose")
const Schema = mongoose.Schema;

const Usuario = new Schema({
    login:{
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    senha: {
        type: String,
        require: true
    }
})

mongoose.model("usuarios", Usuario)
/* 
    
    CREATE TABLE USUARIO(
    id_usuario INTEGER AUTO_INCREMENT,
    login_usuario VARCHAR(16) NOT NULL,
    email VARCHAR(30) NOT NULL, 
    id_redacao INTEGER,
    FOREIGN KEY (id_redacao) REFERENCES REDACAO(id_redacao),
    PRIMARY KEY (id_usuario,login_usuario,id_redacao)
    );
    */