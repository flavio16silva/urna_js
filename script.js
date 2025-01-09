// Dados Iniciais
let seuVotoPara = document.querySelector('.d-1-1 span')
let cargo = document.querySelector('.d-1-2 span')
let descricao = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d-2')
let conteudoLateral = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3')


//Variaveis de controle de ambiente
let etapaAtual = 0


//Funções
function comecarEtapa(){
    let etapa = etapas[etapaAtual]

    let numeroHTML = ''

    for(let i = 0; i < etapa.numeros; i++){
        numeroHTML += '<div class="numero"></div>'
    }

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    conteudoLateral.innerHTML = ''
    numeros.innerHTML = numeroHTML
}

function clicou(num) {
    alert('Clicou em num ' + num)
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