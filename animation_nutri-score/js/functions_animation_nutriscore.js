/* Function animating the nutriscore bar */
function animation_nutriscore(object, ruler, cursor) {
    //First animation time (here 3 sec)
    var time = 400;
    
    //Final position
    var positionFinal;
    
    //If the nutri-score is x and the score y, assign the Final position variable to the x area in the precise y position
    //The formula is : Area's width in px * (score actual - minimum area's score)/area's range + area's position
    //Prepare the filled letter
    if (object.score>=ruler.A.minimum && object.score<=ruler.A.maximum) {
        positionFinal = Math.floor((ruler.img.width*2/10)*(object.score-ruler.A.minimum)/ruler.A.getRange()) + ruler.img.offsetLeft;
        var finalLetterParameter = "img/A_plein.png";
        var finalLetter = ruler.A.img;
    } else if (object.score>=ruler.B.minimum && object.score<=ruler.B.maximum) {
        positionFinal = Math.floor((ruler.img.width*2/10)*(object.score-ruler.B.minimum)/ruler.B.getRange()) + Math.floor(ruler.img.width*2/10) + ruler.img.offsetLeft;
        var finalLetterParameter = "img/B_plein.png";
        var finalLetter = ruler.B.img;
    } else if (object.score>=ruler.C.minimum && object.score<=ruler.C.maximum) {
        positionFinal = Math.floor((ruler.img.width*2/10)*(object.score-ruler.C.minimum)/ruler.C.getRange()) + Math.floor(ruler.img.width*4/10) + ruler.img.offsetLeft;
        var finalLetterParameter = "img/C_plein.png";
        var finalLetter = ruler.C.img;
    } else if (object.score>=ruler.D.minimum && object.score<=ruler.D.maximum) {
        positionFinal = Math.floor((ruler.img.width*2/10)*(object.score-ruler.D.minimum)/ruler.D.getRange()) + Math.floor(ruler.img.width*6/10) + ruler.img.offsetLeft;
        var finalLetterParameter = "img/D_plein.png";
        var finalLetter = ruler.D.img;
    } else if (object.score>=ruler.E.minimum && object.score<=ruler.E.maximum) {
        positionFinal = Math.floor((ruler.img.width*2/10)*(object.score-ruler.E.minimum)/ruler.E.getRange()) + Math.floor(ruler.img.width*8/10) + ruler.img.offsetLeft;
        var finalLetterParameter = "img/E_plein.png";
        var finalLetter = ruler.E.img;
    }

    //current position
    var currentPosition;

    //Maximum and minimum cursor position
    var max = ruler.img.offsetLeft + Math.floor(ruler.img.width) - 10;
    var min = ruler.img.offsetLeft + 10;

    //Cursor's step (random variable to create suspens)
    var step = 5;
    var random = random_number();
        
    //current direction
    var direction = 'right';

    //Animation before the result
    var animation = setInterval(function() {
        
        step = step + random;
        
        //Step's limits
        if (step>=3.75) {
            step=3.75;
            random-=0.1;
        } else if(step<2 && step>0.6) {
            random-=0.05;
        } else if (step<=0.6) {
            step=0.6;
        }
        //If the cursor moves fast, then it is blurry
        cursor.style.filter = 'blur('+step/5+'px)';
        
        //Random ste each x time
        if (time%50 == 0) {
            random = random_number();
        }

        //current Position
        currentPosition = cursor.offsetLeft;
        
        //Makes the cursor go left to right and vice versa
        if (direction == 'right' && currentPosition<max) {
            cursor.style.left = (cursor.offsetLeft+step) + 'px';

        } else if (currentPosition>=max) {
            direction = 'left';
            cursor.style.left = (cursor.offsetLeft-step) + 'px';

        } else if (direction == 'left' && currentPosition>min) {
            cursor.style.left = (cursor.offsetLeft-step) + 'px';

        } else if (currentPosition<=min) {
            direction = 'right';
            cursor.style.left = (cursor.offsetLeft+step) + 'px';
        }
        
        //countdown
        time--;

        //To change the cursor's color according to the area
        cursorColor(cursor, ruler);

        //when x second passed
        if (time==0) {
            //clear the animation
            clearInterval(animation);
            step = Math.floor(step);

            //Show the result
            var result = setInterval(function() {
                currentPosition = cursor.offsetLeft;
                
                //To change the cursor's color according to the area
                cursorColor(cursor, ruler);
                
                //The farther away the cursor is from the result, the faster it goes and vice-versa
                step = (cursor.offsetLeft-positionFinal)*15/ruler.img.width;
                
                //Convert to absolute value
                if (step<0) {
                    step*=-1;
                }

                //step's minimum limit
                if (step<=0.6) {
                    step = 0.6;
                }

                //If the cursor moves fast, then it is blurry
                cursor.style.filter = 'blur('+step/2+'px)';
                
                //The cursor moves to the result
                if (positionFinal<currentPosition) {
                    cursor.style.left = (cursor.offsetLeft-step) + 'px';
                
                } else if (positionFinal>currentPosition) {
                    cursor.style.left = (cursor.offsetLeft+step) + 'px';
                
                } else if (positionFinal==currentPosition) {
                    clearInterval(result);
                    //save previous image's height
                    var previousHeight = finalLetter.height;

                    //fill the letter
                    finalLetter.setAttribute('src', finalLetterParameter);
                    var newHeight = finalLetter.height;
                    cursor.style.filter = 'blur(0px)';
                    finalLetter.style.marginBottom = previousHeight-newHeight + 'px';
                    


                    //verify the cursor is i, the right spot
                    var cursorImage = 'img/Ellipse_' + object.nutriscore + '.png';
                    cursor.setAttribute('src', cursorImage);
                    
                    //make the letter flash
                    flashing_element(finalLetter);

                    
                }
            
            }, 10)
        }

        

    }, 10)
}

//Function making the cursor's color according to the ruler
function cursorColor(cursor, ruler) {
    currentPosition = cursor.offsetLeft;
    var left = ruler.img.offsetLeft;      
            if (currentPosition>=(ruler.img.width*0/10) + left && currentPosition<(ruler.img.width*2/10) + left) {
                cursor.setAttribute('src', 'img/Ellipse_A.png');
            } else if (currentPosition>=(ruler.img.width*2/10) + left && currentPosition<(ruler.img.width*4/10) + left) {
                cursor.setAttribute('src', 'img/Ellipse_B.png');
            } else if (currentPosition>=(ruler.img.width*4/10) + left && currentPosition<(ruler.img.width*6/10) + left) {
                cursor.setAttribute('src', 'img/Ellipse_C.png');
            } else if (currentPosition>=(ruler.img.width*6/10) + left && currentPosition<(ruler.img.width*8/10) + left) {
                cursor.setAttribute('src', 'img/Ellipse_D.png');
            } else if (currentPosition>=(ruler.img.width*8/10) + left && currentPosition<(ruler.img.width*10/10) + left) {
                cursor.setAttribute('src', 'img/Ellipse_E.png');
            }

            //cursor.setAttribute( 'style', 'filter:blur(5px);' );
}
    
//Function generating a random number between 0.5>1 and -0.5>0
function random_number() {
    var random = Math.random();
    if (random >= 0.5) {
            return random;
        } else {
            return -random;
        }
}

//function making an element flash
function flashing_element(element) {
    var opacity = 100;
    var time = 3;
    element.style.transition =  "all 0.5s";
    
    var flashing = setInterval(function() {
        if (time == 0) {
            clearInterval(flashing);
        }

    

        switch (time) {
            case 5:
                element.style.transform = "scale(1.2)";
                //element.style.marginBottom = -element.height/5 +'px';
                break;            
            case 4:
                element.style.transform = "scale(1)";
                opacity = 30;
                break;
            case 3:
                element.style.transform = "scale(1.3)";
                //element.style.marginBottom = -element.height/3.33 +'px';
                opacity = 100;
                break;
            case 2:
                element.style.transform = "scale(1)";
                opacity = 30;
                break;
            case 1:
                element.style.transform = "scale(1.3)";
                //element.style.marginBottom = -element.height/3.33 +'px';
                opacity = 100;
                break;
        }


        element.style.opacity = opacity + "%";
        time--;

    }, 500)
}

//Class to test the function without the API
/*class Object_recipe {
    constructor(nutriscore, score, color) {
        this.nutriscore = nutriscore;
        this.score = score;
        this.color = color;
    }
}*/