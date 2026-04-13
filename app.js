/* ***********************************************************************************
* Objetivo: Arquivo responsável pela criação da API do projeto whatsapp
* Data: 13/04/2026  
* Verção: 1.0
* Autor: Matheus H.
* ************************************************************************************/

const express = require("express")
const cors    = require("cors")

const app = express()

const corsOptions = {
    origin: ["*"],    
    methods: "GET",  
    allowedHeaders: ["Content-type", "Authorization"] 
}

app.use(cors(corsOptions))

const whatsappFunctions = require("./module/funtions.js")

app.get("/v1/whatsapp/users", function(request, response){
    let dados = whatsappFunctions.listarTodosDados()

    response.status(200)
    response.json(dados)
})

app.get("/v1/whatsapp/user/:number", function(request, response){
    let number = request.params.number
    let dados = whatsappFunctions.listarDadosProfileUser(number)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({message: "Usuário não encontrado"})
    }
})

app.get("/v1/whatsapp/user/contacts/:number", function(request, response){
    let number = request.params.number
    let contatos = whatsappFunctions.listarContatoCadaUser(number)

    if(contatos){
        response.status(200)
        response.json(contatos)
    }else{
        response.status(404)
        response.json({message: "Contatos não encontrados"})
    }
})

app.get("/v1/whatsapp/user/conversations/:number", function(request, response){
    let number = request.params.number
    let conversas = whatsappFunctions.listarMensagensTrocadas(number)

    if(conversas){
        response.status(200)
        response.json(conversas)
    }else{
        response.status(404)
        response.json({message: "Conversas não encontradas"})
    }
})

app.get("/v1/whatsapp/user/:number/conversation/:contact", function(request, response){
    let number = request.params.number
    let contact = request.params.contact

    let conversa = whatsappFunctions.listarConversaUserContato(number, contact)

    if(conversa){
        response.status(200)
        response.json(conversa)
    }else{
        response.status(404)
        response.json({message: "Conversa não encontrada"})
    }
})

app.get("/v1/whatsapp/search", function(request, response){
    let number = request.query.number
    let keyword = request.query.keyword

    if(number && keyword){
        let resultado = whatsappFunctions.filtroPesquisaPalavraChave(number, keyword)

        if(resultado && resultado.resultados.length > 0){
            response.status(200)
            response.json(resultado)
        }else{
            response.status(404)
            response.json({message: "Nenhuma mensagem encontrada"})
        }

    }else{
        response.status(400)
        response.json({message: "Parâmetros obrigatórios: number e keyword"})
    }
})

app.get("/v1/whatsapp/help", function(request, response){
    let docApi = {
        "api-description": "API para manipulação de dados do WhatsApp (usuários, contatos e mensagens)",
        "version": "1.0",
        "author": "Matheus H.",
        "endpoints": [
            {
                "method": "GET",
                "route": "/v1/whatsapp/users",
                "description": "Retorna todos os usuários cadastrados"
            },
            {
                "method": "GET",
                "route": "/v1/whatsapp/user/:number",
                "description": "Retorna os dados do perfil de um usuário pelo número"
            },
            {
                "method": "GET",
                "route": "/v1/whatsapp/user/contacts/:number",
                "description": "Retorna todos os contatos de um usuário"
            },
            {
                "method": "GET",
                "route": "/v1/whatsapp/user/conversations/:number",
                "description": "Retorna todas as conversas de um usuário"
            },
            {
                "method": "GET",
                "route": "/v1/whatsapp/user/:number/conversation/:contact",
                "description": "Retorna a conversa entre um usuário e um contato específico"
            },
            {
                "method": "GET",
                "route": "/v1/whatsapp/search?number=numero&keyword=palavra",
                "description": "Busca mensagens por palavra-chave dentro das conversas de um usuário"
            }
        ]
    }

    response.status(200)
    response.json(docApi)
})

app.listen(8080, function(){
    console.log("API aguardando novas requisições ...")
})