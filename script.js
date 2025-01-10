// Dados Iniciais
let seuVotoPara = document.querySelector('.d-1-1 span')
let cargo = document.querySelector('.d-1-2 span')
let descricao = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d-2')
let conteudoLateral = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3')


//Variaveis de controle de ambiente
let etapaAtual = 0
let numero = ''  //irá receber o preenchimento dos numeros


//Funções
function comecarEtapa(){
    let etapa = etapas[etapaAtual]

    let numeroHTML = ''

    for(let i = 0; i < etapa.numeros; i++){
        if(i === 0){
            numeroHTML += '<div class="numero pisca"></div>'
        } else {
            numeroHTML += '<div class="numero"></div>'
        }
    }

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    conteudoLateral.innerHTML = ''
    numeros.innerHTML = numeroHTML
}

function atualizarInterface(){
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter( (item)=> {
        if(item.numero === numero) {  //se o numero digitado for igual ao numero do item do candidato
            return true
        } else {
            return false
        }
    })
    if(candidato.length > 0){
        candidato = candidato[0]
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = `Nome: ${candidato.nome} <br>
                                Partido: ${candidato.partido} <br>
                                </div>`
        
        let fotosHTML = ''
        for( let i in candidato.fotos ){
            fotosHTML = `<div class="d-1-image">
                        <img src="images/${candidato.fotos[i].url}" alt="">
                        ${candidato.fotos[i].legenda}
                        </div>`
        }
        conteudoLateral.innerHTML = fotosHTML
    }   else {
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
    }  
}

function clicou(num) {
    let elementoNumero = document.querySelector('.numero.pisca')
    if( elementoNumero !== null){
        elementoNumero.innerHTML = num
        numero = `${numero}${num}`

        elementoNumero.classList.remove('pisca')
        if (elementoNumero.nextElementSibling !== null){
            //mudando o pisca para proximo numero - nextElementSibling
            elementoNumero.nextElementSibling.classList.add('pisca') 
        } else {
            atualizarInterface()
        }
    }
}

function branco(){
    alert('Clicou no botão branco')
}

function corrigir(){
    alert('Clicou no botão corrigir')
}

function confirmar(){
    alert('Clicou no botão confirmar')
}

comecarEtapa()