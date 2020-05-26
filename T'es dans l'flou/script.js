//Fonction qui ferme la fenetre pop-up
function quitter() {
	//Debugage
	//console.log("La fonction est appellee");
	//console.log(document.querySelector(".pop-up"));
	
	document.querySelector(".pop-up").remove();
}

//Fonction qui crée le jeu dans la fenetre + qui gère le jeu
/* L'IMAGE EST ENVOYEE PAR PARAMETRE, A VOIR SI CHANGEMENT */
function creationGame(réponse, SRCimage) {
	
	/*Création de l'espace jeu*/
	/* UNE FONCTION CREATION POPUP EST PEUT ETRE NECESSAIRE */
	var game = document.createElement('div');
	game.setAttribute( 'class', 'game' );

	var consignes = document.createElement('p');
	consignes.setAttribute( 'class', 'consigne' );
	consignes.innerHTML = "Les consignes du jeu. (Pour tester le prototype : la réponse est 'hello')";

	var temps = document.createElement('p');
	temps.setAttribute( 'class', 'temps' );
	temps.innerHTML = "0";

	/* IMAGE A IMPORTER DE LA BD*/
	var image = document.createElement('img');
	image.setAttribute( 'src', SRCimage );
	image.setAttribute( 'class', 'image-question' );
	

	/* PARTIE REPONSE */
	//Formulaire 
	var div = document.createElement('form');
	div.setAttribute( 'class', 'input-submit' );
	div.setAttribute( 'id', 'form' );
	div.setAttribute( 'action', '' );

	//Input texte
	var input = document.createElement('input');
	input.setAttribute( 'type', 'text' );
	input.setAttribute( 'class', 'answer' );
	input.setAttribute( 'placeholder', 'Entre ta réponse' )

	//Boutton sumit
	var submit = document.createElement('div');
	submit.setAttribute( 'class', 'submit' );
	submit.setAttribute( 'type', 'submit' );
	
	//Fleche dans le boutton
	var arrow = document.createElement('img');
	arrow.setAttribute( 'src', 'img/arrow.svg' );
	submit.appendChild(arrow);
	div.appendChild(input);
	div.appendChild(submit);

	//Création des elements dans la page
	game.appendChild(consignes);
	game.appendChild(temps);
	game.appendChild(image);
	
	
	game.appendChild(div);
	document.getElementById('pop-up').appendChild(game);


	/* EXECUTION DU CODE */
	//Stock du chrono
	var hello = chrono();
	

	/* A OPTIMISER */
	//Event de l'user qui clique sur le bouton
	var bouton_submit = document.getElementsByClassName('submit');
	//console.log(bouton_submit[0]);
		bouton_submit[0].addEventListener('click', function(){
			var input = document.getElementsByClassName('answer');
		answer = input[0].value;
		
		
		if (answer==réponse) {
			clearInterval(hello); //on stop le chrono
			console.log("Bien joué tu as trouvé !");
			/*ACTION A FAIRE SI L'USER A TROUVE*/
			
			//montrer le temps
			//montrer l'image ?
			//féliciter le joueur
		
		} else {
			input[0].value = ""; //pour vider l'input
			/*ACTION A FAIRE SI L'USER S'EST TROMPE*/
			
			//Mettre une croix sur l'image
			//Animation ?
		}
	
	});
	
	//Event de l'user qui envoie le formulaire via entrée
	form.addEventListener('submit', function(){
		var input = document.getElementsByClassName('answer');
		answer = input[0].value;
		
		
		if (answer==réponse) {
			clearInterval(hello);
			console.log("Bien joué tu as trouvé !");
			//ACTION A FAIRE SI L'USER A TROUVE
		} else {
			input[0].value = "";
			//ACTION A FAIRE SI L'USER S'EST TROMPE
			//Mettre une croix sur l'image
		}
	
	});
}
	
//Fonction qui lance le chronometre + qui défloute l'image
function chrono() {
	var temps = document.getElementsByClassName('temps')[0];
	//console.log(temps);
	var chrono = document.getElementsByClassName('temps')[0].innerHTML;
	var milli;
	var secondes;
	var score = setInterval(function(){ 
		 //Chronometre
		 chrono++;
		 milli = chrono%100;
		 secondes = ((chrono-milli)/100)%60;

		 minutes = Math.floor(((chrono-milli)/100)/60);
		 temps.innerHTML = minutes + ":" +secondes + ":" + milli;

		 //Floutage
		 var parametre = 30 - ((chrono-milli)/100);
		 var flou = document.getElementsByClassName('image-question');

		 flou[0].setAttribute('style', 'filter:blur('+parametre+'px);');
		


	}, 10);
	return score;
}

//Fonction qui empeche le rafraichissement de la page si le formulaire est submit
function preventForm(){
	
	var form = document.getElementById('form');
	function analyse(event) { 
		event.preventDefault(); 
	} 
	form.addEventListener('submit', analyse);
}

//Fontion qui gere le jeu (surement obsolete)
function game(réponse, interval) {
	//console.log("fonction lancée")
	

	form.addEventListener('submit', function(){
		var input = document.getElementsByClassName('answer');
		answer = input[0].value;
		
		
		if (answer==réponse) {
			clearInterval(interval);
		} else {
			//ACTION A FAIRE SI L'USER S'EST TROMPE
		}
	
	});
}

//Au chargement de la page :
window.onload = function() {
	var bouttonQuitter = document.getElementById('quitter');
	bouttonQuitter.onclick = function(){
		quitter();
	};

	var bouttonClose = document.getElementsByClassName('close');
		bouttonClose[0].onclick = function(){
		quitter();
	};

	var bouttonJouer = document.getElementById('jouer');
	bouttonJouer.onclick = function(){
		document.getElementsByClassName('proposition')[0].remove();
		creationGame("hello", 'img/exemple.jpg');
		//chrono();
		preventForm();
		
		var form = document.getElementById('form');
		
		
	


	};
}

