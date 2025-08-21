/**
 * 
 *  Objetivo: Model Responsável pelo CRUD de dados do cliente no Banco de Dados.
 *  Data: 21/08/25
 *  Autor: Gabriel
 *  Versão: 1.0
 * 
 **/
/*

    CRUD
        C - Create
        R - Read
        U - Updade
        D-  Delete

*/

// Imposta a biblioteca do prisma/client.
const { PrismaClient } = require('@prisma/client')

// instaciando ( criando um novo objeto ) para realizar a manipulação do script SQL;
const prisma = new PrismaClient()

///---------------------------------------------------------------------------------------------------------------------

// Função para inserir no Banco de Dados.
const insertCliente = async function(cliente){

    //? trycatch = Forma de tratar o codigo para que a API não caia;
    try {

        let sql = `insert into tbl_cliente( nome,
                                            email,
                                            telefone
                                            )
                                    values(    
                                            '${cliente.nome}',
                                            '${cliente.email}',
                                            '${cliente.telefone}'  
                                            )`

            // Teste:
            // console.log(sql)

        // Executa o script SQL no BD ( -> bando de dados ) e aguarda o retorno do BD;
            //? await -> Aguarda um Retorno;
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        
    } catch (error) {
        // console.log(error)
        return false
    }

} 

///---------------------------------------------------------------------------------------------------------------------

// Função para atualizar no Banco de Dados.
const updateCliente = async function(cliente){

    try {
        let sql = `update tbl_cliente set nome        = '${cliente.nome}',
                                          email       = '${cliente.email}',
                                          telefone    = '${cliente.telefone}'
                                    where id=${cliente.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        // console.log(error)
        return false
    }

}

///---------------------------------------------------------------------------------------------------------------------

// Função para excluir no Banco de Dados.
const deleteCliente = async function(id){

    try {

        // Script SQL
        let sql = 'delete from tbl_cliente id where id='+id

        // Executa o script SQL no BD e aguarda o retorno dos dados
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        // console.log(error)
        return false
    }

}

///---------------------------------------------------------------------------------------------------------------------

// Função para retornar tudo do Banco de Dados.
const selectAllCliente = async function(){

    try {

        // Script SQL
        let sql = 'select * from tbl_cliente order by id desc'

        // Executa o script SQL no BD e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        // console.log(error)
        return false
    }

}

///---------------------------------------------------------------------------------------------------------------------

// Função para buscar no Banco de Dados.
const selectByIdCliente = async function(id){

    try {

        // Script SQL
        let sql = 'select * from tbl_cliente where id='+id

        // Executa o script SQL no BD e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        // console.log(error)
        return false
    }

}

///---------------------------------------------------------------------------------------------------------------------

module.exports = {
    insertCliente,
    updateCliente,
    deleteCliente,
    selectAllCliente,
    selectByIdCliente
} 
