// Draws an svg tile image
function DrawTile(tile,parent)
{
    // Draw the SVG
    const xmlns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(xmlns, 'svg');
    svg.setAttributeNS(null, "viewBox", "0 0 " + TILE_SIZE + " " + TILE_SIZE);
    svg.setAttributeNS(null, "width", TILE_SIZE);
    svg.setAttributeNS(null, "height", TILE_SIZE);
    svg.style.display = "block";
    svg.dataset.id = tile.id;
    //svg.dataset.posx = tile.id;

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
    
    parent.appendChild(svg);
}

// Draws the initial grid
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