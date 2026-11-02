/*A parte de output No terminal Foi feita por IA para feedback rapido e testar se o codigo está funcionando*/

const readline = require("readline/promises");
const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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

function pickCard(monte) {
    let indice = Math.floor(Math.random() * monte.length);
    let carta = monte[indice];
    monte.splice(indice, 1);
    return carta;
}

function proximoValor(valor) {
    if (valor === 2)
        return 4;
    if (valor === 4)
        return 6;
    if (valor === 6)
        return 9;
    if (valor === 9)
        return 12;
    return 12;
}

function nomeValor(valor) {
    if (valor === 4)
        return "Truco";
    if (valor === 6)
        return "6";
    if (valor === 9)
        return "9";
    if (valor === 12)
        return "12";
    return "";
}

function podeEsconder(rodada, maoDeDez, maoDeFerro, jaEscondeu) {
    if (rodada <= 1)
        return false;
    if (maoDeDez || maoDeFerro)
        return false;
    if (jaEscondeu)
        return false;
    return true;
}

function podePedirTruco(valorMesa, maoDeDez, maoDeFerro) {
    if (maoDeDez || maoDeFerro)
        return false;
    if (valorMesa >= 12)
        return false;
    return true;
}

function maiorCarta(mao) {
    let maior = 0;
    for (let i = 1; i < mao.length; i++)
        if (mao[i].peso > mao[maior].peso)
            maior = i;

    return maior;
}

function quemGanhaRodada(j1, j2) {
    if (j1.escondida && !j2.escondida)
        return 2;

    if (!j1.escondida && j2.escondida)
        return 1;

    if (j1.carta.peso > j2.carta.peso)
        return 1;

    if (j2.carta.peso > j1.carta.peso)
        return 2;

    return 0;
}

function quemGanhaMao(resultados, quemComecou) {
    if (resultados.length === 1)
        return null;

    let r1 = resultados[0];
    let r2 = resultados[1];

    if (resultados.length === 2) {
        if (r1 === 1 && r2 === 1)
            return 1;

        if (r1 === 2 && r2 === 2)
            return 2;

        if (r1 === 1 && r2 === 0)
            return 1;

        if (r1 === 2 && r2 === 0)
            return 2;

        if (r1 === 0 && r2 === 1)
            return 1;

        if (r1 === 0 && r2 === 2)
            return 2;

        return null;
    }

    if (resultados.length === 3) {
        let r3 = resultados[2];

        if (r3 === 1)
            return 1;

        if (r3 === 2)
            return 2;

        if (r1 === 1)
            return 1;

        if (r1 === 2)
            return 2;

        return quemComecou;
    }

    return null;
}

class BotDumb {
    constructor(nome) {
        this.nome = nome;
    }

    escolherAcao(acoes) {
        let indice = Math.floor(Math.random() * acoes.length);
        return acoes[indice];
    }

    escolherCarta(mao) {
        let indice = Math.floor(Math.random() * mao.length);
        return indice;
    }

    decidirMaoDeDez(mao) {
        for (let i = 0; i < mao.length; i++)
            if (mao[i].peso >= 9)
                return "jogar";

        if (Math.random() < 0.5)
            return "jogar";
        return "correr";
    }
}

class Jogo {
    constructor(jogador1, jogador2) {
        this.p1 = jogador1;
        this.p2 = jogador2;

        this.pontosP1 = 0;
        this.pontosP2 = 0;

        this.quemComeca = 1;
        this.valorMesa = 2;

        this.maoP1 = [];
        this.maoP2 = [];
        this.monte = [];
    }

    nomeJogador(numero) {
        if (numero === 1)
            return this.p1.nome;
        return this.p2.nome;
    }

    trocarQuemComeca() {
        if (this.quemComeca === 1)
            this.quemComeca = 2;
        else
            this.quemComeca = 1;
    }

    darPontos(jogador, pontos) {
        if (jogador === 1)
            this.pontosP1 += pontos;
        else
            this.pontosP2 += pontos;
    }

    darCartas() {
        this.monte = baralho.slice();
        this.maoP1 = [];
        this.maoP2 = [];

        for (let i = 0; i < 3; i++) {
            this.maoP1.push(pickCard(this.monte));
            this.maoP2.push(pickCard(this.monte));
        }
    }

    jogarCarta(jogador, indice, escondida = false) {
        let mao;
        if (jogador === 1)
            mao = this.maoP1;
        else
            mao = this.maoP2;

        let carta = mao[indice];
        mao.splice(indice, 1);

        return {
            jogador: jogador,
            carta: carta,
            escondida: escondida
        };
    }
}

function mostrarMao(mao, noEscuro = false) {
    for (let i = 0; i < mao.length; i++)
        if (noEscuro)
            console.log((i + 1) + " - [Carta Oculta]");
        else
            console.log((i + 1) + " - " + mao[i].getNome());
}

async function pedirTruco(jogo, quemPediu) {
    let desafiante = quemPediu;
    let desafiado;
    if (desafiante === 1)
        desafiado = 2;
    else
        desafiado = 1;

    let valorAtual = jogo.valorMesa;

    while (true) {
        if (valorAtual >= 12)
            break;

        let valorPedido = proximoValor(valorAtual);
        let nomeDoAumento = nomeValor(valorPedido);
        let nomeDesafiante = jogo.nomeJogador(desafiante);
        let nomeDesafiado = jogo.nomeJogador(desafiado);

        console.log("\n" + nomeDesafiante + " chamou " + nomeDoAumento + "! (Vale " + valorPedido + " pontos)");

        let acoes = ["aceitar", "correr"];
        if (valorPedido < 12)
            acoes.push("aumentar");

        let resposta = "";

        if (desafiado === 1) {
            console.log("1 - Aceitar (" + valorPedido + " pontos)");
            console.log("2 - Correr (Adversario ganha " + valorAtual + " pontos)");
            if (valorPedido < 12) {
                let proximo = proximoValor(valorPedido);
                console.log("3 - Chamar " + nomeValor(proximo) + "!");
            }

            let escolha = await terminal.question("Sua resposta: ");
            while (true) {
                if (escolha === "1") {
                    resposta = "aceitar";
                    break;
                }
                else if (escolha === "2") {
                    resposta = "correr";
                    break;
                }
                else if (escolha === "3" && valorPedido < 12) {
                    resposta = "aumentar";
                    break;
                }
                else {
                    escolha = await terminal.question("Opcao invalida, escolha novamente: ");
                }
            }
        }
        else {
            resposta = jogo.p2.escolherAcao(acoes);
            console.log(nomeDesafiado + " escolheu: " + resposta);
        }

        if (resposta === "aceitar") {
            jogo.valorMesa = valorPedido;
            console.log("Aposta aceita! A mao agora vale " + jogo.valorMesa + " pontos.");
            return true;
        }

        if (resposta === "correr") {
            console.log(nomeDesafiado + " correu!");
            console.log(nomeDesafiante + " ganhou " + valorAtual + " pontos.");

            jogo.darPontos(desafiante, valorAtual);
            return false;
        }

        valorAtual = valorPedido;
        let temp = desafiante;
        desafiante = desafiado;
        desafiado = temp;
    }

    return true;
}

async function jogarTurno(jogo, jogador, rodada, jaEscondeu, deveMostrarMaior, maoDeDez, maoDeFerro) {
    let mao;
    if (jogador === 1)
        mao = jogo.maoP1;
    else
        mao = jogo.maoP2;

    if (deveMostrarMaior) {
        let idxMaior = maiorCarta(mao);
        let jogada = jogo.jogarCarta(jogador, idxMaior, false);
        let nomeJog = jogo.nomeJogador(jogador);

        console.log("Cangou na primeira! " + nomeJog + " e obrigado a mostrar sua maior carta: " + jogada.carta.getNome());

        return {
            jogada: jogada,
            correu: false
        };
    }

    if (jogador === 1) {
        let podePedir = podePedirTruco(jogo.valorMesa, maoDeDez, maoDeFerro);

        while (true) {
            console.log("\nSua vez (Placar: " + jogo.pontosP1 + " x " + jogo.pontosP2 + " | Mao vale: " + jogo.valorMesa + ")");
            mostrarMao(mao, maoDeFerro);

            console.log("1 - Jogar carta");

            let podeVirar = podeEsconder(rodada, maoDeDez, maoDeFerro, jaEscondeu);
            if (podeVirar)
                console.log("2 - Jogar carta escondida (virada)");

            if (podePedir) {
                let proxValor = proximoValor(jogo.valorMesa);
                console.log("3 - Chamar " + nomeValor(proxValor) + "!");
            }

            let opcao = await terminal.question("Escolha uma acao: ");

            if (opcao === "3" && podePedir) {
                let aceitou = await pedirTruco(jogo, 1);
                if (!aceitou)
                    return { correu: true };

                podePedir = false;
                continue;
            }

            if (opcao === "1") {
                let escolha = await terminal.question("Escolha a carta (1 a " + mao.length + "): ");
                let idx = Number(escolha) - 1;

                while (idx < 0 || idx >= mao.length || isNaN(idx)) {
                    escolha = await terminal.question("Numero invalido. Escolha de 1 a " + mao.length + ": ");
                    idx = Number(escolha) - 1;
                }

                let jogada = jogo.jogarCarta(1, idx, false);

                if (maoDeFerro)
                    console.log("Voce jogou no escuro e virou: " + jogada.carta.getNome());
                else
                    console.log("Voce jogou: " + jogada.carta.getNome());

                return {
                    jogada: jogada,
                    correu: false
                };
            }

            if (opcao === "2" && podeVirar) {
                let escolha = await terminal.question("Qual carta deseja jogar escondida (1 a " + mao.length + "): ");
                let idx = Number(escolha) - 1;

                while (idx < 0 || idx >= mao.length || isNaN(idx)) {
                    escolha = await terminal.question("Numero invalido. Escolha de 1 a " + mao.length + ": ");
                    idx = Number(escolha) - 1;
                }

                let jogada = jogo.jogarCarta(1, idx, true);
                console.log("Voce jogou uma carta escondida.");

                return {
                    jogada: jogada,
                    correu: false
                };
            }

            console.log("Opcao invalida!");
        }
    }
    else {
        let podePedir = podePedirTruco(jogo.valorMesa, maoDeDez, maoDeFerro);
        let podeVirar = podeEsconder(rodada, maoDeDez, maoDeFerro, jaEscondeu);

        if (podePedir && Math.random() < 0.25) {
            let aceitou = await pedirTruco(jogo, 2);
            if (!aceitou)
                return { correu: true };
        }

        if (podeVirar && Math.random() < 0.15) {
            let idx = jogo.p2.escolherCarta(mao);
            let jogada = jogo.jogarCarta(2, idx, true);
            console.log(jogo.p2.nome + " jogou uma carta escondida.");

            return {
                jogada: jogada,
                correu: false
            };
        }
        else {
            let idx = jogo.p2.escolherCarta(mao);
            let jogada = jogo.jogarCarta(2, idx, false);

            if (maoDeFerro)
                console.log(jogo.p2.nome + " jogou no escuro e virou: " + jogada.carta.getNome());
            else
                console.log(jogo.p2.nome + " jogou: " + jogada.carta.getNome());

            return {
                jogada: jogada,
                correu: false
            };
        }
    }
}

async function jogarMao(jogo) {
    jogo.valorMesa = 2;
    jogo.darCartas();

    let maoDeFerro = (jogo.pontosP1 === 10 && jogo.pontosP2 === 10);
    let maoDeDez = !maoDeFerro && (jogo.pontosP1 === 10 || jogo.pontosP2 === 10);

    console.log("\nPlacar: " + jogo.p1.nome + " " + jogo.pontosP1 + " x " + jogo.pontosP2 + " " + jogo.p2.nome);
    console.log("Mao comeca com: " + jogo.nomeJogador(jogo.quemComeca));

    if (maoDeFerro) {
        console.log("\nMao de Ferro! (10 x 10)");
        console.log("Os dois jogadores jogam no escuro.");
        jogo.valorMesa = 2;
    }
    else if (maoDeDez) {
        console.log("\nMao de Dez!");

        if (jogo.pontosP1 === 10) {
            console.log("\nSuas cartas para a Mao de Dez:");
            mostrarMao(jogo.maoP1);

            console.log("1 - Jogar a mao (Vale 4 pontos)");
            console.log("2 - Correr (Adversario ganha 2 pontos)");

            let escolha = await terminal.question("Qual sua decisao? ");
            while (escolha !== "1" && escolha !== "2")
                escolha = await terminal.question("Opcao invalida (1 para jogar, 2 para correr): ");

            if (escolha === "2") {
                console.log("Voce correu da Mao de Dez. Bot ganha 2 pontos.");
                jogo.darPontos(2, 2);
                jogo.trocarQuemComeca();
                return;
            }

            console.log("Voce aceitou jogar a Mao de Dez! A mao vale 4 pontos.");
        }
        else {
            console.log("Bot esta avaliando as cartas dele na Mao de Dez...");
            let decisao = jogo.p2.decidirMaoDeDez(jogo.maoP2);

            if (decisao === "correr") {
                console.log("Bot correu da Mao de Dez! Voce ganha 2 pontos.");
                jogo.darPontos(1, 2);
                jogo.trocarQuemComeca();
                return;
            }

            console.log("Bot aceitou jogar a Mao de Dez! A mao vale 4 pontos.");
        }

        jogo.valorMesa = 4;
    }

    let resultados = [];
    let lider = jogo.quemComeca;
    let quemAbriuPrimeira = jogo.quemComeca;

    for (let rodada = 1; rodada <= 3; rodada++) {
        console.log("\nRodada " + rodada + " (Mesa: " + jogo.valorMesa + " pts)");

        let outro;
        if (lider === 1)
            outro = 2;
        else
            outro = 1;

        let liderDeveMostrarMaior = (rodada === 2 && resultados[0] === 0 && lider === quemAbriuPrimeira);
        let outroDeveMostrarMaior = (rodada === 2 && resultados[0] === 0 && outro === quemAbriuPrimeira);

        let turnoLider = await jogarTurno(
            jogo,
            lider,
            rodada,
            false,
            liderDeveMostrarMaior,
            maoDeDez,
            maoDeFerro
        );

        if (turnoLider.correu) {
            jogo.trocarQuemComeca();
            return;
        }

        let turnoOutro = await jogarTurno(
            jogo,
            outro,
            rodada,
            turnoLider.jogada.escondida,
            outroDeveMostrarMaior,
            maoDeDez,
            maoDeFerro
        );

        if (turnoOutro.correu) {
            jogo.trocarQuemComeca();
            return;
        }

        let jogadaP1;
        let jogadaP2;

        if (lider === 1) {
            jogadaP1 = turnoLider.jogada;
            jogadaP2 = turnoOutro.jogada;
        }
        else {
            jogadaP1 = turnoOutro.jogada;
            jogadaP2 = turnoLider.jogada;
        }

        let resultadoRodada = quemGanhaRodada(jogadaP1, jogadaP2);
        resultados.push(resultadoRodada);

        if (resultadoRodada === 1) {
            console.log(jogo.p1.nome + " venceu a " + rodada + "a rodada.");
            lider = 1;
        }
        else if (resultadoRodada === 2) {
            console.log(jogo.p2.nome + " venceu a " + rodada + "a rodada.");
            lider = 2;
        }
        else {
            console.log("Cangou! A " + rodada + "a rodada empatou.");
        }

        let vencedorMao = quemGanhaMao(resultados, jogo.quemComeca);
        if (vencedorMao !== null) {
            if (vencedorMao === 1) {
                jogo.darPontos(1, jogo.valorMesa);
                console.log("\n" + jogo.p1.nome + " ganhou a mao! (+" + jogo.valorMesa + " pontos)");
            }
            else {
                jogo.darPontos(2, jogo.valorMesa);
                console.log("\n" + jogo.p2.nome + " ganhou a mao! (+" + jogo.valorMesa + " pontos)");
            }

            jogo.trocarQuemComeca();
            return;
        }
    }

    jogo.trocarQuemComeca();
}

async function iniciar() {
    let p1 = { nome: "Voce" };
    let p2 = new BotDumb("BotDumb");
    let jogo = new Jogo(p1, p2);

    console.log("Truco Mineiro - CEFET MG");
    console.log(jogo.p1.nome + " vs " + jogo.p2.nome + "\n");

    while (jogo.pontosP1 < 12 && jogo.pontosP2 < 12)
        await jogarMao(jogo);

    console.log("\nFim de partida!");
    console.log("Placar Final: " + jogo.p1.nome + " " + jogo.pontosP1 + " x " + jogo.pontosP2 + " " + jogo.p2.nome);

    if (jogo.pontosP1 >= 12)
        console.log("Voce venceu a partida!");
    else
        console.log("BotDumb venceu a partida!");

    terminal.close();
}

iniciar();
