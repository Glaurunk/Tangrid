// Populates the initial players' hand 
function PopulatePlayersHand()
{
    let rand = 0; 
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
    const i = parseInt(code) - 1;
    const tile = p1Hand[i];
    const card = document.getElementById(tile.id.toString());
    cards.forEach(card => card.classList.remove('selected'));
    card.classList.add('selected');
    selectedT = card;
    console.log("selected tile " + card.dataset.label + " with id " + card.id);
}

// Rotates the selected tile clockwise by 90 degrees
function RotateTile()
{
    if (!selectedT)  { 
        DisplayMessage('Please select a tile first!');
        return;
    }
    if (selectedT.dataset.placing != "player1-hand") DisplayMessage('You can rotate only your own tiles');
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
    DisplayMessage("Player " + player + " draws one card");

}

// Checks if a placing position is valid by comparing neighboring labels
function CheckPlacement(index)
{
    let position = true;                // the returned variable
    let black = false;                  // true if the matching sides are black
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
        DisplayMessage('Must place next to an existing tile'); 
        return false;
    }

    //if there are neighboring tiles check for matching
    const top = val.find(tile => { return tile.pos == 'top'});
    if (top) {
        console.log('top neighbor label: ' + top.tile.label);
        compT = top.tile.label.substr(2,1);
        selT = selectedT.dataset.label.substr(0,1);
        console.log("comparing top: " + compT + '=' + selT);
        if (selT != compT) position = false;
        if (selT == 'J' || compT == 'J' && selT != 'B' && compT != 'B') position = true;
        if (selT == compT && selT == 'B' && compT == 'B') black = true;
        if (position === true) match.push(new Pair('top',compT+selT));
    }

    const bottom = val.find(tile => { return tile.pos == 'bottom'});
    if (bottom) {
        console.log('bottom neighbor label: ' + bottom.tile.label);
        compT = bottom.tile.label.substr(0,1);
        selT = selectedT.dataset.label.substr(2,1);
        console.log("comparing bottom: " + compT + '=' + selT);
        if (selT != compT) position = false;
        if (selT == 'J' || compT == 'J' && selT != 'B' && compT != 'B') position = true;
        if (selT == compT && selT == 'B' && compT == 'B') black = true;
        if (position === true) match.push(new Pair('bottom',compT+selT));
    }

    const right = val.find(tile => { return tile.pos == 'right'});
    if (right) {
        console.log('right neighbor label: ' + right.tile.label);
        compT = right.tile.label.substr(3,1);
        selT = selectedT.dataset.label.substr(1,1);
        console.log("comparing right: " + compT + '=' + selT);
        if (selT != compT) position = false;
        if (selT == 'J' || compT == 'J' && selT != 'B' && compT != 'B') position = true;
        if (selT == compT && selT == 'B' && compT == 'B') black = true;
        if (position === true) match.push(new Pair('right',compT+selT));
    }

    const left = val.find(tile => { return tile.pos == 'left'});
    if (left) {
        console.log('left neighbor label: ' + left.tile.label);
        compT = left.tile.label.substr(1,1);
        selT = selectedT.dataset.label.substr(3,1);
        console.log("comparing left: " + compT + '=' + selT);
        if (selT != compT) position = false;
        if (selT == 'J' || compT == 'J' && selT != 'B' && compT != 'B') position = true;
        if (selT == compT && selT == 'B' && compT == 'B') black = true;
        if (position === true) match.push(new Pair('left',compT+selT));
    }

    // Check if the tile faces the edge
    if ((parseInt(index)+GRID_SIZE)%GRID_SIZE === 0) {
        console.log('FACING TOP');
        if (selectedT.dataset.label.substr(0,1) != 'B') edge = true;;
    }

    if (parseInt(index) > ((GRID_SIZE*GRID_SIZE)-1) - GRID_SIZE) {
        console.log('FACING RIGHT');
        if (selectedT.dataset.label.substr(1,1) != 'B') edge = true;;
    }

    if ((parseInt(index)+GRID_SIZE)%GRID_SIZE === GRID_SIZE-1) { 
        console.log('FACING BOTTOM');
        if (selectedT.dataset.label.substr(2,1) != 'B') edge = true;;
    }

    if (parseInt(index) < GRID_SIZE) { 
        console.log('FACING LEFT');
        if (selectedT.dataset.label.substr(3,1) != 'B') edge = true;;
    }

    //if the tile is facing the edge break with msg
    if (edge === true) {
        DisplayMessage('A color side cannot face the edge');
        return false;
    }

    // If the neighboring colors do not match break with msg
    if (position === false) { 
        DisplayMessage('Neighboring colors must match');
        return false;
    };

    // If the player tries to match black tiles break with msg
    if (black === true && match.length < 1) {
        DisplayMessage('You cannot match black sides');
        return false;
    }

    return match;
}

// Returns an array of tiles adjascent to the selected
function GetAdjacentTiles(index)
{
    let adj = [];
    let i = parseInt(index);
    // add the previous (top) tile
    if (i - 1 > -1) adj.push(new AdjTile('top',gridTiles[i-1]));
    // add the right tile
    if (i + GRID_SIZE < 25) adj.push(new AdjTile('right',gridTiles[i+GRID_SIZE]));
    //add the next (bottom) tile
    if (i + 1 < 25) adj.push(new AdjTile('bottom',gridTiles[i+1]));
    // add the left tile
    if (i - GRID_SIZE > -1) adj.push(new AdjTile('left', gridTiles[i-GRID_SIZE]));
    
    if (adj.length > 0) return adj;
    else console.log("GetAdjascentTiles: Error fetching the adjascent tiles");
}

// Updates the score for a player
function UpdateScore(index,match,player)
{
    let i=0;
    let p1s = 0;
    let p2s = 0;
    let message = ""; 
    for (i; i<match.length; i++) {
        switch(match[i].type) {
            case '11':
                if (player == 1) {
                    p1s += 2;
                    message += "Color match: 2 points" + '<br>';
                }
                if (player == 2) { 
                    p2s -= 2;
                    message += "Rival color match: -2 points" + '<br>';
                }
                break;
            case '22':
                if (player == 1) {
                    p1s -= 2;
                    message += "Rival color match: -2 points" + '<br>';
                }
                if (player == 2) { 
                    p2s += 2;
                    message += "Color match: 2 points" + '<br>';
                }
                break;
            case '1J':
            case 'J1':
                if (player == 1) {
                    p1s += 1;
                    message += "Color match with Joker: 1 point" + '<br>';
                }
                if (player == 2) { 
                    p2s -= 1;
                    message += "Opposite color match with Joker: -1 point" + '<br>';
                }
                break;
            case '2J':
            case 'J2':
                if (player == 1) {
                    p1s -= 1;
                    message += "Opposite color match with Joker: -1 point" + '<br>';
                }
                if (player == 2) { 
                    p2s += 1;
                    message += "Color match with Joker: 1 point" + '<br>';
                }
                break;
            case 'JJ':
                if (player == 1) p1s += 3;
                if (player == 2) p2s += 3;
                message += "Joker match: 3 points" + '<br>';
                message;
                break;
            case 'BB':
                break;
            default:
                console.log('Error in UpdateScore. Invalid pair');
                break;
        }
        if (i == 1)  {
            if (player == 1) p1s *= 2;
            if (player == 2) p2s *= 2;
            message += 'Double Match! Score 2X!' + '<br>';;
        }
        if (i == 2)  {
            if (player == 1) p1s *= 3;
            if (player == 2) p2s *= 3;
            message += 'Triple Match! Score 3X!' + '<br>';;

        }
        if (i == 3)  {
            if (player == 1) p1s *= 5;
            if (player == 2) p2s *= 5;
            message += 'Full Match! Score 5X!' + '<br>';;
        }

    }
    p1Score += p1s;
    p2Score += p2s;
    p1ScoreDiv.innerHTML = p1Score;
    p2ScoreDiv.innerHTML = p2Score;
    if (player == 1) message += 'Score: ' + p1s; 
    if (player == 2) message += 'Score: ' + p2s;
    DisplayMessage(message); 
}

//////////////////////////////////////////////////////////
/// AI
//////////////////////////////////////////////////////////
// Calculates and performs a tile placement for Player 2
function Player2Turn()
{
    ShowP2Thinking();
    DrawCard(2);
}