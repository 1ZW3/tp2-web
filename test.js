class Carta {
    constructor(peso, naipe, nome, nomeEspecial = null) {
        this.peso = peso;
        this.naipe = naipe;
        this.nome = nome;
        this.nomeEspecial = nomeEspecial;
    }

    getNome() {
        if (this.nomeEspecial)
            return this.nomeEspecial;
        return this.nome;
    }
}

let baralho = [
    new Carta(0, "Ouros", "4"),
    new Carta(0, "Espadas", "4"),
    new Carta(0, "Copas", "4"),

    new Carta(1, "Ouros", "5"),
    new Carta(1, "Espadas", "5"),
    new Carta(1, "Copas", "5"),
    new Carta(1, "Paus", "5"),

    new Carta(2, "Ouros", "6"),
    new Carta(2, "Espadas", "6"),
    new Carta(2, "Copas", "6"),
    new Carta(2, "Paus", "6"),

    new Carta(3, "Espadas", "7"),
    new Carta(3, "Paus", "7"),

    new Carta(4, "Ouros", "Q"),
    new Carta(4, "Espadas", "Q"),
    new Carta(4, "Copas", "Q"),
    new Carta(4, "Paus", "Q"),

    new Carta(5, "Ouros", "J"),
    new Carta(5, "Espadas", "J"),
    new Carta(5, "Copas", "J"),
    new Carta(5, "Paus", "J"),

    new Carta(6, "Ouros", "K"),
    new Carta(6, "Espadas", "K"),
    new Carta(6, "Copas", "K"),
    new Carta(6, "Paus", "K"),

    new Carta(7, "Ouros", "A"),
    new Carta(7, "Copas", "A"),
    new Carta(7, "Paus", "A"),

    new Carta(8, "Ouros", "2"),
    new Carta(8, "Espadas", "2"),
    new Carta(8, "Copas", "2"),
    new Carta(8, "Paus", "2"),

    new Carta(9, "Ouros", "3"),
    new Carta(9, "Espadas", "3"),
    new Carta(9, "Copas", "3"),
    new Carta(9, "Paus", "3"),

    new Carta(10, "Ouros", "7", "7 de Ouros"),
    new Carta(11, "Espadas", "A", "Espadilha"),
    new Carta(12, "Copas", "7", "7 de Copas"),
    new Carta(13, "Paus", "4", "Zap")
];

const estado = {
    p1: 0,
    p2: 0,
    valor: 2,
    comeca: 1,
    turno: 1,
    mp1: [],
    mp2: [],
    baralho: [],
    jogadas: [],
    rodadas: [] /*esse vai guardar quem ganhou cada rodada ex [1, 2, 1]*/
    /*tem de adicionar varias coisas ainda de controle de estado, para o futuro*/
};

function tirarCarta(vetor, idx = -1){
	if(idx === -1)
		idx = Math.floor(Math.random() * vetor.length);
	let carta = vetor.splice(idx, 1);
	return carta[0];
}

function pickCard(){
	return tirarCarta(estado.baralho);
}

function novaMao(){
	estado.baralho = [...baralho];
	estado.rodadas = [];
	estado.jogadas = [];
	estado.valor = 2;
	estado.turno = 1;
	estado.mp1 = [];
	estado.mp2 = [];
	for(let i = 0;i < 6; ++i){
		if(i < 3)
			estado.mp1.push(pickCard());
		else
			estado.mp2.push(pickCard());
	}
}

function quemGanha(jogadas){
	let p1;
	let p2;
	for(let i = 0; i < jogadas.length; ++i){
		if(jogadas[i].player === 1)
			p1 = jogadas[i];
		if(jogadas[i].player === 2)
			p2 = jogadas[i];
	}

	return p1.carta.peso > p2.carta.peso ?  1 : (p1.carta.peso < p2.carta.peso ? 2 : 0);
}

function quemGanhaJ(rodadas){
	let r1 = rodadas[0];
	let r2 = rodadas[1];
	let r3 = rodadas[2]; //acho que nn tem problema, se ficar undefined

	
	//caso empate primeira
	if(r1 === 0){
		if(r2 === 1) return 1;
		if(r2 === 2) return 2;
		if(r2 === 0){
			if(r3 === 1) return 1;
			if(r3 === 2) return 2;
			if(r3 === 0) return 0;
		}
		return null;
	}
	//caso empate segunda, ou ganhar 2 seguidas
	if(r2 !== undefined){
		if(r2 === r1) return r1;
		if(r2 === 0) return r1;
	}

	//caso chegue aqui é porque r1 != r2, então decide em r3
	if(r3 !== undefined){
		if(r3 === 0) return r1;
		return r3;
	}
	return null;
}

function jogarCarta(jogador, idx = -1){
	let mao;
	if(jogador === 1)
		mao = estado.mp1;
	else if(jogador === 2)
		mao = estado.mp2;

	let carta = tirarCarta(mao, idx);

	estado.jogadas.push({player : jogador, carta : carta});
	estado.turno = jogador === 1 ? 2 : 1;
	return carta;
}

function pedirTruco(){
	let botAceita = Math.random() > 0.5;

	if(botAceita){
		estado.valor = 4;
		return "aceitou";
	}
	else{
		estado.p1 += estado.valor;
		novaMao();
		return "correu";
	}
}

function jogarRodada(idx){
	let cartaJogador = jogarCarta(1, idx);
	let cartaBot = jogarCarta(2);

	let vencedorRodada = quemGanha(estado.jogadas);
	estado.rodadas.push(vencedorRodada);

	estado.jogadas = [];

	let vencedorMao = quemGanhaJ(estado.rodadas);
	if(vencedorMao === 1){
		estado.p1 += estado.valor;
		novaMao();
	}
	else if(vencedorMao === 2){
		estado.p2 += estado.valor;
		novaMao();
	}

	return {
		cartaJogador: cartaJogador,
		cartaBot: cartaBot,
		vencedorRodada: vencedorRodada,
		vencedorMao: vencedorMao
	};
}

novaMao();


const cartasHTML = document.querySelectorAll(".area-jogador .carta");
const slots = document.querySelectorAll(".carta-slot");

const naipes = {
    Ouros: "♦",
    Espadas: "♠",
    Copas: "♥",
    Paus: "♣"
};

// Mostrar cartas do jogador
function atualizarCartas() {
    cartasHTML.forEach((elemento, i) => {
        const carta = estado.mp1[i];

        if (!carta) {
            elemento.innerHTML = "";
            elemento.disabled = true;
            return;
        }

        elemento.disabled = false;

        elemento.innerHTML = `
            <span class="canto">${carta.nome}</span>
            <span class="simbolo ${
                carta.naipe === "Copas" || carta.naipe === "Ouros"
                ? "vermelha" : "preta"
            }">${naipes[carta.naipe]}</span>
        `;

        elemento.classList.toggle("especial", !!carta.nomeEspecial);
    });
}

// Atualizar placar
function atualizarPlacar() {
    document.getElementById("pontos-jogador").textContent = estado.p1;
    document.getElementById("pontos-bot").textContent = estado.p2;
    document.getElementById("valor-mao").textContent = estado.valor;
}

// Jogar carta
function jogar(idx) {
    if (estado.mp1[idx] === undefined) return;

    const resultado = jogarRodada(idx);

    // Mostrar cartas jogadas
    [resultado.cartaBot, resultado.cartaJogador].forEach((carta, i) => {
        slots[i].innerHTML = `
            <span>${carta.nome}</span>
            <span class="${carta.naipe === "Copas" || carta.naipe === "Ouros" ? "vermelha" : "preta"}">
                ${naipes[carta.naipe]}
            </span>
        `;
    });

    document.querySelector(".mensagem").textContent =
        resultado.vencedorRodada === 1 ? "Você ganhou a rodada!" :
        resultado.vencedorRodada === 2 ? "Bot ganhou a rodada!" :
        "Empate!";

    atualizarPlacar();
    atualizarCartas();

    if (resultado.vencedorMao !== null) {
        document.getElementById("resultado-mao").textContent =
            resultado.vencedorMao === 1
            ? "Você ganhou a mão!"
            : "Bot ganhou a mão!";

        if (estado.p1 >= 12 || estado.p2 >= 12) {
            document.getElementById("fim-jogo").style.display = "flex";
            document.getElementById("mensagem-fim").textContent =
                estado.p1 >= 12 ? "Você venceu!" : "Bot venceu!";
            return;
        }

        setTimeout(() => {
            novaMao();
            slots.forEach(slot => slot.innerHTML = "");
            document.getElementById("resultado-mao").textContent = "";
            atualizarPlacar();
            atualizarCartas();
        }, 1500);
    }
}

// Eventos das cartas
cartasHTML.forEach((carta, idx) => {
    carta.addEventListener("click", () => jogar(idx));
});

// Pedir truco
document.getElementById("btn-truco").addEventListener("click", () => {
    const resposta = pedirTruco();

    if (resposta === "aceitou") {
        document.querySelector(".mensagem").textContent = "Bot aceitou o truco!";
    } else {
        document.querySelector(".mensagem").textContent = "Bot correu! Você ganhou!";
        atualizarPlacar();

        setTimeout(() => {
            novaMao();
            atualizarCartas();
            atualizarPlacar();
        }, 1500);
    }
});

// Reiniciar
document.getElementById("btn-reiniciar").addEventListener("click", () => {
    estado.p1 = 0;
    estado.p2 = 0;

    document.getElementById("fim-jogo").style.display = "none";

    novaMao();
    slots.forEach(slot => slot.innerHTML = "");

    atualizarCartas();
    atualizarPlacar();
});

atualizarCartas();
atualizarPlacar();
