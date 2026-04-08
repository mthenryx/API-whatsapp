/* ***********************************************************************************
* Objetivo: Arquivo responsável pela criação da API do projeto do Whatsapp
* Data: 08/04/2026  
* Verção: 1.0
* Autor: Matheus H.
* ************************************************************************************/

const contatos = require("./contatos.js")
const whatsapp = contatos.contatos["whats-users"]

//Função que lista todos os dados de usuário independe
const listarTodosDados = function(){
    return {
        "user-data" : whatsapp
    }
}

//Função que listar dados da conta do profile do usuário
const listarDadosProfileUser = function(number){
    let result = false
    let numero = Number(number)

    whatsapp.forEach(function(user){
        if(numero == user.number){
            result = {
                "account"             : user.account,
                "nickname"            : user.nickname,
                "created-since-start" : user["created-since"].start,
                "created-since-end"   : user["created-since"].end,
                "profile-image"       : user["profile-image"],
                "number"              : user.number,
                "background"          : user.background,

            }
        }
    })

    return result
}

//Função que listar dados de contato para cada usuário
const listarContatoCadaUser = function(number){
    let result = false
    let numero = Number(number)

    whatsapp.forEach(function(user){
        if(numero == user.number){
            result = {
                "name-user" : user.nickname,
                "contatos"  : []
            }

            user.contacts.forEach(function(contato){
                result.contatos.push({
                    "nome"      : contato.name,
                    "foto"      : contato.image,
                    "descricao" : contato.description
                })
            })
        }
    })

    return result
}

//Função que listar todas as mensagens trocadas de uma conta de usuário
const listarMensagensTrocadas = function(number){
    let result = false
    let numero = Number(number)

    whatsapp.forEach(function(user){
        if(numero == user.number){
            result = {
                "name_user" : user.nickname,
                "conversas"  : []
            }

            user.contacts.forEach(function(contato){
                result.conversas.push(contato)
            })
        }
    })

    return result
} 

//Função que listar uma conversa de um usuário e um contato
const listarConversaUserContato = function(number, conversante){
    let result = false
    let numero = Number(number)
    let contato = String(conversante)

    whatsapp.forEach(function(user){
        if(numero == user.number){
            user.contacts.forEach(function(pessoaDaConversa){
                if(contato == pessoaDaConversa.name){
                    result = {
                        "usuario"          : user.nickname,
                        "numero"           : user.number,
                        "nome_conversante" : pessoaDaConversa.name,
                        "conversa"      : pessoaDaConversa.messages
                    }
                }
            })
        }
    })

    return result
}

//Função que Realizar um filtro por pesquisa de palavra chave
const filtroPesquisaPalavraChave = function(number, palavraChave){
    let result = false
    let numero = Number(number)
    let contato = String(conversante)


    return result
}

console.log(filtroPesquisaPalavraChave(11987876567, ))

module.exports = {
    listarTodosDados,
    listarDadosProfileUser,
    listarContatoCadaUser,
    listarMensagensTrocadas,
    listarConversaUserContato,
}