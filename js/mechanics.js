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
        if (tile) {
            const card = document.getElementById(tile.id.toString());
            cards.forEach(card => card.classList.remove('selected'));
            card.classList.add('selected');
            selectedT = card;
            console.log("selected tile " + card.dataset.label + " with id " + card.id);
        } else return;
    }
}

// Rotates the selected tile clockwise by 90 degrees
function RotateTile()
{
    if (!selectedT)  { 
        DisplayMessage('Please select a tile first!');
        return;
    } else {
        if (!selectedT.style.rotate || selectedT.style.rotate == "0deg") selectedT.style.rotate = "90deg";
        else if (selectedT.style.rotate == "90deg") selectedT.style.rotate = "180deg";
        else if (selectedT.style.rotate== "180deg") selectedT.style.rotate = "270deg";
        else if (selectedT.style.rotate== "270deg") selectedT.style.rotate = "0deg";
        RotateString(selectedT.dataset.label);
    }
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
        case '7':
            SelectTile(code);
            break;
        case 'r':
        case 'R':
            RotateTile();
            break;
        case ' ':
            PassTheTurn();
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
    if (player === 1) {
        rand = Math.floor(Math.random() * p1Tiles.length);
        p1Hand.push(p1Tiles[rand]);
        DrawPlayerHand(1);
    }
    if (player === 2) {
        rand = Math.floor(Math.random() * p2Tiles.length);
        p2Hand.push(p2Tiles[rand]);
        DrawPlayerHand(2);
    }
    cards = Array.from(document.getElementsByClassName('card'));
    if (player === 1) DisplayMessage("Player 1 draws one card");
    else DisplayMessage("The Computer draws one card");
}

//Validates a move
function CheckPlacement(index)
{    
    // TARGET DATA
    const target = gridTiles[index];
    const adj = GetAdjacentTiles(index);
    let matches = [];
    console.log('checking placement of tile ' + selectedT.dataset.label + ' for index ' + index);
    //console.log(target);

    // CONDITIONS   
    let match = true;              // Is it a match?
    let isEmpty = true;            // tile must be empty
    let hasNeighbor = false;       // tile must have at least one neighbor
    let colorMatch = true;         // Neighboring Colors must match
    //let oneIsColor = true;         // At least one match must be with color
    let innerFacing = true;        // A color side cannot face the edge

    // Check if the target tile is empty
    if (target.label != 'BBBB') isEmpty = false;

    // Check if at least one of the adjacent tiles is not empty
    for (let i=0; i<adj.length; i++) {
        if (adj[i].tile.label != 'BBBB') hasNeighbor = true;
    }

    // Check if the tile faces the edge
    if ((parseInt(index)+GRID_SIZE)%GRID_SIZE === 0) {
        //console.log('FACING TOP');
        if (selectedT.dataset.label.substr(0,1) != 'B') innerFacing = false;
    }

    if (parseInt(index) > ((GRID_SIZE*GRID_SIZE)-1) - GRID_SIZE) {
        //console.log('FACING RIGHT');
        if (selectedT.dataset.label.substr(1,1) != 'B') innerFacing = false;
    }

    if ((parseInt(index)+GRID_SIZE)%GRID_SIZE === GRID_SIZE-1) { 
        //console.log('FACING BOTTOM');
        if (selectedT.dataset.label.substr(2,1) != 'B') innerFacing = false;
    }

    if (parseInt(index) < GRID_SIZE) { 
    // console.log('FACING LEFT');
        if (selectedT.dataset.label.substr(3,1) != 'B') innerFacing = false;
    }
    
    // Get the target's matches and validate them
    console.log('getting matches...');
    matches = GetMatches(adj);
    console.log('resulting matches:' + matches.length);
    console.log(matches);
    console.log('validating matches...')
    colorMatch = ValidateMatches(matches);


    // If the player tries to place in an occupied square break with msg
    if (isEmpty === false) {
        if (activePlayer === 1) DisplayMessage('This square is occupied <br> Select an empty square');
        else console.log('Not Empty');
        match = false;
    }

    // If the player tries to place in an occupied tile break with msg
    if (hasNeighbor === false) {
        if (activePlayer === 1) DisplayMessage('A tile must be placed next to an other tile');
        else console.log('Has no neighbor');
        match = false;
    }

    // All neighboring colors must match
    if (colorMatch === false) {
        if (activePlayer === 1) DisplayMessage('Neighboring colors must match');
        else console.log('No colormatch');
        match = false;
    }

    // One neighboring color must not be black
    // if (oneIsColor === false) {
    //     if (activePlayer === 1) DisplayMessage('You must match with at least one non black color side');
    //     else console.log('No non black');
    //     match = false;
    // }

    // Sides facing the border must be black
    if (innerFacing === false) {
        if (activePlayer === 1) DisplayMessage('Only black sides can face the border');
        else console.log('Borderfacing');
        match = false;
    }

    if (match===true) console.log('MATCH!');
    else console.log('FAIL...');
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
function UpdateScore()
{
    console.log('udating score for player ' + activePlayer);
    console.log(globalMatches);
    let p1s = 0;        // p1 score
    let p2s = 0;        // p2 score
    let value = 0;      // The placed tiles value
    const player = activePlayer;
    
    // Add the base tile value to the score
    value = selectedT.dataset.value;
    const ss = parseInt(value) > 1 ? 's' : '';   // to handle single/plural

    if (player == 1) { 
        p1s += parseInt(value);
        DisplayDetails('Player 1 places a ' + value + '-color' + ss + ' tile worth ' + value + ' point' + ss); 
    }
    if (player == 2) { 
        p2s += parseInt(value);
        DisplayDetails('The Computer places a ' + value + '-color' + ss + ' tile worth ' + value + ' point' + ss); 
    }

    // Add the matces colors to the score
    for (let i=0; i<globalMatches.length; i++) {
        switch(globalMatches[i]) {
            case '11':
                if (player == 1) {
                    p1s += 2;
                    DisplayDetails("Color match: bonus 2 points");
                }
                if (player == 2) { 
                    p2s -= 2;
                    DisplayDetails("Rival color match: penalty -2 points");
                }
                break;
            case '22':
                if (player == 1) {
                    p1s -= 2;
                    DisplayDetails("Rival color match: penalty -2 points");
                }
                if (player == 2) { 
                    p2s += 2;
                    DisplayDetails("Color match: bonus 2 points");
                }
                break;
            case '1J':
            case 'J1':
                if (player == 1) {
                    p1s += 1;
                    DisplayDetails("Color match with Joker: bonus 1 point");
                }
                if (player == 2) { 
                    p2s -= 1;
                    DisplayDetails("Opposite color match with Joker: penalty -1 point");
                }
                break;
            case '2J':
            case 'J2':
                if (player == 1) {
                    p1s -= 1;
                    DisplayDetails("Opposite color match with Joker: penalty -1 point");
                }
                if (player == 2) { 
                    p2s += 1;
                    DisplayDetails("Color match with Joker: bonus 1 point");
                }
                break;
            case 'JJ':
                if (player == 1) p1s += 3;
                if (player == 2) p2s += 3;
                DisplayDetails("Joker match: bonus 3 points");
                break;
            case 'BB':
            case 'B1':
            case '1B':
            case 'B2':
            case '2B':
            case 'BJ':
            case 'JB':
                break;
            default:
                console.log('Error in UpdateScore. Invalid pair');
                break;
        }
    }
    if (globalMatches.length > 1)
    {
        if (globalMatches.length === 2)
        {
            if (player == 1) p1s *= 2;
            else if (player == 2) p2s *= 2;
            DisplayDetails('Double Match! Score 2X!');
        } 
        else if (globalMatches.length === 3)
        {
            if (player == 1) p1s *= 3;
            else if (player == 2) p2s *= 3;
            DisplayDetails('Triple Match! Score 3X!');
        }
        else if (globalMatches.length === 4)
        {
            if (player == 1) p1s *= 5;
            else if (player == 2) p2s *= 5;
            DisplayDetails('Full Match! Score 5X!');
        }
    }
    p1Score += p1s;
    p2Score += p2s;
    p1ScoreDiv.innerHTML = p1Score;
    p2ScoreDiv.innerHTML = p2Score;
    if (player == 1) DisplayDetails('Player 1 scores: ' + p1s + ' points'); 
    else if (player == 2) DisplayDetails('The Computer scores: ' + p2s + ' points');
    // reset the global matches
    globalMatches = [];
}

// Sets the sequence of actions for Player 2
function Player2Turn()
{
    setTimeout(()=> {
        p2thinkDiv.classList.add('shown');
        setTimeout(() => { DrawCard(2) },P2_THINK_TIME/3);
        setTimeout(() => { PlayTile() }, P2_THINK_TIME);
    },1000);
}

// Discsard the hand. Draw 6 and pass
function ResuffleAndPass(player)
{
    if (player === 1) {
        DisplayMessage("The player discards and draws 6");
        p1Hand.splice(0,p1Hand.length);
        PopulatePlayersHand(1);
        DrawPlayerHand(1);
        cards = Array.from(document.getElementsByClassName('card')); 
    } else if (player === 2) {
        DisplayMessage("The Computer discards and draws 6");
        p2thinkDiv.classList.remove('shown');
        p2Hand.splice(0,p2Hand.length);
        PopulatePlayersHand(2);
        DrawPlayerHand(2);
        cards = Array.from(document.getElementsByClassName('card')); 
    }
    TogglePassDiv(1);
}

// accepts a targets neighbors and returns the matches with the selected Tile
function GetMatches(adjacent)
{
    // filter out the neighboring empty tiles
    let adjs = adjacent.filter(adj => { return adj.tile.label != 'BBBB'});
    let matches = [];
    let selLabel = selectedT.dataset.label;
    //console.log(selectedT.dataset.label);
    console.log('filtered neighbors:' + adjs.length);
    //console.log(adjs);
    adjs.forEach(adj => {
        let newMatch = new Pair(adj.pos, 'BB');
        let type = 'BB';
        switch(adj.pos)
        {
            case 'top':
                type = selLabel.substr(0,1) + adj.tile.label.substr(2,1);
                break;
            case 'right':
                type = selLabel.substr(1,1) + adj.tile.label.substr(3,1);
                break;
            case 'bottom':
                type = selLabel.substr(2,1) + adj.tile.label.substr(0,1);
                break;
            case 'left':
                type = selLabel.substr(3,1) + adj.tile.label.substr(1,1);
                break;
            default:
                type = 'BB';
                break;
        }
        newMatch.type = type;
        matches.push(newMatch);
    });
    return matches;
}

// accepts an array of matches and checks if there is a valid match
function ValidateMatches(matches)
{
    let validMatch = true;
    for (let i=0; i<matches.length; i++)
    {   
        if (matches[i].type == 'BB') console.log('B===B ---> ignore');  
        else if (CheckIfMatch(matches[i].type) === false) validMatch = false;
    }
    return validMatch;
}

// checks if a pair of colors match. 
function CheckIfMatch(pair)
{
    let match = false;
    const a = pair.substr(0,1);
    const b = pair.substr(1,1);
    if (a === 'B' || b === 'B') {
        console.log(a + '===' + b + ' ---> false');  
        return false;
    } 
    else if (a === b || a === 'J' || b === 'J') {
        match = true;
        // Pass the pairs to a global array for score tracking
        globalMatches.push(pair);
        console.log(a + '===' + b + ' ---> ' + match);
    }
    return match;    
}

// Prompts the user to pass the turn
function PassTheTurn()
{
    if (gameStarted === false || turnHasEnded === false) return;
    else {
        cards.forEach(card => card.classList.remove('selected1'));
        TogglePassDiv(0);
        let swapPlayer = activePlayer === 1 ? 2 : 1;
        SetActivePlayer(swapPlayer);
    }
}