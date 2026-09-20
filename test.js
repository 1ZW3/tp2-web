let baralho = [
	0, 0, 0,
	1, 1, 1, 1,
	2, 2, 2, 2,
	3, 3,
	4, 4, 4, 4,
	5, 5, 5, 5,
	6, 6, 6, 6,
	7, 7, 7,
	8, 8, 8, 8,
	9, 9, 9, 9,
	10,
	11,
	12,
	13
];

console.log("Suas cartas");

for(let i = 0; i < 3; ++i){
	let a = Math.floor(Math.random() * baralho.length);
	let b = baralho[a];
	switch (b) {
	    case 0:
	        console.log("4");
	        break;
	    case 1:
	        console.log("5");
	        break;
	    case 2:
	        console.log("6");
	        break;
	    case 3:
	        console.log("7");
	        break;
	    case 4:
	        console.log("Q");
	        break;
	    case 5:
	        console.log("J");
	        break;
	    case 6:
	        console.log("K");
	        break;
	    case 7:
	        console.log("A");
	        break;
	    case 8:
	        console.log("2");
	        break;
	    case 9:
	        console.log("3");
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
	baralho.splice(a, 1);
}

console.log("Cartas Bot");

for(let i = 0; i < 3; ++i){
	let a = Math.floor(Math.random() * baralho.length);
	let b = baralho[a];
	switch (b) {
	    case 0:
	        console.log("4");
	        break;
	    case 1:
	        console.log("5");
	        break;
	    case 2:
	        console.log("6");
	        break;
	    case 3:
	        console.log("7");
	        break;
	    case 4:
	        console.log("Q");
	        break;
	    case 5:
	        console.log("J");
	        break;
	    case 6:
	        console.log("K");
	        break;
	    case 7:
	        console.log("A");
	        break;
	    case 8:
	        console.log("2");
	        break;
	    case 9:
	        console.log("3");
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
	baralho.splice(a, 1);
}
