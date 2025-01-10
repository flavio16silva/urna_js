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
let votoBranco = false
let votos = [] //guardar os votos


//Funções
function comecarEtapa(){
    let etapa = etapas[etapaAtual]

    let numeroHTML = ''
    numero = ''
    votoBranco = false

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
            if(candidato.fotos[i].small){
                fotosHTML += `<div class="d-1-image small">
                                <img src="images/${candidato.fotos[i].url}" alt="">
                                ${candidato.fotos[i].legenda}
                                </div>`
            } else {
                fotosHTML += `<div class="d-1-image">
                                <img src="images/${candidato.fotos[i].url}" alt="">
                                ${candidato.fotos[i].legenda}
                                </div>`
            }
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
    let audio = document.querySelector('audio')
    if( elementoNumero !== null){
        elementoNumero.innerHTML = num
        numero = `${numero}${num}`

        elementoNumero.classList.remove('pisca')
        if (elementoNumero.nextElementSibling !== null){
            //mudando o pisca para proximo numero - nextElementSibling
            elementoNumero.nextElementSibling.classList.add('pisca') 
            audio.currentTime = 0;
            audio.play()
            setTimeout(()=>{
                audio.pause();
            },100)
        } else {
            audio.currentTime = 0;
            audio.play()
            setTimeout(()=>{
                audio.pause();
            },100)
            atualizarInterface()
        }
    }
}

function branco(){
    let audio = document.querySelector('audio')
    numero = ''  
    votoBranco = true  
    
    seuVotoPara.style.display = 'block'
    aviso.style.display = 'block'
    numeros.innerHTML = ''    
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
    conteudoLateral.innerHTML = ''
    
    audio.currentTime = 0;
    audio.play()
    setTimeout(()=>{
        audio.pause();
    },100)
}

function corrigir(){
    let audio = document.querySelector('audio');

    audio.currentTime = 0;
    audio.play()
    setTimeout(()=>{
        audio.pause();
    },100)
    comecarEtapa()
}

function confirmar(){
    let audio = document.querySelector('audio')

    let etapa = etapas[etapaAtual]
    let votoConfirmado = false

    if(votoBranco === true){
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })
    } else if (numero.length === etapa.numeros){
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })

    }

    if(votoConfirmado) {
        audio.currentTime = 0
        audio.play()
        setTimeout(()=>{
            audio.pause()
        },100)

        etapaAtual++ //incrementando: passando para próxima tela
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa()
        } else {
            let audio = document.querySelector('audio')          
            console.log('FIM!')
            document.querySelector('.tela').innerHTML = '<div  class="aviso--gigante pisca">FIM</div>'
            console.log(votos)
           
                setTimeout(()=>{                  
                    audio.currentTime = 6
                    audio.play()                    
                },200);           
              
            }
            
        }           
}

comecarEtapa()