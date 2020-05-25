class Game {
  constructor(game) {
    this.game = game;
  	this.instruction;
  	this.proposition;
  	this.information = "Tu veux gagner plus de points ? Joue et essaie d'être la/le plus rapide ! Avec ces points, bénéficie de services";
  	this.title;
  	this.quit;
  	this.cross;
  	this.play;
  	this.window;
  	this.timer;
  	this.time;
  	this.stockInterval;
  	this.form;
  	this.input;
  	this.playWindow;



    if (this.game == "flou") {
    	this.title = "T'es dans l'flou";
    	this.instruction = "Devine le plus rapidement possible quel plat se trouve derrière cette image"
    	
    } else if (this.game == "memory") {
    	this.title = "Memory";
    	this.instruction = "Associe les images par paires"
    } else {
    	this.title = "Titre du jeu : " + this.game;
    	console.log("debugging instruction : modify the class's constructor");
    	this.instruction = "Instruction du jeu : " + this.game;
    	console.log("debugging instruction : modify the class's constructor");
    }

    
    this.create();








  }

  create() {
  	
  	/* Pop-up window creation */
  	var pop_up = document.createElement('div');
	pop_up.setAttribute( 'class', 'pop-up' );
	pop_up.setAttribute( 'id', 'pop-up' );
	
	
	/* Cross to close creation */
	var cross = document.createElement('a');
	cross.setAttribute( 'class', 'close' );
	cross.setAttribute( 'href', '#' );
	this.cross = cross;
	pop_up.appendChild(this.cross);
	
	/* Title */
	var title = document.createElement('h2');
	title.setAttribute( 'class', 'titre' );
	title.innerHTML = this.title;
	pop_up.appendChild(title);

	/* first instruction */
	var proposition_div = document.createElement('div');
	proposition_div.setAttribute( 'class', 'proposition' );
	
	/* first instruction's text */
	var proposition_text = document.createElement('p');
	proposition_text.setAttribute( 'class', 'consigne' );
	proposition_text.innerHTML = this.information;
	proposition_div.appendChild(proposition_text);

	/* Button container */
	var button_div = document.createElement('div');
	button_div.setAttribute( 'class', 'boutton-container' );

	/* button quit */
	var button_quit = document.createElement('div');
	button_quit.setAttribute( 'class', 'boutton quitter' );
	button_quit.setAttribute( 'id', 'quitter' );
	button_quit.innerHTML = "Quitter";
	this.quit = button_quit;


	/* button play */
	var button_play = document.createElement('div');
	button_play.setAttribute( 'class', 'boutton jouer' );
	button_play.setAttribute( 'id', 'jouer' );
	button_play.innerHTML = "Jouer";
	this.play = button_play;

	button_div.appendChild(this.quit);
	button_div.appendChild(this.play);
	proposition_div.appendChild(button_div);
	this.proposition=proposition_div;
	pop_up.appendChild(this.proposition);
	this.window= pop_up;
	this.window.style.filter = "opacity(1)";
	this.window.style.boxShadow = "-1px 2px 5px 5px #878787";
	document.body.appendChild(this.window);
	this.listen();
  }

  listen() {
  	var parent = this;
	this.quit.onclick = function(){
		parent.clear();
	};

	
	this.cross.onclick = function(){
		parent.clear();
	};

	
	this.play.onclick = function(){
		parent.proposition.remove();
		
		
		if (parent.game == "flou") {
			console.log("Database link");
			parent.flou('img/exemple.jpg', 'test');
		} else if (parent.game == "memory") {

		} else {
			console.log("Debugging : modify the class execution");
		}
		
		
	};
  }

  clear() {
  	if (this.stockInterval !== undefined) {
  		clearInterval(this.stockInterval);
  	}
  	document.body.filter = "none";
  	this.window.remove();
  }

  flou(SRCimage, answer) {
  	var parent = this;
  	/* UNE FONCTION CREATION POPUP EST PEUT ETRE NECESSAIRE */
	var game = document.createElement('div');
	game.setAttribute( 'class', 'game' );

	var consignes = document.createElement('p');
	consignes.setAttribute( 'class', 'consigne' );
	consignes.innerHTML = this.instruction;

	var time = document.createElement('p');
	time.setAttribute( 'class', 'temps' );
	time.innerHTML = "0";
	this.timer = time;

	/* IMAGE A IMPORTER DE LA BD*/
	var picture = document.createElement('img');
	picture.setAttribute( 'src', SRCimage );
	picture.setAttribute( 'class', 'image-question' );
	picture.style.maxWidth ="90%";
	picture.style.borderRadius ="50px";
	picture.style.marginBottom = "20%";
	picture.style.filter = "blur(15px)";
	

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
	this.input = input;

	//Boutton sumit
	var submit = document.createElement('div');
	submit.setAttribute( 'class', 'submit' );
	submit.setAttribute( 'type', 'submit' );
	
	//Fleche dans le boutton
	var arrow = document.createElement('img');
	arrow.setAttribute( 'src', 'img/arrow.svg' );
	submit.appendChild(arrow);
	div.appendChild(this.input);
	div.appendChild(submit);
	this.form=div;
	//Création des elements dans la page
	game.appendChild(consignes);
	game.appendChild(this.timer);
	game.appendChild(picture);
	
	
	game.appendChild(this.form);
	this.playWindow = game;
	this.window.appendChild(this.playWindow);
	this.preventDefaultForm();

	var parameter = 15;
	var style = "max-width:90%;	border-radius:50px;	margin-bottom:20%;"
	this.stockInterval = setInterval(function(){ 
			 //Floutage
			 if (parameter>0) {
			 	parameter-=0.5;
			 	var flou = document.getElementsByClassName('image-question');
				flou[0].setAttribute( 'style', 'filter:blur('+parameter+'px);'+style );
				
			 }
			 
			 
		}, 1000);
	this.chrono();
	
	this.form.addEventListener('submit', function(){
		
		var user_answer = parent.input.value;
		
		
		if (answer==user_answer) {
			clearInterval(parent.time);
			clearInterval(parent.stockInterval);
			
			var victory = document.createElement('div');
			victory.style.display = "flex";
			victory.style.flexDirection = "column";
			victory.style.alignItems = "center";

			var title = document.createElement('h3');
			title.innerHTML = "Bien joué !";
			
			var star = document.createElement('img');
			star.setAttribute('src', 'img/star.svg');

			var congrats = document.createElement('p');
			congrats.innerHTML = "Mini-jeux gagné !";

			var timer = document.createElement('div');
			timer.style.display = "flex";
			timer.style.flexDirection = "row";

			var timerImage = document.createElement("img");
			timerImage.setAttribute("src", "img/timer.svg");

			var timerValue = document.createElement("h3");
			timerValue.style.margin = "15px";
			timerValue.innerHTML = parent.timer.innerHTML;
			timer.appendChild(timerImage);
			timer.appendChild(timerValue);

			var score = document.createElement('div');
			score.style.display = "flex";
			score.style.flexDirection = "row";

			var scoreImage = document.createElement("img");
			scoreImage.setAttribute("src", "img/timer.svg");

			var scoreValue = document.createElement("h3");
			scoreValue.style.margin = "15px";
			scoreValue.innerHTML = '100';
			score.appendChild(scoreImage);
			score.appendChild(scoreValue);

			var tick = document.createElement("img");
			tick.setAttribute("src", "img/validate.svg");
			tick.style.width = "14%";
			tick.style.marginBottom = "5%";

			victory.appendChild(title);
			victory.appendChild(star);
			victory.appendChild(congrats);
			victory.appendChild(timer);
			victory.appendChild(score);
			victory.appendChild(tick);

			parent.window.appendChild(victory);
			//Send the score

			parent.playWindow.remove();
		} else {
			input.value = "";
			//ACTION A FAIRE SI L'USER S'EST TROMPE
			//Mettre une croix sur l'image
		}
	
	});
  }

  	preventDefaultForm(){	
		function prevent(event) { 
			event.preventDefault(); 
		} 
		this.form.addEventListener('submit', prevent);
	}

	chrono() {
		var time = this.timer;
		//console.log(temps);
		var chrono = this.timer.innerHTML;
		var milli;
		var secondes;
		var minutes;

		this.time = setInterval(function(){ 
			 //Chronometre
			 chrono++;
			 milli = chrono%100;
			 secondes = ((chrono-milli)/100)%60;

			 minutes = Math.floor(((chrono-milli)/100)/60);
			 time.innerHTML = minutes + ":" +secondes + ":" + milli;
			 
		}, 10);
		
	}

}

