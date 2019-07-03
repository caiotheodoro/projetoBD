CREATE TABLE REDACAO(
idRedacao INTEGER NOT NULL,
texto VARCHAR(2000) NOT NULL,
PRIMARY KEY (idRedacao)
);

CREATE TABLE USUARIO(
idUsuario INTEGER NOT NULL,
senha VARCHAR(16) NOT NULL,
idRedacao INTEGER,
FOREIGN KEY (idRedacao) REFERENCES REDACAO,
PRIMARY KEY (idUsuario)
);
