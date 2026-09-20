let baralho = [
	{ peso: 0, naipe: 0 }, { peso: 0, naipe: 1 }, { peso: 0, naipe: 2 },
	{ peso: 1, naipe: 0 }, { peso: 1, naipe: 1 }, { peso: 1, naipe: 2 }, { peso: 1, naipe: 3 },
	{ peso: 2, naipe: 0 }, { peso: 2, naipe: 1 }, { peso: 2, naipe: 2 }, { peso: 2, naipe: 3 },
	{ peso: 3, naipe: 1 }, { peso: 3, naipe: 3 },
	{ peso: 4, naipe: 0 }, { peso: 4, naipe: 1 }, { peso: 4, naipe: 2 }, { peso: 4, naipe: 3 },
	{ peso: 5, naipe: 0 }, { peso: 5, naipe: 1 }, { peso: 5, naipe: 2 }, { peso: 5, naipe: 3 },
	{ peso: 6, naipe: 0 }, { peso: 6, naipe: 1 }, { peso: 6, naipe: 2 }, { peso: 6, naipe: 3 },
	{ peso: 7, naipe: 0 }, { peso: 7, naipe: 2 }, { peso: 7, naipe: 3 },
	{ peso: 8, naipe: 0 }, { peso: 8, naipe: 1 }, { peso: 8, naipe: 2 }, { peso: 8, naipe: 3 },
	{ peso: 9, naipe: 0 }, { peso: 9, naipe: 1 }, { peso: 9, naipe: 2 }, { peso: 9, naipe: 3 },
	{ peso: 10, naipe: 0 },
	{ peso: 11, naipe: 1 },
	{ peso: 12, naipe: 2 },
	{ peso: 13, naipe: 3 }
];

console.log("Suas cartas");

function pickCard(){
	let indice = Math.floor(Math.random() * baralho.length);
	let carta = baralho[indice];
	baralho.splice(indice, 1);

	return carta;
}

for(let i = 0; i < 3; ++i){
	let carta = pickCard();
	let naipe;
	switch (carta.naipe) {
		case 0:
			naipe = "ouros";
			break;
		case 1:
			naipe = "espadas";
			break;
		case 2:
			naipe = "copas";
			break;
		case 3:
			naipe = "paus";
			break;
	}
	switch (carta.peso) {
	    case 0:
	        console.log("4 de " + naipe);
	        break;
	    case 1:
	        console.log("5 de " + naipe);
	        break;
	    case 2:
	        console.log("6 de " + naipe);
	        break;
	    case 3:
	        console.log("7 de " + naipe);
	        break;
	    case 4:
	        console.log("Q de " + naipe);
	        break;
	    case 5:
	        console.log("J de " + naipe);
	        break;
	    case 6:
	        console.log("K de " + naipe);
	        break;
	    case 7:
	        console.log("A de " + naipe);
	        break;
	    case 8:
	        console.log("2 de " + naipe);
	        break;
	    case 9:
	        console.log("3 de " + naipe);
	        break;
	    case 10:
	        console.log("7 Ouros");
	        break;
	    case 11:
	        console.log("Espadilha");
	        break;
	    case 12:
	        console.log("7 Copas");
	        break;
	    case 13:
	        console.log("Zap");
	        break;
	}
}

console.log("Cartas Bot");

for(let i = 0; i < 3; ++i){
	let carta = pickCard();
	let naipe;
	switch (carta.naipe) {
		case 0:
			naipe = "ouros";
			break;
		case 1:
			naipe = "espadas";
			break;
		case 2:
			naipe = "copas";
			break;
		case 3:
			naipe = "paus";
			break;
	}
	switch (carta.peso) {
	    case 0:
	        console.log("4 de " + naipe);
	        break;
	    case 1:
	        console.log("5 de " + naipe);
	        break;
	    case 2:
	        console.log("6 de " + naipe);
	        break;
	    case 3:
	        console.log("7 de " + naipe);
	        break;
	    case 4:
	        console.log("Q de " + naipe);
	        break;
	    case 5:
	        console.log("J de " + naipe);
	        break;
	    case 6:
	        console.log("K de " + naipe);
	        break;
	    case 7:
	        console.log("A de " + naipe);
	        break;
	    case 8:
	        console.log("2 de " + naipe);
	        break;
	    case 9:
	        console.log("3 de " + naipe);
	        break;
	    case 10:
	        console.log("7 Ouros");
	        break;
	    case 11:
	        console.log("Espadilha");
	        break;
	    case 12:
	        console.log("7 Copas");
	        break;
	    case 13:
	        console.log("Zap");
	        break;
	}
}
