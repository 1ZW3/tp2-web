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
        return this.nome + " de " + this.naipe;
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
}

function jogarCarta(jogador, encoberta = false, idx = -1){
	let mao
	if(jogador === 1)
		mao = estado.mp1;
	else if(jogador === 2)
		mao = estado.mp2;

	let carta = tirarCarta(mao, idx);
	carta = encoberta ? new Carta(-1, "", "Encoberta") : carta;

	estado.jogadas.push({player : jogador, carta : carta});
	estado.turno = jogador === 1 ? 2 : 1;
	
}
