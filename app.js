/**
 * 
 *  Objetivo: API responsável pelas requisições do projeto de Teste de Software Jest.
 *  Data: 21/08/25
 *  Autor: Gabriel
 *  Versão: 1.0
 *  Observações: 
 *  - Para criar a API precisamos instalar:
 *      express;
 *      cors;
 *      body-parser
 *  - Para criar a conexão com o banco de dados MySQL precisamos instalar:
 *      prisma;
 *      prisma/client;
 *          - Após a instalação do prisma é necessário inicializar o prisma:
 *              npx prisma init;
 *          - Para sincronizar o prisma com o banco de dados podemos utilizar:
 *              npx prisma migrate dev;
 * 
 **/
/*

    Instalações:
        express         ->  npm install express --save              ->  serve para criar a API
        cors            ->  npm install cors --save                 ->  serve para configurar as permissões da API
        body-parser     ->  npm install body-parser --save          ->  serve para manipular os dados emviados para a API pelo body

        prisma          -> npm install prisma --save                ->
        prisma/client   -> npm install @prisma/client --save        ->

    Inicialização do Prisma:
                        -> npx prisma init                          ->

    Sincronização do Prisma com o DB:
                        -> npx prisma migrate dev                   ->

*/
/*

    npx prisma generate 

    npm install --save-dev jest

    npm install undici-types

*/

///---------------------------------------------------------------------------------------------------------------------

// Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Import das controllers do projeto
const controllerCliente = require('./controller/cliente/controllercliente.js')

// Criando o formato de dados que será recebido no bury da requisição ( POST/PUT )
const bodyParserJSON = bodyParser.json()

// Cria o objeto app para criar a API
const app = express()

///---------------------------------------------------------------------------------------------------------------------

// Configurações do Cors
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})


///---------------------------------------------------------------------------------------------------------------------
//______________________________________________________________________________________________________________________

// Endpoint para inserir
app.post('/v1/controle-clientes/cliente', cors(), bodyParserJSON, async function(request, response){    

    // Recebe contet type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']
    // Recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerCliente.inserirCliente(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para retornar a lista
app.get('/v1/controle-clientes/cliente', cors(), async function(request, response){

    // Chama a função para retornar a lista
    let result = await controllerCliente.listarClientes()

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para retornar pelo ID
app.get('/v1/controle-clientes/cliente/:id', cors(), async function(request, response){

    let idCliente = request.params.id

    let result = await controllerCliente.buscarCliente(idCliente)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para deletar
app.delete('/v1/controle-clientes/cliente/:id', cors(), async function(request, response){

    let idCliente = request.params.id

    let result = await controllerCliente.excluirCliente(idCliente)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para atualizar
app.put('/v1/controle-clientes/cliente/:id', cors(), bodyParserJSON, async function(request, response){

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe ID
    let idCliente = request.params.id

    // Recebe os dados do body
    let dadosBody = request.body 

    let result = await controllerCliente.atualizarCliente(dadosBody, idCliente, contentType)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------
//______________________________________________________________________________________________________________________
///---------------------------------------------------------------------------------------------------------------------

app.listen(8080, function(){
    console.log('Servidor aguardando novas requisições...')
})