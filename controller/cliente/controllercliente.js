/**
 * 
 *  Objetivo: Controller responsável pela manupulação do CRUD de dados do cliente.
 *  Data: 21/08/25
 *  Autor: Gabriel
 *  Versão: 1.0
 * 
 **/

// Import do arquivo de configurações de menssagens de status code.
const MESSAGE = require('../../modulo/config.js')

const DAO = require('../../model/dao/cliente.js')

const inserirCliente = async function(cliente, contentType){

    try{

        if(String(contentType).toLowerCase() == 'application/json'){

            if(cliente.nome == undefined || cliente.nome == '' || cliente.nome == null ||
                cliente.email == undefined || cliente.email == '' || cliente.email == null ||
                cliente.telefone == undefined || cliente.telefone == '' || cliente.telefone == null
            ){ //nome email e telefone
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{

                let result = await DAO.insertCliente(cliente)

                if(result){

                    return MESSAGE.SUCCESS_CREATED_ITEM

                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }

        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }

    }catch (error){

        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER

    }

}

const listarClientes = async function(){
    try{
        
        const dataClientes = {}

        const result = await DAO.selectAllCliente()

        if(result != false || typeof(result) == 'object'){

            if(result.length > 0){

                dataClientes.status_code = 200
                dataClientes.status = true
                dataClientes.items = result.length
                dataClientes.clientes = result

                return dataClientes
                
            }else{
                return MESSAGE.ERROR_NOT_FOUND
            }

        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }

    }catch (error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const buscarCliente = async function(search_id){


    try {

        if(search_id == '' || search_id  == undefined || search_id  == null || isNaN(search_id ) || search_id  < 1){
            return MESSAGE.ERROR_REQUIRED_FIELDS 
        }else{

            //JSON para guardar dados de retorno da DAO
            const dataClientes = {}

            //Chamando função da DAO para retornar todos os users
            const result = await DAO.selectByIdCliente(search_id)

                
            if(result != false || typeof(result) == 'object'){

                if(result.length > 0){

                    dataClientes.status_code = 200
                    dataClientes.status = true
                    dataClientes.cliente = result

                    return dataClientes
                    
                }else{
                    return MESSAGE.ERROR_NOT_FOUND
                }

            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }

        }


    }catch (error){

        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarCliente = async function(cliente, search_id, contentType){

    try{

        console.log(cliente, search_id, contentType)

        if(String(contentType).toLowerCase() == 'application/json'){

            if(cliente.nome == undefined || cliente.nome == '' || cliente.nome == null ||
                cliente.email == undefined || cliente.email == '' || cliente.email == null ||
                cliente.telefone == undefined || cliente.telefone == '' || cliente.telefone == null
            ){ //nome email e telefone
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{

                let clienteExists = await buscarCliente(search_id)

                if(clienteExists.status_code == 200){

                    cliente.id = search_id

                    let result = await DAO.updateCliente(cliente)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATE_ITEM
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else if(clienteExists.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND
                }

            }

        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }

    }catch (error){
        
    }

}

const excluirCliente = async function(search_id){

    try{

        if(search_id == '' || search_id  == undefined || search_id  == null || isNaN(search_id ) || search_id  < 1){
            return MESSAGE.ERROR_REQUIRED_FIELDS 
        }else{

            let clienteExists = await buscarCliente(search_id)

            if(clienteExists.status_code == 200){

                let result = await DAO.deleteCliente(search_id)

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }

            }else if(clienteExists.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND
            }

        }

    }catch (error){
        console.log(error)

        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
        
    }

}

module.exports = {
    inserirCliente,
    listarClientes,
    buscarCliente,
    excluirCliente,
    atualizarCliente
}