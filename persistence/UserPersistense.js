const mongoose = require('mongoose')

class UserPersistence {
    constructor(connection) {
        this.connection = connection
        this.schema = new mongoose.Schema({
            name: String,
            email: String,

        })
        this.userModel = this.connection.model('User',this.schema)
    }

    insert(user) {
        return new Promise((resolve,reject) => {
            let userRep = new this.userModel(user)
            userRep.save((err, res) =>{
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    findAll(){
        return new Promise((resolve, reject) => {
            this.userModel.find((err, res) => {
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    findBylogin(login) {
        return new Promise((resolve, reject) => {
            this.userModel.findOne({ login: login}, (err, res) => {
                if(err || red == null){
                    reject(err)
                }
                resolve(res)
            })
        })
    }
    addRedacao(login, texto){
        return new Promise((resolve, reject) =>{
            this.userModel.findOneAndUpdate({ login: login},(err, res) => {
                if(err){
                    reject(err)
                }
                resolve(res)        
            })
        })
    }

}

module.exports = UserPersistence