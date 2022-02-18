/* Solicitar ao usuário a inclusão de palavra chave */
var chaveInicial = prompt("Digite uma palavra ou deixe em branco para usar uma palavra oculta");

/*Transformar o texto chave para maiúsculas*/
function maiuscula(texto) {
	p = texto.toUpperCase();
	return p
}

var palavraChave = maiuscula(chaveInicial)

/*Se o usuário deixar o texto em branco, usar uma palavra da lista "oculta" hehehehe*/
if (palavraChave == "") {
    var oculto = ["LOBISOMEM", "VAMPIRO", "MUMIA", "ASSOMBRADO", "FANTASMA", "BOOOOO", "MONSTRO", "TERROR", "MACABRO", "ESPANTOSO", "APAVORANTE", "INFERNAL","OCULTISTA"]
    var numero = Math.floor(Math.random() * oculto.length);
    palavraChave = oculto[numero];
}

/*Transformar a palavra em um array*/
var arr = Array.from(palavraChave);

/*Função para imprimir os campos da palavra chave*/
function forca() {
	for(i = 0; i < arr.length; i++) {
		ctx.moveTo(80+(50*i), 585);
		ctx.lineTo(120 + (50 * i), 585);
		ctx.strokeStyle = '#000000';
		ctx.stroke();
	}
}

/* Construção do boneco para cada pedaço */
var imagens = ["Base.jpg", "Rosto_Normal.png", "Body.png", "Arm_Left.png", "Arm_Right.png", "Foot_Left.png", "Foot_Right.png", "Rosto_Surprise.png", "Rosto_Dead.png", "lose.png", "win.png"]
var posiX = [295, 450, 525, 600, 480, 590, 470, 450, 450, 90, 90]
var posiY = [-15, 90, 345, 355, 355, 510, 510, 90, 105, 200, 200]


function objetos(indice) {
	var imageObj = new Image();

	imageObj.onload = function () {
		ctx.drawImage(imageObj, posiX[indice], posiY[indice]);
	};
	imageObj.src = imagens[indice];
}

objetos(0)

/* Variáveis para controle */
var acertou = 0;
var errou = 0;
var errados = [];
var acertou = [];
var letrasPressionadas = [];
var pressed = document.getElementById('pressed');

/*Função para capturar teclas pressionadas*/
function keyPressed(evt){
    evt = evt || window.event;
    var key = evt.keyCode || evt.which;
    return String.fromCharCode(key); 
}

/*Armazena teclas pressionadas var[indice] = tecla pressionada e letrasPressionadas = string completa de teclas */
document.onkeypress = function (evt) {
	if (errou < 6 && acertou < arr.length) {
		var str = maiuscula(keyPressed(evt));
		if (letrasPressionadas.indexOf(str[0]) == -1) {
			letrasPressionadas.push(str);
		}
		if (arr.indexOf(str[0]) == -1) {
			errados.push(str)
			errou++;
			if (errou >= 1) {
				objetos(1)
				ctx.font = "30px Arial";
				ctx.fillStyle = "black";
				ctx.fillText("Tentativas erradas:", 80, 450);
			}
			if (errou >= 2) {
				objetos(2)
			}
			if (errou >= 3) {
				objetos(3)
			}
			if (errou >= 4) {
				objetos(4)
				objetos(7)
			}
			if (errou >= 5) {
				objetos(5)
			}
			if (errou >= 6) {
				objetos(6)
				objetos(8)
				objetos(9)
				ctx.font = "30px Arial";
				ctx.fillStyle = "black";
				ctx.fillText("A palavra escolhida era:", 80, 110);
				ctx.fillText(palavraChave, 80, 140);
			}
			ctx.fillText(errados, 80, 480);
		}
		else {
			for (let f = 0; f < arr.length; f++) {
				if (arr[f] == str[0]) {
					ctx.fillText(arr[f], (50 * f) + 90, 580);
					acertou++;
					/*for (let g = 0; g < acertou.length; g++) {
						if (acertou[g] == str[0]) {
							acertou.push(str)
							acertou++;
						}
					}*/
					if (acertou == arr.length) {
					objetos(10)
					}
				}
			}
		}
	}
}

/*Chama a função forca para imprimir as letras no canvas*/
var c = document.getElementById("jogoCanvas");
var ctx = c.getContext("2d");
ctx.font = "30px Arial";
var radius = 45;
forca()

/*Função para dar reload na página para inclusão de nova palavra*/
function limpar() {
    location.reload();
}

/*Botão para dar o reload na página*/
bNovaPalavra.addEventListener("click", limpar);


/* Função para reiniciar o jogo com a mesma palavra*/
function restart() {
	ctx.clearRect(0, 0, 1024, 768);
	acertou = 0;
	errou = 0;
	errados = [];
	letrasPressionadas = [];
	str = [];
	objetos(0)
	forca()
}
/*Botão para reiniciar o jogo*/
bReiniciar.addEventListener("click", restart);