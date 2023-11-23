create table clientes(
    id bigint not null auto_increment,
    nome varchar(100) not null,
    cpf varchar(11) not null unique,
    email varchar(100) not null unique,
    telefone varchar(14) not null unique,
    data_nascimento DATE,
    cep varchar(9) not null,
    logradouro varchar(100) not null,
    bairro varchar(100) not null,
    complemento varchar(100),
    numero varchar(20),
    uf char(2) not null,
    cidade varchar(100) not null,

    primary key(id)
);