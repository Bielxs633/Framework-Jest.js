CREATE DATABASE db_controle_clientes_jest;

USE db_controle_clientes_jest;

create table tbl_cliente:
id int primary key auto_increment not null,
nome varchar(60) not null,
email varchar(80) not null,
telefone varchar(25) not null;
