// Draws an svg tile image inside a flippable parent card element
function DrawTile(tile,parent)
{
    //Create the card element
    const card = document.createElement('div');
    card.id = tile.id;
    card.dataset.label = tile.label;
    if (tile.facing == 1) card.classList.add('flipped');
    //add event listener
    card.addEventListener('click', ()=> {
        cards.forEach(card => card.classList.remove('selected'));
        card.classList.add('selected');
        console.log("selected tile " + card.dataset.label + " with id " + card.id);
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
   
    // Add the back
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

    if (tile.side == 1) inner.style.transform = "rotate(180deg)";
}

// Draws the gridTiles array inside the grid row elements
function DrawGrid()
{
    for (let x=0; x<GRID_SIZE; x++)
    {
        for (let y=0; y<GRID_SIZE; y++)
        {
            DrawTile(gridTiles[x +y*GRID_SIZE], document.getElementById("grid-row-" + y));
        }
    }
}

// Draws a players hand on the screen
function DrawPlayerHand(player=0)
{
    if (player == 1 || player == 0)
    {
        p1Hand.forEach(tile => {
            DrawTile(tile, p1handDiv);
        })
    }
    if (player == 2 || player == 0)
    {
        p2Hand.forEach(tile => {
            DrawTile(tile, p2handDiv);
        })
    }
}
