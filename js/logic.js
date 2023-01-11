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
function RandomMove()
{
    console.log('cpu plays:');
    let placement = false;
    let matches = [];

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
    dom.classList.add('selected2');

    // get the cpu hand
    let p2h = cards.filter(card => { return card.dataset.placing == 'player2-hand'});
    // sort by value
    //p2h.sort((a,b) => { return parseInt(a.dataset.value) < parseInt(b.dataset.value)  });
    //console.log(p2h);
    // Try to match the random position with a tile from the hand
    for (let c=0; c<p2h.length; c++)
    {
        console.log('card:' + c);
        let match = false;
        selectedT = p2h[c];
        selectedT.classList.add('selected3');
        // console.log(pos[x].matches);
        // Check if a tile matches the selected move and keep rotating it until a match has been found or all possivble matches have failed
        for (let r=0; r<4; r++ )
        {
            // for each side that has to be matched perform a check
            for (let m=0; m<pos[x].matches.length; m++)
            {
                let can = false;
                switch(pos[x].matches[m].side)
                {
                    case 'top':
                        can = CheckIfMatch(pos[x].matches[m].color,selectedT.dataset.label.substr(0,1));
                        break;
                    case 'right':
                        can = CheckIfMatch(pos[x].matches[m].color,selectedT.dataset.label.substr(1,1));
                        break;
                    case 'bottom':
                        can = CheckIfMatch(pos[x].matches[m].color,selectedT.dataset.label.substr(2,1));
                        break;
                    case 'left':
                        can = CheckIfMatch(pos[x].matches[m].color,selectedT.dataset.label.substr(3,1));
                        break;
                    default:
                        break;
                }
                match = can;
                //if a single check fails break the operation, the tile does not match
                if (can===false) break;
                else matches.push(can);
            }
            //if a match has been found break the operation
            if (match != false) break;
            // else rotate the tile and try again
            else {
                matches = [];
                RotateTile();
            }
        }
        //console.log('match='+match);
        if (match != false) {
            placement = true;
            break;
        }
    };
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
        // update the score
        console.log(matches);

        //UpdateScore(dom.dataset.index,match,activePlayer,selectedT.dataset.value);
            
        
        // pass the turn 
    } else  {
        console.log('No valid moves for the CPU');
    }
}


// A Helper that receives a label and a position and returns a character
function GetColorFromPosition(label,position)
{
    switch(position)
    {
        case 'top':
            return label.substr(0,1);
        case 'right':
            return label.substr(1,1);
        case 'bottom':
            return label.substr(2,1);
        case 'left':
            return label.substr(3,1);
        default:
            break;
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

//reverses a posiiotn. Used for referencing neighboring opposite positions
function ReversePosition(pos)
{
    switch(pos)
    {
        case 'top':
            return 'bottom';
        case 'right':
            return 'left';
        case 'bottom':
            return 'top';
        case 'left':
            return 'right';
        default:
            break;
    }
}

// checks if a pair of colors match
function CheckIfMatch(a,b)
{
    let match = false;
    if (a === 'B' || b === 'B') match = false;
    else if (a === b || a === 'J' || b === 'J') match = a+b;
    //console.log(a + '===' + b + '--->' + match);
    return match;    
}