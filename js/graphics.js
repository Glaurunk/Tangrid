// Draws an svg tile image inside a flippable parent card element
function DrawTile(tile,parent,index="NULL")
{
    //Create the card element
    const card = document.createElement('div');
    card.id = tile.id;
    card.dataset.label = tile.label;
    card.dataset.placing = parent.id;
    card.dataset.value = tile.value;
    // Pass the index of the tile in the respective tile array
    if (index != "NULL") card.dataset.index = index;
    // Add draggable behaviour to p1 tiles
    if (parent.id == "player1-hand") card.draggable = true;
    // Add drop devaviour to the grid tiles
    if (parent.id == "grid-row-0" || parent.id == "grid-row-1" || parent.id == "grid-row-2" || parent.id == "grid-row-3" || parent.id == "grid-row-4") {
        card.addEventListener('dragover', (e)=> { 
            e.preventDefault();
        });
        card.addEventListener('drop', (e)=> { 
            if (activePlayer == 1 && gameStarted === true) {
                // get the target card el 
                const t =  e.target.closest('.card');
                if (t.dataset.label != 'BBBB') DisplayMessage('You cannot place on an occupied tile');
                else {
                    //validate the placement position
                    const match = CheckPlacement(t.dataset.index);
                    if (match.length > 0) {
                        //replace the grid target in the gridTiles[] with the selected tile
                        gridTiles[t.dataset.index] = new Tile(selectedT.dataset.label);
                        // remove it from the hand
                        p1Hand.splice(selectedT.dataset.index,1);
                        //redraw the grid and the P1 hand
                        DrawGrid();
                        DrawPlayerHand(1);
                        // disable rotate btn
                        rotateBtn.disabled = true;
                        // recalculate the tiles in play
                        cards = Array.from(document.getElementsByClassName('card'));
                        // update the score
                        UpdateScore(t.dataset.index,match,activePlayer,selectedT.dataset.value);
                        // pass the turn 
                        setTimeout(()=>{ 
                            SwapActivePlayer() ;
                            selectedT = 0;
                        },3000);
                    }
                }
            } else if (activePlayer == 1 && gameStarted === false) {
                DisplayMessage("Please wait");
            } else {
                DisplayMessage("Please wait" + '<br>' + 'It\'s the turn of Player 2');
            }
        });
    }

    // show the back side of the flipped tiles. 
    if (tile.facing == 1) card.classList.add('flipped');
    //add event listener for selection
    card.addEventListener('mousedown', (e)=> {
        if (activePlayer == 1 && gameStarted === true) {
            cards.forEach(card => card.classList.remove('selected'));
            card.classList.add('selected');
            selectedT = card;
            if (card.dataset.placing == 'player1-hand') rotateBtn.disabled = false;
            else rotateBtn.disabled = true;
            console.log("selected tile " + card.dataset.label + " with id " + card.id);
            if (e.shiftKey) console.log("shift");
        } else if (activePlayer == 1 && gameStarted === false) {
            DisplayMessage("Please wait");
        } else {
            DisplayMessage("Please wait" + '<br>' + 'It\'s the turn of Player 2');
        }
    });
    card.classList.add('card');
    parent.appendChild(card);

    //Create the inner card content
    const inner = document.createElement('div');
    inner.classList.add('card__inner');
    card.appendChild(inner);

    // create the front side
    const front = document.createElement('div');
    front.classList.add('card__front');
    inner.appendChild(front);

    // Draw the SVG
    const xmlns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(xmlns, 'svg');
    svg.setAttributeNS(null, "viewBox", "0 0 " + TILE_SIZE + " " + TILE_SIZE);
    svg.setAttributeNS(null, "width", TILE_SIZE);
    svg.setAttributeNS(null, "height", TILE_SIZE);
    svg.style.display = "block";
    // append the svg to the front
    front.append(svg);

    // Draw the top triangle
    const gtop = document.createElementNS(xmlns,'g');
    const polygont = document.createElementNS(xmlns,'polygon');
    polygont.setAttributeNS(null, 'display','inline');
    polygont.setAttributeNS(null, 'stroke',tile.lines);
    polygont.setAttributeNS(null, 'stroke-width',1);
    polygont.setAttributeNS(null, 'fill',tile.top);
    polygont.setAttributeNS(null, 'points','0,0 100,0 50,50');
    gtop.appendChild(polygont);
    svg.appendChild(gtop);
    //Draw the right triangle
    const gright = document.createElementNS(xmlns,'g');
    const polygonr = document.createElementNS(xmlns,'polygon');
    polygonr.setAttributeNS(null, 'display','inline');
    polygonr.setAttributeNS(null, 'stroke',tile.lines);
    polygonr.setAttributeNS(null, 'stroke-width',1);
    polygonr.setAttributeNS(null, 'fill',tile.right);
    polygonr.setAttributeNS(null, 'points','50,50 100,0 100,100');
    gright.appendChild(polygonr);
    svg.appendChild(gright);
    // Draw the bottom triangle
    const gbottom = document.createElementNS(xmlns,'g');
    const polygonb = document.createElementNS(xmlns,'polygon');
    polygonb.setAttributeNS(null, 'display','inline');
    polygonb.setAttributeNS(null, 'stroke',tile.lines);
    polygonb.setAttributeNS(null, 'stroke-width',1);
    polygonb.setAttributeNS(null, 'fill',tile.bottom);
    polygonb.setAttributeNS(null, 'points','0,100 50,50 100,100');
    gbottom.appendChild(polygonb);
    svg.appendChild(gbottom);
    // Draw the left triangle
    const gleft = document.createElementNS(xmlns,'g');
    const polygonl = document.createElementNS(xmlns,'polygon');
    polygonl.setAttributeNS(null, 'display','inline');
    polygonl.setAttributeNS(null, 'stroke',tile.lines);
    polygonl.setAttributeNS(null, 'stroke-width',1);
    polygonl.setAttributeNS(null, 'fill',tile.left);
    polygonl.setAttributeNS(null, 'points','0,0 50,50 0,100');
    gleft.appendChild(polygonl);
    svg.appendChild(gleft);
   
    //Add the back to player 2 cards. 
    // Adding the back side to player 1 makes the drag effect show the back
    if (parent.id == "player2-hand") {
        const back = document.createElement('div');
        back.classList.add('card__back');
        inner.appendChild(back);
        //  create the back side tile
        const grect = document.createElementNS(xmlns,'g');
        const rect = document.createElementNS(xmlns,'polygon');
        rect.setAttributeNS(null, 'display','inline');
        // rect.setAttributeNS(null, 'stroke',tile.lines);
        // rect.setAttributeNS(null, 'stroke-width',1);
        rect.setAttributeNS(null, 'fill', C_GREY);
        rect.setAttributeNS(null, 'points','0,0, 0,100, 100,0, 100,100');
        grect.appendChild(rect);
        back.appendChild(grect);
    }

    if (tile.facing == 1) card.style.transform = "rotateY(180deg)";
}

// Draws the gridTiles array inside the grid row elements
function DrawGrid()
{
    ClearGrid();
    for (let x=0; x<GRID_SIZE; x++)
    {
        for (let y=0; y<GRID_SIZE; y++)
        {
            DrawTile(gridTiles[x +y*GRID_SIZE], document.getElementById("grid-row-" + y),x +y*GRID_SIZE);
        }
    }
}

// Draws a players hand on the screen
function DrawPlayerHand(player=0)
{
    if (player == 1 || player == 0)
    {
        p1handDiv.innerHTML = "";
        for (let i=0; i<p1Hand.length; i++) {
            DrawTile(p1Hand[i], p1handDiv, i);
        }
    }
    if (player == 2 || player == 0)
    {
        p2handDiv.innerHTML = "";
        for (let i=0; i<p2Hand.length; i++) {
            // Show P2 hand
            p2Hand[i].facing = 1;
            DrawTile(p2Hand[i], p2handDiv, i);
        }
    }
}

// Clears the Grid
function ClearGrid()
{
    for (let i=0; i<GRID_SIZE; i++)
    {
        document.getElementById("grid-row-" + i).innerHTML = "";
    }
}