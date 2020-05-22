/* SCRIPT TO EXECUTE */

/* Literal array stocking the ruler's image, and each letter */
var ruler = {
    img : document.getElementById('ruler'),
    A   : new Zone(document.getElementById('A'), -15, -1),
    B   : new Zone(document.getElementById('B'), 0, 2),
    C   : new Zone(document.getElementById('C'), 3, 10),
    D   : new Zone(document.getElementById('D'), 11, 18),
    E   : new Zone(document.getElementById('E'), 19, 40),
}

/* Variable stocking the cursor */
var cursor = document.getElementById('cursor');
cursor.style.position = 'absolute';

//To position the cursor in the middle of the ruler
cursor.style.top = (ruler.img.offsetTop + ruler.img.height/2 - (cursor.height/2)) + 'px';
cursor.style.left = ruler.img.offsetLeft;
cursor = document.getElementsByClassName('nutri-score')[0].appendChild(cursor);

// XMLHTTP request creation
var req = new XMLHttpRequest();

/* API'S LINK */
var api = "http://recipe.readyplayerweb.com/recipes/312/nutriscore";

req.open("GET", api);
req.setRequestHeader("X-LOCALE", "fr_FR");
req.responseType = 'json';
req.addEventListener("load", function () {
    // Success :
    if (req.status >= 200 && req.status < 400) { 
        //Animation : 
        animation_nutriscore(req.response, ruler, cursor);
    
    //Failure :     
    } else {
        console.error(req.status + " " + req.statusText);
    }
});
req.addEventListener("error", function () {
    // La requête n'a pas réussi à atteindre le serveur
    console.error("Erreur réseau");
});
req.send();
