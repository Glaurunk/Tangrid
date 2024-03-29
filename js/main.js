// Abords the game on small screens
function DetectDisplay()
{
    if (window.innerWidth < 1280 || window.innerHeight < 800) {
        return false;
    } else {
        return true;
    }
}

// displayes the current year inside the credits
function DisplayYear()
{
    const date =  new Date().getFullYear();
    document.getElementById("year").innerHTML = date;
}

// Applies the current settings
function CheckSettings()
{
    // player order
    playerOrderRbtns.forEach(btn => {
        if (btn.checked) {
            let p = parseInt(btn.dataset.player);
            if (p === 1) playerOrder = 1;
            if (p === 2) playerOrder = 2;
            if (p === 0) playerOrder = Math.round(Math.random(1,2))+1;
        } 
    });
    console.log("Player " + playerOrder + " goes first");
    // difficulty level
    difficultyRbtns.forEach(btn => {
        if (btn.checked) difficulty = parseInt(btn.dataset.difficulty);
    });
    console.log("Difficulty level: " + difficulty);
}

///////////////////////////////////////////////////////
////// INITIALIZATION
///////////////////////////////////////////////////////

const systemRequirements = DetectDisplay();
if (systemRequirements) {
    Clear();
    DisplayYear();
    // shuffle deck and draw cards
    PopulatePlayersHand();
    DrawGrid();
    DrawPlayerHand(0);
    // listen for user input
    window.addEventListener('keypress', function(e) { 
        KeyInputHandler(e.key)
    });
    
    // Initialize the UI
    InitUI();
    // Check and apply current settings
    CheckSettings();
    
    // populate arrays of elements drawn by JS after the Draw functions
    cards = Array.from(document.getElementsByClassName('card'));
    
    // if a restart has been requested start the game immediately
    if (GetCookie('reload') === 'true') { 
        console.log('OK');
        startBtn.dispatchEvent(new Event('click'));
    }
} else {
    console.log('width: ' + window.innerWidth);
    console.log('height:' + window.innerHeight);
    const body = document.getElementById('body');
    body.innerHTML = "";
    const msg = document.createElement('DIV');
    msg.classList.add("small-window-msg");
    msg.innerHTML = "The window of your browser is too small. This version of Tangrid is designed only for desktop computers. The game requires a screen resolution of minimum 1280 X 900 pixels and a modern browser. Please try loading this page on a up-to-date desktop browser";
    body.appendChild(msg);
}
