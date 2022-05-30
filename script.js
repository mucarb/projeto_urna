let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let votoEmBranco = false;
let listaVotos = [];

function startStage() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoEmBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="number flashes"></div>';
        } else {
            numeroHtml += '<div class="number"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function updateInterface() {
    let etapa = etapas[etapaAtual];

    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        }
        return false;
    });

    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

        let fotosHtml = '';

        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"><img src="./assets/img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="d-1-image"><img src="./assets/img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }
        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="big-warning flashes">VOTO NULO</div>';
    }
}

function numericKeypadClicked(n) {
    let elementoNumero = document.querySelector('.number.flashes');

    if (elementoNumero !== null) {
        elementoNumero.innerHTML = n;
        numero += n;

        elementoNumero.classList.remove('flashes');

        if (elementoNumero.nextElementSibling !== null) {
            elementoNumero.nextElementSibling.classList.add('flashes');
        } else {
            updateInterface();
        }
    }
}

function whiteButtonClicked() {
    numero = ''
    votoEmBranco = true;

    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="big-warning flashes">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';
}

function correctButtonClicked() {
    startStage();
}

function confirmButtonClicked() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if (votoEmBranco === true) {
        votoConfirmado = true;

        listaVotos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;

        listaVotos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if (votoConfirmado) {
        etapaAtual++;

        if (etapas[etapaAtual] !== undefined) {
            startStage();
        } else {
            document.querySelector('.screen').innerHTML = '<div class="giant-warning flashes">FIM</div>';
            console.log(listaVotos);
        }
    }
}

startStage();