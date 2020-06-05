class Game {
  constructor(game) {
    /* PROPERTY USED FOR ALL GAMES */
    this.game = game; //Game chosen
  	this.instruction; //Instruction's game
  	this.proposition; //Proposition to play the game
  	this.information = "Tu veux gagner plus de points ? Joue et essaie d'être la/le plus rapide ! Avec ces points, bénéficie de services"; //What is this pop-up ?
  	this.title; //Title of the window
  	this.quit; //Quit button
  	this.cross; //cross button
  	this.play; //play button
  	this.window; //Pop-up window
  	this.timer; //Chrono's time
  	this.time; //The chrono's setInterval
  	this.playWindow; //The play div in the window

  	/* PROPERTY NOT NECCESARRY USED */
  	this.stockInterval; //A variable to stock another interval
  	this.form; //A varialbe to stock a form
  	this.input; //A varable to stock an input
  	this.score; //A variable to stock a precise score



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

  //Create pop-up windows
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

  //Listen the button
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
			parent.memory();
		} else {
			console.log("Debugging : modify the class execution");
		}
		
		
	};
  }

  //Clear / close the window
  clear() {
  	if (this.stockInterval !== undefined) {
  		clearInterval(this.stockInterval);
  	}
  	document.body.filter = "none";
  	this.window.remove();
  }

  //Prevent the input to refresh the web page
  preventDefaultForm(){	
		function prevent(event) { 
			event.preventDefault(); 
		} 
		this.form.addEventListener('submit', prevent);
	}

	//timer_up of the minigame
	timer_up() {
		var time = this.timer;
		//console.log(temps);
		var timer_up = this.timer.innerHTML;
		var milli;
		var secondes;
		var minutes;

		this.time = setInterval(function(){ 
			 //timer_upmetre
			 timer_up++;
			 milli = timer_up%100;
			 secondes = ((timer_up-milli)/100)%60;

			 minutes = Math.floor(((timer_up-milli)/100)/60);
			 time.innerHTML = minutes + ":" +secondes + ":" + milli;
			 
		}, 10);
		
	}

	//timer_down of the minigame
	timer_down(para, score = 100) {
		var time = this.timer;
		var parent = this;
		//console.log(temps);
		var timer_down = para*6000;
		var milli;
		var secondes;
		var minutes;
		this.time = setInterval(function(){ 
			 //timer_upmetre
			 timer_down--;
			 milli = timer_down%100;
			 secondes = ((timer_down-milli)/100)%60;

			 minutes = Math.floor(((timer_down-milli)/100)/60);
			 time.innerHTML = minutes + ":" +secondes + ":" + milli;

			 if (timer_down<=0) {
			 	clearInterval(parent.time);
			 	parent.victory(score);
			 }
		}, 10);
		
	}

	//If the user wins the mini-game
	victory(finalScore) {
			clearInterval(this.time);
			clearInterval(this.stockInterval);
			
			var victory = document.createElement('div');
			victory.style.display = "flex";
			victory.style.flexDirection = "column";
			victory.style.alignItems = "center";

			var title = document.createElement('h3');
			title.innerHTML = "Bien joué !";
			
			var star = document.createElement('img');
			star.setAttribute('src', 'img/star.svg');

			var congrats = document.createElement('p');
			congrats.innerHTML = "Mini-jeu gagné !";

			var timer = document.createElement('div');
			timer.style.display = "flex";
			timer.style.flexDirection = "row";

			var timerImage = document.createElement("img");
			timerImage.setAttribute("src", "img/timer.svg");

			var timerValue = document.createElement("h3");
			timerValue.style.margin = "15px";
			timerValue.innerHTML = this.timer.innerHTML;
			timer.appendChild(timerImage);
			timer.appendChild(timerValue);

			var score = document.createElement('div');
			score.style.display = "flex";
			score.style.flexDirection = "row";

			var scoreImage = document.createElement("img");
			scoreImage.setAttribute("src", "img/coins.svg");

			var scoreValue = document.createElement("h3");
			scoreValue.style.margin = "15px";
			scoreValue.innerHTML = finalScore.innerHTML;
			score.appendChild(scoreImage);
			score.appendChild(scoreValue);

			var tick = document.createElement("img");
			tick.setAttribute("src", "img/validate.svg");
			tick.style.width = "14%";
			tick.style.marginBottom = "5%";

			victory.appendChild(title);
			victory.appendChild(star);
			victory.appendChild(congrats);
			/*victory.appendChild(timer);*/
			victory.appendChild(score);
			victory.appendChild(tick);

			this.window.appendChild(victory);
			//Send the score

			this.playWindow.remove();
	}

	//T'es dans le flou mini-jeu
  flou() {
  	//To access to the object in intervals
  	var parent = this;
  	
	var game = document.createElement('div');
	game.setAttribute( 'class', 'game' );

	var consignes = document.createElement('p');
	consignes.setAttribute( 'class', 'consigne' );
	consignes.innerHTML = this.instruction;

	var score = document.createElement('p');
	score.setAttribute( 'class', 'consigne' );
	score.innerHTML = '0';
	this.score = score;

	var time = document.createElement('p');
	time.setAttribute( 'class', 'temps' );
	time.innerHTML = "0";
	this.timer = time;

	var imageArray = [];
	imageArray.push('crepe fraise.jpg');
	imageArray.push('pita.jpg');
	imageArray.push('potatoe avec steak.jpg');
	imageArray.push('poulet potatoe.jpg');
	imageArray.push('riz carotte.jpg');
	imageArray.push('salade originale.jpg');
	imageArray.push('toast, oeuf et salade.jpg');
	var randomImg = Math.floor(Math.random()*7);
	console.log(imageArray);

	/* IMAGE TO IMPORT FROM DB */
	var picture = document.createElement('img');
	picture.setAttribute( 'src', 'imgflou/' + imageArray[randomImg] );
	var answerPicture = picture.getAttribute('src');
	picture.setAttribute( 'class', 'image-question' );
	picture.style.maxWidth ="90%";
	picture.style.borderRadius ="50px";
	picture.style.marginBottom = "20%";
	picture.style.filter = "blur(15px)";
	

	/* RESPONSE PART */
	var answerArray = [];
	var randomized;
	var canPush;
	answerArray.push(answerPicture);
	for (var i = 1; i < 4; i++) {
		
		do {
			randomized = Math.floor(Math.random()*7);
			if (!answerArray.includes(imageArray[randomized]) && !answerArray.includes('imgflou/' + imageArray[randomized])) {
				canPush = true;
			} else {
				canPush = false;
			}
		} while(canPush == false);
		answerArray[i] = imageArray[randomized];
	}
	
	for (var i = 0; i < answerArray.length; i++) {
		answerArray[i] = answerArray[i].replace('imgflou/', '');
		answerArray[i] = answerArray[i].replace('.jpg', '');
	}
	
	var answerDiv = document.createElement('div');
	answerDiv.setAttribute( 'class', 'answers' );
	answerDiv.style.display = "flex";
	answerDiv.style.flexDirection = "column";

	var answer = [];
	answer[0] = document.createElement('p');
	answer[0].setAttribute( 'class', 'answer' );
	answer[0].style.cursor = "pointer";
	answer[0].style.width = "40%";
	answer[0].style.border = "solid";
	answer[0].style.borderWidth = "1px";
	answer[0].style.borderRadius = "15px";

	answer[1] = document.createElement('p');
	answer[1].setAttribute( 'class', 'answer' );
	answer[1].style.cursor = "pointer";
	answer[1].style.width = "40%";
	answer[1].style.border = "solid";
	answer[1].style.borderWidth = "1px";
	answer[1].style.borderRadius = "15px";

	answer[2] = document.createElement('p');
	answer[2].setAttribute( 'class', 'answer' );
	answer[2].style.cursor = "pointer";
	answer[2].style.width = "40%";
	answer[2].style.border = "solid";
	answer[2].style.borderWidth = "1px";
	answer[2].style.borderRadius = "15px";

	answer[3] = document.createElement('p');
	answer[3].setAttribute( 'class', 'answer' );
	answer[3].style.cursor = "pointer";
	answer[3].style.width = "40%";
	answer[3].style.border = "solid";
	answer[3].style.borderWidth = "1px";
	answer[3].style.borderRadius = "15px";

	var answerStock = [];
	for (var i = 0; i < 4; i++) {
		
		do {
			randomized = Math.floor(Math.random()*4);
			if (!answerStock.includes(answerArray[randomized])) {
				canPush = true;
			} else {
				canPush = false;
			}
		} while(canPush == false);
		answerStock[i] = answerArray[randomized];
		answer[i].innerHTML = answerArray[randomized];
	}

	var answerDiv12 = document.createElement('div');
	answerDiv12.setAttribute( 'class', 'answers12' );
	answerDiv12.style.display = "flex";
	answerDiv12.style.flexDirection = "row";
	answerDiv12.style.justifyContent = "space-around";
	answerDiv12.appendChild(answer[0]);
	answerDiv12.appendChild(answer[1]);

	var answerDiv34 = document.createElement('div');
	answerDiv34.setAttribute( 'class', 'answers34' );
	answerDiv34.style.display = "flex";
	answerDiv34.style.flexDirection = "row";
	answerDiv34.style.justifyContent = "space-around";
	answerDiv34.appendChild(answer[2]);
	answerDiv34.appendChild(answer[3]);

	answerDiv.appendChild(answerDiv12);
	answerDiv.appendChild(answerDiv34);
	

	
	//Elements creation in page
	game.appendChild(consignes);
	game.appendChild(this.score);
	game.appendChild(this.timer);
	game.appendChild(picture);
	game.appendChild(answerDiv);
	
	
	
	this.playWindow = game;
	this.window.appendChild(this.playWindow);
	

	var parameter = 15;
	var style = "max-width:90%;	border-radius:50px;	margin-bottom:20%;"
	this.stockInterval = setInterval(function(){ 
			 //Blurry
			 if (parameter>0) {
			 	parameter-=0.5;
			 	var flou = document.getElementsByClassName('image-question');
				flou[0].setAttribute( 'style', 'filter:blur('+parameter+'px);'+style );
				if (parameter<=0) {
					clearInterval(this.stockInterval);
				}
				
			 }
			 
			 
		}, 1000);
	this.timer_down(0.5, parent.score);
	
	var score = 0;
	var buttons = [];
	var answers = this.window.querySelectorAll('.answer');
	for (var elements of answers) {
		buttons.push(elements);
	}
	for (var elements of answers) {
		elements.addEventListener('click', function(){
			var answerClicked = this;
			parameter=15;
			if ((answerPicture.replace('imgflou/', '')).replace('.jpg', '') == this.innerHTML) {
				score++;
				parent.score.innerHTML = score;
				var flou = document.getElementsByClassName('image-question');
				flou[0].setAttribute( 'style', 'filter:blur(15px);'+style );
				randomImg = Math.floor(Math.random()*7);

				
				clearInterval(parent.stockInterval);
					parent.stockInterval = setInterval(function(){ 
			 		//Blurry
			 		if (parameter>0) {
			 			parameter-=0.5;
						flou[0].setAttribute( 'style', 'filter:blur('+parameter+'px);'+style );

						if (parameter<=0) {
							clearInterval(parent.stockInterval);
						}
					
				 	}
			 
			 
				}, 1000);
				flou[0].setAttribute('src', 'imgflou/' + imageArray[randomImg]);
				answerPicture = imageArray[randomImg];
				console.log(answerPicture);
				var answerArray = [];
				var randomized;
				var canPush;
				answerArray.push(answerPicture);
				for (var i = 1; i < 4; i++) {
		
					do {
						randomized = Math.floor(Math.random()*7);
						if (!answerArray.includes(imageArray[randomized])) {
							canPush = true;
						} else {
							canPush = false;
						}
					} while(canPush == false);
					answerArray[i] = imageArray[randomized];
				}
				
				for (var i = 0; i < answerArray.length; i++) {
					answerArray[i] = answerArray[i].replace('imgflou/', '');
					answerArray[i] = answerArray[i].replace('.jpg', '');
				}

				var answerStock = [];
				for (var i = 0; i < 4; i++) {
		
					do {
						randomized = Math.floor(Math.random()*4);
						if (!answerStock.includes(answerArray[randomized])) {
							canPush = true;
						} else {
							canPush = false;
						}
					} while(canPush == false);
					answerStock[i] = answerArray[randomized];
					buttons[i].innerHTML = answerArray[randomized];
				}
			} else {
				var flou = document.getElementsByClassName('image-question');
				flou[0].setAttribute( 'style', 'filter:blur(15px);'+style );
				randomImg = Math.floor(Math.random()*7);

				
				clearInterval(parent.stockInterval);
					parent.stockInterval = setInterval(function(){ 
			 		//Blurry
			 		if (parameter>0) {
			 			parameter-=0.5;
						flou[0].setAttribute( 'style', 'filter:blur('+parameter+'px);'+style );

						if (parameter<=0) {
							clearInterval(parent.stockInterval);
						}
					
				 	}
			 
			 
				}, 1000);
				flou[0].setAttribute('src', 'imgflou/' + imageArray[randomImg]);
				answerPicture = imageArray[randomImg];
				console.log(answerPicture);
				var answerArray = [];
				var randomized;
				var canPush;
				answerArray.push(answerPicture);
				for (var i = 1; i < 4; i++) {
		
					do {
						randomized = Math.floor(Math.random()*7);
						if (!answerArray.includes(imageArray[randomized])) {
							canPush = true;
						} else {
							canPush = false;
						}
					} while(canPush == false);
					answerArray[i] = imageArray[randomized];
				}
				
				for (var i = 0; i < answerArray.length; i++) {
					answerArray[i] = answerArray[i].replace('imgflou/', '');
					answerArray[i] = answerArray[i].replace('.jpg', '');
				}

				var answerStock = [];
				for (var i = 0; i < 4; i++) {
		
					do {
						randomized = Math.floor(Math.random()*4);
						if (!answerStock.includes(answerArray[randomized])) {
							canPush = true;
						} else {
							canPush = false;
						}
					} while(canPush == false);
					answerStock[i] = answerArray[randomized];
					buttons[i].innerHTML = answerArray[randomized];
				}
			}
		});
	}

	
	
  }

  memory() {
  	//To access to the object in intervals
  	var parent = this;
  	
	//Creation of the play game
	var game = document.createElement('div');
	game.setAttribute( 'class', 'game' );

	var consignes = document.createElement('p');
	consignes.setAttribute( 'class', 'consigne' );
	consignes.innerHTML = this.instruction;

	var time = document.createElement('p');
	time.setAttribute( 'class', 'temps' );
	time.innerHTML = 0;
	this.timer = time;

	var score = document.createElement('p');
	score.setAttribute( 'class', 'score' );
	score.innerHTML = "0";
	this.score = score;

	game.appendChild(consignes);
	game.appendChild(this.timer);
	game.appendChild(this.score);
	this.playWindow = game;
	this.window.appendChild(this.playWindow);

	//Image selection
	var dossier = "imgmemory/";
	var jpg = ".jpg";
	var png = ".png";
	var derriere = 'derriere.jpg';
	var stockLink = [];
	var stockOrder = [];
	var stockCard;
	var stockMemory = [];
	var img;
	var imgHTML;
	var canPush;
	/* WITHOUT DB'S LINK */
	for (var i = 0; i < 10; i++) {
		
		do {
			var random = Math.floor(Math.random()*9)+1;
			img = dossier + random;



			if (Math.random() >= 0.5) {
				img += jpg;
			} else {
				img += png;
			}
			
			if (stockLink.includes(img) != true) {
				canPush = true;
			} else {
				canPush = false;
			}

		} while (canPush == false);
		stockLink.push(img);
		stockLink.push(img);

	}

	console.log("Change db's link here");
	/* WITH DB'S LINK */
	/* for (var i = 0; i < 10; i++) {
		
		do {
			Select img in DB


			
			if (stockLink.includes(img) != true) {
				canPush = true;
			} else {
				canPush = false;
			}

		} while (canPush == false);
		stockLink.push(img);
		stockLink.push(img);

	} */
	
	/* WHEN ALL PICTURES ARE STOCKED */
	for (var i = 0; i < stockLink.length; i++) {
		
		//Chose a random number to randomize the memory's card order
		do {
			var random = Math.floor(Math.random()*20);
			
			if (!stockOrder.includes(random)) {
				stockOrder.push(random);
				
			}
			
		} while(stockOrder[i] == undefined);

		//PLace an image
		imgHTML = document.createElement('img');
		imgHTML.setAttribute( 'src', dossier+derriere );
		imgHTML.setAttribute( 'class', 'memory' );
		imgHTML.setAttribute( 'id', i );
		imgHTML.style.maxWidth = "20%";
		imgHTML.style.borderRadius = "25%";
		imgHTML.style.margin = "2.5%";
		imgHTML.style.cursor = "pointer";
		
		//Stock its value
		stockCard = {
			balise : imgHTML,
			pair : stockLink[random],
		}
		stockMemory.push(stockCard);
		this.playWindow.appendChild(stockCard.balise);

	}
  	
  	//Add an event listener on all cards
  	var allCards = this.window.querySelectorAll('.memory');
  	
  	var nbrCardReturned = 0; //Number of card turned over
  	var cardReturned = []; //Value of the cards turned over
  	var canClick = true; //Allows the user to click
  	var pairFound = 0;

  	for (var elements of allCards) {
  		elements.addEventListener('click', function(){
  			var imgClicked = this;
  			imgClicked.style.transition = 'all 0.5s';
  			if (canClick) {
  				
  				if (nbrCardReturned <2) {
  					
  					//Find the cards's value
  					for (var i = 0; i < stockMemory.length; i++) {
  						//If the card clicked is the same that the card crossed by the for loop, and it's a card not turned over yet
  						if(stockMemory[i].balise.getAttribute('id') == imgClicked.getAttribute('id') && imgClicked.getAttribute('src') == dossier+derriere){
  					
  							//If it's not the card already turned over
  							if (stockMemory[cardReturned[nbrCardReturned-1]] == undefined || stockMemory[cardReturned[nbrCardReturned-1]].balise != imgClicked) {
  								
  								//Turn over the card
  								this.setAttribute('src', stockMemory[i].pair );
  								cardReturned[nbrCardReturned] = stockMemory[i].balise.getAttribute('id');
  								nbrCardReturned++;
  						
  							} 
  						
  					
  						}
  			
  					}
  			
  				
  				} 


  				if (nbrCardReturned == 2) {
  					canClick = false;


  					if(stockMemory[cardReturned[0]].balise.getAttribute('src') == stockMemory[cardReturned[1]].balise.getAttribute('src')){
  						pairFound++;

  						parent.score.innerHTML = pairFound;
  						canClick = true;
  						
  					} else {
  						//To let the user see the cards
  						setTimeout(function(){
  							stockMemory[cardReturned[0]].balise.setAttribute('src', dossier+derriere);
  							stockMemory[cardReturned[1]].balise.setAttribute('src', dossier+derriere);
  							canClick = true;
  						},500);
  						
  						
  						
  					}
  			
  				
  					nbrCardReturned = 0;


  				}

  			}
  			
  		});
  	}
  	var canMix = true;
  	//If the user found all the cards, remix the card
  	this.window.addEventListener('click', function(){
  		//Every ten card
  		if (pairFound%10 == 0 && pairFound != 0) {
  				//Mix all cards
  				if (canMix) {
  					for (var elements of allCards) {
  						elements.setAttribute( 'src', dossier+derriere );
  					}
  					stockLink = [];
  					for (var i = 0; i < 10; i++) {
		
						do {
							var random = Math.floor(Math.random()*9)+1;
							img = dossier + random;



							if (Math.random() >= 0.5) {
								img += jpg;
							} else {
								img += png;
							}
			
							if (stockLink.includes(img) != true) {
								canPush = true;
							} else {
								canPush = false;
							}

						} while (canPush == false);
						stockLink.push(img);
						stockLink.push(img);

					}
					stockOrder = [];
					stockCard = {};
					stockMemory = [];
					for (var i = 0; i < stockLink.length; i++) {
		
						//Chose a random number to randomize the memory's card order
						do {
							var random = Math.floor(Math.random()*20);
			
							if (!stockOrder.includes(random)) {
								stockOrder.push(random);
					
							}
			
						} while(stockOrder[i] == undefined);

		
		
						//Stock its value
						stockCard = {
							balise : document.getElementById(i),
							pair : stockLink[random],
						}
						stockMemory.push(stockCard);
				

					}
  				}	
  					
  			canClick = true;
  			canMix = false;
  			//Reactivate the game
  			for (var elements of allCards) {
  				elements.addEventListener('click', function(){

  				var imgClicked = this;
  				imgClicked.style.transition = 'all 0.5s';
  				if (canClick) {
  					if (nbrCardReturned <2) {
  						canClick = false;
  						//Find the cards's value
  						for (var i = 0; i < stockMemory.length; i++) {
  							//If the card clicked is the same that the card crossed by the for loop, and it's a card not turned over yet
  							
  							if(stockMemory[i].balise.getAttribute('id') == imgClicked.getAttribute('id') && imgClicked.getAttribute('src') == dossier+derriere){
  					
  								//If it's not the card already turned over
  								if (stockMemory[cardReturned[nbrCardReturned-1]] == undefined || stockMemory[cardReturned[nbrCardReturned-1]].balise != imgClicked) {
  									
  									//Turn over the card
  									this.setAttribute('src', stockMemory[i].pair );
  									cardReturned[nbrCardReturned] = stockMemory[i].balise.getAttribute('id');
  									nbrCardReturned++;
  						
  								} 
  						
  					
  							}	
  			
  						}
  					canClick = true;
  				
  					} 


  					if (nbrCardReturned == 2) {
  						canClick = false;


  						if(stockMemory[cardReturned[0]].balise.getAttribute('src') == stockMemory[cardReturned[1]].balise.getAttribute('src')){
  							pairFound++;
  							parent.score.innerHTML = pairFound;
  							setTimeout(function(){canClick = true;},250)
  						} else {
  							//To let the user see the cards
  							setTimeout(function(){
  								stockMemory[cardReturned[0]].balise.setAttribute('src', dossier+derriere);
  								stockMemory[cardReturned[1]].balise.setAttribute('src', dossier+derriere);
  								canClick = true;
  							},750);
  						}
  			
  				
  						nbrCardReturned = 0;

  					}

  			}
  			
  		});
  			}
  			} else {
  				canMix = true;
  			}

  		})
  	
  	this.timer_down(3, parent.score);
  
  }
  	
}

