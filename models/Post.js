const mongoose =  require("mongoose")
const Schema = mongoose.Schema;

const Redacao = new Schema({
    texto:{
        type: String,
        require: true
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: "usuarios",
        require: true
    }
})


mongoose.model("redacoes", Redacao)


/*
CREATE TABLE REDACOES(
    id_redacao INTEGER AUTO_INCREMENT,
    texto TEXT NOT NULL,
    PRIMARY KEY (id_redacao)
    );
*/