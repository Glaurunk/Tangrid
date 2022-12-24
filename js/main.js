// Abords the game on small screens
function DetectDisplay()
{
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    if (window.innerWidth < 1280 || window.innerHeight < 900) {
        console.log('Inside');
        const cont = document.querySelector('.container');
        cont.innerHTML = "";
        const msg = document.createElement('DIV');
        msg.classList.add("small-window-msg");
        msg.innerHTML = "The window of your browser is too small. This game requires a window of minimum 1280 X 900 pixels and a modern browser. Please try loading this page on a up-to-date desktop browser";
        cont.appendChild(msg);
    }
}

// displayes the current year inside the credits
function DisplayYear()
{
    const date =  new Date().getFullYear();
    document.getElementById("year").innerHTML = date;
}


///////////////////////////////////////////////////////
////// INITIALIZATION
///////////////////////////////////////////////////////

//DetectDisplay();
DisplayYear();
// shuffle deck and draw cards
PopulatePlayersHand();
DrawGrid();
DrawPlayerHand(0);
// listen for user input
window.addEventListener('keypress', function(e) { KeyInputHandler(e.key)});
// populate arrays of elements drawn by JS after the Draw functions
cards = Array.from(document.getElementsByClassName('card'));