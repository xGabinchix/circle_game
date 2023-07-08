const circulos= document.querySelectorAll(".circulo"); //los circulos del tablero
let puntuacion= 0; //representa la acción del usuario de desaparecer un círculo; cada vez que desaparece un círculo, se suma un punto; es global porque se usará en diferentes funciones/eventos a continuación
const timer= document.querySelector(".timer"); //barra debajo del tablero
let contadorTiempo= null; //para funciones/eventos se usa null (no cero ni comas vacías); luego en el código se modificará su valor
let tiempoInicial= 8;
const perdedor= document.querySelector(".pantallaPerdedor");
const ganador= document.querySelector(".pantallaGanador");
const ganadorFinal= document.querySelector(".pantallaGanadorFinal");
const botonPierde= document.querySelector(".botonPerdedor");
const botonGana= document.querySelector(".botonGanador");
const botonGanaFinal= document.querySelector(".botonGanadorFinal");
let heGanado = false;


botonPierde.addEventListener("click", function(){
	perdedor.style.display="none";
	juego(tiempoInicial);
});

botonGana.addEventListener("click", function(){
	ganador.style.display="none";
	tiempoInicial--;
	juego(tiempoInicial); 
});

botonGanaFinal.addEventListener("click", function(){
	ganadorFinal.style.display="none";
	tiempoInicial=8;
	juego(tiempoInicial);
});

function juego(tiempo){ //el argumento es el TIEMPO límite del juego
	puntuacion = 0; //se reinician los puntos al iniciar (por si se ha jugado antes)
	circulos.forEach(function(circulo){
		circulo.classList.remove("invisible"); //se reinicia la apariencia de los círculos
	});
	timer.innerHTML = ""; //se reinicia el timer; borra las cajitas(divs)
	for(let i=0; i<tiempo ; i++){
		let div= document.createElement("div");
		div.style.width= `calc(${100/tiempo}% - 10px)`; //el 100% del espacio del timer según el tiempo que pase, menos 10px que hay de margen; si son 10 segundos, hay 10 divs ocupando el timer
		timer.appendChild(div);
	};
	contadorTiempo= setInterval(function(){ //esta función hará que desaparezcan los div del timer según pase el tiempo; desaparece un div por segundo
		document.querySelector(".timer div:last-child").remove();
		if(timer.children.length == 0){ //si el timer llega a 0...
			console.log("HAS PERDIDO GIL");
			heGanado = false;
			clearInterval(contadorTiempo);
			perdedor.style.display="flex";
		}
	},1000);
};



circulos.forEach(function(circulo, indice){
	circulo.addEventListener("click", function(){ //Al hacer click en cada círculo...
		circulo.classList.add("invisible");
		puntuacion ++; //se suma un punto con cada click
		if(puntuacion==12){//si puntuación es igual a 12, se gana
			console.log("HAS GANADO PAPU");
			heGanado = true;
			clearInterval(contadorTiempo);
			if(tiempoInicial>5){
				ganador.style.display="flex";
			}else{
				ganadorFinal.style.display="flex";
			}
		};
	});
});

const inicio= document.querySelector(".pantallaInicio")
const botonInicio= document.querySelector(".botonInicio");

botonInicio.addEventListener("click", function(){
	inicio.style.display="none";
	if(heGanado){
		tiempoInicial = tiempoInicial > 4 ? tiempoInicial - 1 : 8;
	}
	juego(tiempoInicial);
});



