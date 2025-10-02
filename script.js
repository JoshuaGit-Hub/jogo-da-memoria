const tabuleiro = document.getElementById('tabuleiro');
const movimentos = document.getElementById('movimentos');
const tempo = document.getElementById('tempo');
const reiniciar = document.getElementById('reiniciar');

let priCarta;
let segCarta;

let bloqueio = false;

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

const cartasEmbaralhadas = cartas.sort(() => Math.random() - 0.5);

function criarCartas(){

    cartasEmbaralhadas.forEach(carta => {
        const cartaElement = document.createElement('div');
        cartaElement.classList.add('carta');
        cartaElement.dataset.id = carta.id;

        const frente = document.createElement('div');
        frente.classList.add('frente');
        const verso = document.createElement('div');
        verso.classList.add('verso');

        cartaElement.appendChild(frente);
        cartaElement.appendChild(verso);

        const h1Carta = document.createElement('h1');
        const pCarta = document.createElement('p');

        h1Carta.textContent = carta.texto;
        pCarta.textContent = carta.id;
        
        frente.appendChild(h1Carta);
        frente.appendChild(pCarta);

        cartaElement.addEventListener('click', () => {

            cartaElement.classList.add('virada');

            if(!bloqueio){
                if(!priCarta){
                    priCarta = cartaElement;
                }else if(!segCarta){
                    segCarta = cartaElement;
                }else{
                    bloqueio = true;
                }

            }
            else{

            }


        });
        
        tabuleiro.appendChild(cartaElement);

        
    });
};

criarCartas();