const tabuleiro = document.getElementById('tabuleiro');
const movimentos = document.getElementById('movimentos');
const tempo = document.getElementById('tempo');
const reiniciar = document.getElementById('reiniciar');

let priCarta;
let segCarta;
let bloqueio = false;
let cartasGirando = false;

let movimentosJogados = 1;

let segundos = 0;
let intervaloTempo;

function iniciarContador() {
    if(intervaloTempo) return;

    intervaloTempo = setInterval(() => {
        segundos += 1;

        let minutos = Math.floor(segundos / 60);
        let seg = segundos % 60;

        tempo.textContent = `${minutos}:${seg < 10 ? '0' + seg : seg}`;
    }, 1000);
}

let cartas = [
    {id: 1, texto: 'Deus'},
    {id: 2, texto: 'Querubin'},
    {id: 1, texto: 'Deus'},
    {id: 2, texto: 'Querubin'},
    {id: 3, texto: 'Jesus'},
    {id: 3, texto: 'Jesus'},
    {id: 4, texto: 'Espirito Santo'},
    {id: 4, texto: 'Espirito Santo'}
];

let cartasEmbaralhadas = cartas.sort(() => Math.random() - 0.5);

function criarCartas() {
    tabuleiro.innerHTML = ''; 

    cartasEmbaralhadas.forEach(carta => {
        const cartaElement = document.createElement('div');
        cartaElement.classList.add('carta');
        cartaElement.dataset.id = carta.id;

        const inner = document.createElement('div');
        inner.classList.add('carta-inner');

        const frente = document.createElement('div');
        frente.classList.add('frente');
        frente.innerHTML = `<h1>${carta.texto}</h1><p>${carta.id}</p>`;

        const verso = document.createElement('div');
        verso.classList.add('verso');
        verso.textContent = "?";

        inner.appendChild(frente);
        inner.appendChild(verso);
        cartaElement.appendChild(inner);

        cartaElement.addEventListener('click', () => {
            if(!cartasGirando){
                if (bloqueio) return;
                if (cartaElement === priCarta) return;
                if (cartaElement.classList.contains('virada')) return;
                
                cartaElement.classList.add('virada');
                if(movimentosJogados <= 15){
                    movimentos.textContent = movimentosJogados;
                    movimentosJogados += 1;
                }else{
                    alert('Você atingiu o número máximo de movimentos! Reiniciando o jogo.');
                    movimentosJogados = 1;
                    movimentos.textContent = '0';
                    tempo.textContent = '0s';
                    priCarta = null;
                    segCarta = null;
                    bloqueio = false;
                    cartasGirando = false;
                    segundos = 0;
                    clearInterval(intervaloTempo);
                    intervaloTempo = null;
                    criarCartas();
                    girarTodasCartas();
                    return;
                }
                
                if (!priCarta) {
                    priCarta = cartaElement;
                    iniciarContador();
                } else {
                    segCarta = cartaElement;

                    if (priCarta.dataset.id !== segCarta.dataset.id) {
                        bloqueio = true;
                        setTimeout(() => {
                            priCarta.classList.remove('virada');
                            segCarta.classList.remove('virada');
                            priCarta = null;
                            segCarta = null;
                            bloqueio = false;
                        }, 1000);
                    } else {
                        priCarta = null;
                        segCarta = null;
                    }
                }
            }else{
                return;
            }
            });
            
            tabuleiro.appendChild(cartaElement);
        });
    }
    
    criarCartas();
    
    function girarTodasCartas() {
    const todasCartas = document.querySelectorAll('.carta');
        cartasGirando = true;
        
    todasCartas.forEach(carta => {
        carta.classList.add('girar');

        setTimeout(() => {
            carta.classList.remove('girar');
            cartasGirando = false;
        }, 2000); 
    });
}

reiniciar.addEventListener('click', () => {
    cartasEmbaralhadas = cartas.sort(() => Math.random() - 0.5);
    movimentosJogados = 1;
    priCarta = null;
    segCarta = null;
    bloqueio = false;
    cartasGirando = false;
    movimentos.textContent = '0';
    tempo.textContent = '0s';

    criarCartas();
    girarTodasCartas();
});
