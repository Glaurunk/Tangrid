//The CPU makes a legal move according to the difficulty level
function PlayTile()
{
    if (difficulty === 1) RandomMove(); 
    if (difficulty === 2) DisplayMessage("Moderate Level");
    if (difficulty === 3) DisplayMessage("Diffucult Level");
}

//Finds all available positions to place a tile
function FindAvailablePositions()
{  
    //the returned array of all available legal positions
    let pos = [];
    // get all the occupied tiles
    const occupied = cards.filter(tile => { return tile.dataset.placing != 'player2-hand' &&
                                                tile.dataset.placing != 'player1-hand' && 
                                                tile.dataset.label != 'BBBB'
    });
    
    // find their neighboring matches
    occupied.forEach(tile => {
        const mt = CheckForMatch(tile);
        if (mt.length > 0) mt.forEach(m => pos.push(m));
    });

    // find the tiles with more than one match
    // loop throug each pos element
    pos.forEach((el, i) => {
        // and checks each pos element
        pos.forEach((element, index) => {
            // exclude self
            if (i === index) return null;
            // if ids match
            if (element.id === el.id) {
                // add the second element's match to the first's
                element.matches.push(el.matches[0]);
                // then remove the second element. Use map to get it's index by it's id
                let x = pos.map(function(e) { return e.id; }).indexOf(el.id);
                pos.splice(x,1);
            } 
        });
    });

    //color the matching sides
    pos.forEach(p => {
        // let dom = document.getElementById(p.id);
        // if (p.matches.length === 1) dom.classList.add('selected1');
        // if (p.matches.length === 2) dom.classList.add('selected2');
        // if (p.matches.length === 3) dom.classList.add('selected3');
        // if (p.matches.length === 4) dom.classList.add('selected4');
        p.value = p.matches.length;
    });
    //console.log("pos", pos);
    return pos;
}

//The CPU places a random matching tile from its hand to a random available position
// If No cards match the placement the CPU resuffles and passes
function RandomMove()
{
    console.log('cpu plays:');
    let placement = false;
    // Find all available positions
    let pos = FindAvailablePositions();
    //console.log(pos);
    if (pos.length == 0) {
        DisplayMessage('No legal moves for the CPU');
        return;
    }

    // Choose randomly one position
    const x = Math.floor(Math.random()*pos.length);
    let dom = document.getElementById(pos[x].id);
    console.log('random tile index:'+dom.dataset.index);
    //dom.classList.add('selected2');

    // get the cpu hand
    let p2h = cards.filter(card => { return card.dataset.placing == 'player2-hand'});
    // sort by value
    //p2h.sort((a,b) => { return parseInt(a.dataset.value) < parseInt(b.dataset.value)  });
    //console.log(p2h);
    // Try to match the random position with a tile from the hand
    for (let i=0; i<p2h.length; i++)
    {
        console.log('card:' + i);
        selectedT = p2h[i];
        //selectedT.classList.add('selected3');
        // console.log(pos[x].matches);
        // Check if a tile matches the selected move and keep rotating it until a match has been found or all possivble matches have failed
        for (let r=1; r<5; r++)
        {
            globalMatches = [];
            console.log("Rotation " + r + ' for card ' + i);
            // for each side that has to be matched perform a check
            placement = CheckPlacement(dom.dataset.index);
            // if a match has been found break out of the rotation
            if (placement === true) break;
            else { 
                console.log("No valid moves for the CPU for card " + i + ' rotation ' + r);
                RotateTile();
            }       
        }

        // if a match has been found break out of the card loop as well
        if (placement === true) {
            console.log ('CPU MATCH for card '+ i);
            break;
        } else {
            console.log("No valid moves for the CPU for card " + i + ' at all rotations');
        }
    };
    // After the loop if a placement is to be made proceed else resuffle and pass
    if (placement === true) {
        //replace the grid target in the gridTiles[] with the selected tile
        gridTiles[dom.dataset.index] = new Tile(selectedT.dataset.label);
        // remove it from the hand
        p2Hand.splice(selectedT.dataset.index,1);
        //redraw the grid and the P2 hand
        DrawGrid();
        DrawPlayerHand(2);
        // recalculate the tiles in play
        cards = Array.from(document.getElementsByClassName('card'));
         // Notify the UI
        DisplayMessage("The Computer 1 places a " + selectedT.dataset.label + " tile on square " + GetPositionFormIndex(dom.dataset.index));
        cards[parseInt(dom.dataset.index)+6].classList.add('selected1');
         // update the score
        UpdateScore();  
        // pass the turn 
        TogglePassDiv(1);
    } else {
        console.log('resuffle CPU');
        ResuffleAndPass(2);
    }
}

// Checks if the chosen tile has matchable neighbors
function CheckForMatch(tile)
{
    let matches = [];
    // get all adjascent tiles
    let adjacent = GetAdjacentTiles(tile.dataset.index);
    adjacent.forEach(adj => {
        // filter out the occupied ones
        if (adj.tile.label === 'BBBB') {
            //create a new move
            const newMove = new Move(adj.tile.id, [new Match(ReversePosition(adj.pos), GetColorFromPosition(tile.dataset.label,adj.pos))]);
            //exclude black matches
            if (newMove.matches[0].color != 'B') matches.push(newMove);
        }
    });
    return matches;
}



