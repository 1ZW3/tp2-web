class Carta{
	constructor(peso, naipe, nome, nomeEspecial = null){
		this.peso = peso;
		this.naipe = naipe;
		this.nome = nome;
		this.nomeEspecial = nomeEspecial;
	}

	getNome(){
		if(this.nomeEspecial)
			return this.nomeEspecial;
		return `${this.nome} de ${this.naipe}`;
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

    new Carta(10, "Ouros", "7", "7 Ouros"),
    new Carta(11, "Espadas", "A", "Espadilha"),
    new Carta(12, "Copas", "7", "7 Copas"),
    new Carta(13, "Paus", "4", "Zap")
]

console.log("Suas cartas");

function pickCard(){
	let indice = Math.floor(Math.random() * baralho.length);
	let carta = baralho[indice];
	baralho.splice(indice, 1);

	return carta;
}

for(let i = 0; i < 3; ++i){
	let carta = pickCard();
	console.log(carta.getNome());
}

class Jogo{
	constructor(jogador1, jogador2){
		this.p1 = jogador1;
		this.p2 = jogador2;

		this.pontosP1 = 0;
		this.pontosP2 = 0;
		this.vez = 1;
		this.mesa = [];
		this.historicoRodadas = [];
		this.aguardandoTruco = null;
	}
	
	
}
