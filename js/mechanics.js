// Populates the initial players' hand 
function PopulatePlayersHand()
{
    let rand = 0; 
    p1Hand = [];
    p2Hand = [];
    for (let i=0; i<HAND_SIZE; i++)
    {
        rand = Math.floor(Math.random() * p1Tiles.length);
        p1Hand.push(p1Tiles[rand]);
    }
    for (let i=0; i<HAND_SIZE; i++)
    {
        rand = Math.floor(Math.random() * p2Tiles.length);
        p2Hand.push(p2Tiles[rand]);
    }
}

// Selects a tile by a keycode (1-6)
function SelectTile(code)
{
    if (playerOrder === 1 && gameStarted === true)
    {
        const i = parseInt(code) - 1;
        const tile = p1Hand[i];
        const card = document.getElementById(tile.id.toString());
        cards.forEach(card => card.classList.remove('selected'));
        card.classList.add('selected');
        selectedT = card;
        console.log("selected tile " + card.dataset.label + " with id " + card.id);
    }
}

// Rotates the selected tile clockwise by 90 degrees
function RotateTile()
{
    if (!selectedT)  { 
        DisplayMessage('Please select a tile first!');
        return;
    }
    if (playerOrder === 1 && selectedT.dataset.placing != "player1-hand") DisplayMessage('You can rotate only your own tiles');
    else {
        if (!selectedT.style.rotate || selectedT.style.rotate == "0deg") selectedT.style.rotate = "90deg";
        else if (selectedT.style.rotate == "90deg") selectedT.style.rotate = "180deg";
        else if (selectedT.style.rotate== "180deg") selectedT.style.rotate = "270deg";
        else if (selectedT.style.rotate== "270deg") selectedT.style.rotate = "0deg";
        RotateString(selectedT.dataset.label);
    }
}

// Moves the last character inside a 4 characters string to the front
function RotateString(string)
{
    if (string.length != 4) return;
    var b = string.substr(0,3);
    var a = string.substr(3,1);
    selectedT.dataset.label = a+b;
}

// Keyboard Input
function KeyInputHandler(code)
{
    switch(code) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
            SelectTile(code);
            break;
        case 'r':
        case 'R':
            RotateTile();
            break;
        default:
            console.log(code);
            break;
    }
}

// Draws a card for the assigned player
function DrawCard(player)
{
    let rand = 0; 
    if (player == 1) {
        rand = Math.floor(Math.random() * p1Tiles.length);
        p1Hand.push(p1Tiles[rand]);
        DrawPlayerHand(1);
    }
    if (player == 2) {
        rand = Math.floor(Math.random() * p2Tiles.length);
        p2Hand.push(p2Tiles[rand]);
        DrawPlayerHand(2);
    }
    cards = Array.from(document.getElementsByClassName('card'));
    if (activePlayer === 1) DisplayMessage("Player 1 draws one card");
    else DisplayMessage("The Computer draws one card");
}

// Checks if a placing position is valid by comparing neighboring labels
function CheckPlacement(index)
{
    let position = true;                // the returned variable
    let black = false;                  // true if the matching sides are black
    let colorMatch = false;             // true at least one matching side is with color
    let edge = false;                   // true if color faces the outside
    let compT,selT;                     // the characters to compare for matching.
    let match = [];                     // an array of matching pairs
    let adj = GetAdjacentTiles(index);  // The adjacent tiles
    let val = [];                       // the non empty neighbors

    // check if the neighboring tiles are empty and pass the rest to a new array
    for (let i=0; i<adj.length; i++) {
        if (adj[i].tile.label != 'BBBB') val.push(adj[i]);
    }
        
    //if none remain the neighboring tiles are empty break with msg
    if (val.length == 0) {
        if (activePlayer === 1) DisplayMessage('Must place next to an existing tile'); 
        else console.log('Must place next to an existing tile');
        return false;
    }

    //if there are neighboring tiles check for matching
    const top = val.find(tile => { return tile.pos == 'top'});
    if (top) {
        //console.log('top neighbor label: ' + top.tile.label);
        compT = top.tile.label.substr(2,1);
        selT = selectedT.dataset.label.substr(0,1);
        //console.log("comparing top: " + compT + '=' + selT);
        if (selT != compT) position = false;
        if (selT == 'J' || compT == 'J' && selT != 'B' && compT != 'B') position = true;
        if (selT == compT && selT == 'B' && compT == 'B') black = true;
        const newP = new Pair('top',compT+selT);
        if (newP.type != 'BB') colorMatch = true;
        if (position === true) match.push(newP);
    }

    const bottom = val.find(tile => { return tile.pos == 'bottom'});
    if (bottom) {
        //console.log('bottom neighbor label: ' + bottom.tile.label);
        compT = bottom.tile.label.substr(0,1);
        selT = selectedT.dataset.label.substr(2,1);
        //console.log("comparing bottom: " + compT + '=' + selT);
        if (selT != compT) position = false;
        if (selT == 'J' || compT == 'J' && selT != 'B' && compT != 'B') position = true;
        if (selT == compT && selT == 'B' && compT == 'B') black = true;
        const newP = new Pair('bottom',compT+selT);
        if (newP.type != 'BB') colorMatch = true;
        if (position === true) match.push(newP);
    }

    const right = val.find(tile => { return tile.pos == 'right'});
    if (right) {
        //console.log('right neighbor label: ' + right.tile.label);
        compT = right.tile.label.substr(3,1);
        selT = selectedT.dataset.label.substr(1,1);
        //console.log("comparing right: " + compT + '=' + selT);
        if (selT != compT) position = false;
        if (selT == 'J' || compT == 'J' && selT != 'B' && compT != 'B') position = true;
        if (selT == compT && selT == 'B' && compT == 'B') black = true;
        const newP = new Pair('right',compT+selT);
        if (newP.type != 'BB') colorMatch = true;
        if (position === true) match.push(newP);
    }

    const left = val.find(tile => { return tile.pos == 'left'});
    if (left) {
        //console.log('left neighbor label: ' + left.tile.label);
        compT = left.tile.label.substr(1,1);
        selT = selectedT.dataset.label.substr(3,1);
        //console.log("comparing left: " + compT + '=' + selT);
        if (selT != compT) position = false;
        if (selT == 'J' || compT == 'J' && selT != 'B' && compT != 'B') position = true;
        if (selT == compT && selT == 'B' && compT == 'B') black = true;
        const newP = new Pair('left',compT+selT);
        if (newP.type != 'BB') colorMatch = true;
        if (position === true) match.push(newP);
    }

    // Check if the tile faces the edge
    if ((parseInt(index)+GRID_SIZE)%GRID_SIZE === 0) {
        //console.log('FACING TOP');
        if (selectedT.dataset.label.substr(0,1) != 'B') edge = true;;
    }

    if (parseInt(index) > ((GRID_SIZE*GRID_SIZE)-1) - GRID_SIZE) {
        //console.log('FACING RIGHT');
        if (selectedT.dataset.label.substr(1,1) != 'B') edge = true;;
    }

    if ((parseInt(index)+GRID_SIZE)%GRID_SIZE === GRID_SIZE-1) { 
        //console.log('FACING BOTTOM');
        if (selectedT.dataset.label.substr(2,1) != 'B') edge = true;;
    }

    if (parseInt(index) < GRID_SIZE) { 
       // console.log('FACING LEFT');
        if (selectedT.dataset.label.substr(3,1) != 'B') edge = true;;
    }

    //if the tile is facing the edge break with msg
    if (edge === true) {
        if (activePlayer === 1) DisplayMessage('A color side cannot face the edge');
        else console.log('A color side cannot face the edge');
        return false;
    }

    // If the neighboring colors do not match break with msg
    if (position === false) { 
        if (activePlayer === 1) DisplayMessage('Neighboring colors must match');
        else console.log('Neighboring colors must match');
        return false;
    };

    // If the player tries to match black tiles break with msg
    if (black === true && colorMatch === false) {
        if (activePlayer === 1) DisplayMessage('You must match with at least one color side');
        else console.log('You must match with at least one color side');
        return false;
    }
    //console.log("colorMath =" + colorMatch);

    return match;
}

// Returns an array of tiles adjascent to the selected
function GetAdjacentTiles(index)
{
    let adj = [];
    let i = parseInt(index);
    if (i<-1 || i > 24) return;
    // add the previous (top) tile
    if (i - 1 > -1 && i !== 5 && i != 10 && i != 15 && i !=20) adj.push(new AdjTile('top',gridTiles[i-1]));
    // add the right tile
    if (i + GRID_SIZE < 25) adj.push(new AdjTile('right',gridTiles[i+GRID_SIZE]));
    //add the next (bottom) tile
    if (i + 1 < 25 && i != 4 && i != 9 && i != 14 && i != 19) adj.push(new AdjTile('bottom',gridTiles[i+1]));
    // add the left tile
    if (i - GRID_SIZE > -1) adj.push(new AdjTile('left', gridTiles[i-GRID_SIZE]));
    
    if (adj.length > 0) return adj;
    else console.log("GetAdjascentTiles: Error fetching the adjascent tiles");
}

// Updates the score for a player
function UpdateScore(index,match,player,value)
{
    let i=0;
    let p1s = 0;
    let p2s = 0;
    let message = ""; 
    let ss = parseInt(value) > 1 ? 's' : '';

    if (player == 1) { 
        p1s += parseInt(value);
        message += '&bull; Player 1 places a ' + value + '-color' + ss + ' tile worth ' + value + ' point' + ss + '. '; 
    }
    if (player == 2) { 
        p2s += parseInt(value);
        message += '&bull; The Computer places a ' + value + '-color' + ss + ' tile worth ' + value + ' point' + ss + '. '; 

    }

    for (i; i<match.length; i++) {
        switch(match[i].type) {
            case '11':
                if (player == 1) {
                    p1s += 2;
                    message += "<br>&bull; Color match: bonus 2 points.";
                }
                if (player == 2) { 
                    p2s -= 2;
                    message += "<br>&bull; Rival color match: penalty -2 points.";
                }
                break;
            case '22':
                if (player == 1) {
                    p1s -= 2;
                    message += "<br>&bull; Rival color match: penalty -2 points.";
                }
                if (player == 2) { 
                    p2s += 2;
                    message += "<br>&bull; Color match: bonus 2 points.";
                }
                break;
            case '1J':
            case 'J1':
                if (player == 1) {
                    p1s += 1;
                    message += "<br>&bull; Color match with Joker: bonus 1 point.";
                }
                if (player == 2) { 
                    p2s -= 1;
                    message += "<br>&bull; Opposite color match with Joker: penalty -1 point.";
                }
                break;
            case '2J':
            case 'J2':
                if (player == 1) {
                    p1s -= 1;
                    message += "<br>&bull; Opposite color match with Joker: penalty -1 point.";
                }
                if (player == 2) { 
                    p2s += 1;
                    message += "<br>&bull; Color match with Joker: bonus 1 point.";
                }
                break;
            case 'JJ':
                if (player == 1) p1s += 3;
                if (player == 2) p2s += 3;
                message += "<br>&bull; Joker match: bonus 3 points";
                message;
                break;
            case 'B1':
            case '1B':
            case 'B2':
            case '2B':
            case 'BJ':
            case 'JB':
                i--;
                break;
            default:
                console.log('Error in UpdateScore. Invalid pair');
                break;
        }
        if (i == 1)  {
            if (player == 1) p1s *= 2;
            if (player == 2) p2s *= 2;
            message += '<br>&bull; Double Match! Score 2X!';
        }
        if (i == 2)  {
            if (player == 1) p1s *= 3;
            if (player == 2) p2s *= 3;
            message += '<br>&bull; Triple Match! Score 3X!';

        }
        if (i == 3)  {
            if (player == 1) p1s *= 5;
            if (player == 2) p2s *= 5;
            message += '<br>&bull; Full Match! Score 5X!';
        }

    }
    p1Score += p1s;
    p2Score += p2s;
    p1ScoreDiv.innerHTML = p1Score;
    p2ScoreDiv.innerHTML = p2Score;
    if (player == 1) message += '<br>&bull; Player 1 scores: ' + p1s + ' points.'; 
    if (player == 2) message += '<br>&bull; The Computer scores: ' + p2s + 'points.';
    console.log(message);
    DisplayMessage(message); 
}

// reveals player 2 hand
function FlipP2Hand(facing)
{
    for (let i=0; i<p2Hand.length; i++)
    {
        p2Hand[i].facing = facing;
    }
    //DrawPlayerHand(2);  
}
//////////////////////////////////////////////////////////
/// AI
//////////////////////////////////////////////////////////
// Calculates and performs a tile placement for Player 2
function Player2Turn()
{
    p2thinkDiv.classList.add('shown');
    setTimeout(() => { DrawCard(2) },P2_THINK_TIME/3);
    setTimeout(() => { PlayTile() }, P2_THINK_TIME);
    setTimeout(() => { p2thinkDiv.classList.remove('shown') }, P2_THINK_TIME*1.5);
    setTimeout(() => { SwapActivePlayer() }, P2_THINK_TIME*2);
}
