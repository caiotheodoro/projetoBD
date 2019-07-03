create database projeto_bd;

use projeto_bd;

CREATE TABLE REDACAO(
id_redacao INTEGER , -- AUTO_INCREMENT
texto VARCHAR(8000) NOT NULL,
PRIMARY KEY (id_redacao)
);

CREATE TABLE USUARIO(
login_usuario VARCHAR(16) NOT NULL,
email VARCHAR(30) NOT NULL, 
senha VARCHAR(16) NOT NULL,
idRedacao INTEGER,
FOREIGN KEY (id_redacao) REFERENCES REDACAO,
PRIMARY KEY (login_usuario,id_redacao)
);
