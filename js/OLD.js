// Draws an svg tile image inside a parent element
function DrawTile1(tile,parent)
{
    // Draw the SVG
    const xmlns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(xmlns, 'svg');
    svg.setAttributeNS(null, "viewBox", "0 0 " + TILE_SIZE + " " + TILE_SIZE);
    svg.setAttributeNS(null, "width", TILE_SIZE);
    svg.setAttributeNS(null, "height", TILE_SIZE);
    svg.style.display = "block";
    svg.id = MakeId();
    svg.dataset.label = tile.id;
    svg.addEventListener('click', ()=> {
        svgTiles.forEach(tile => tile.classList.remove('selected'));
        svg.classList.add('selected');
        console.log("selected tile " + svg.dataset.label + " with id " + svg.id);
    });
    //svg.dataset.posx = tile.id;

    // If the tile is facing up draw the triangles
    if (tile.facing == 1) {
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
    // else draw the back side        
    } else if (tile.facing == 0) {
        // Draw a rectangle
        const grect = document.createElementNS(xmlns,'g');
        const rect = document.createElementNS(xmlns,'polygon');
        rect.setAttributeNS(null, 'display','inline');
        rect.setAttributeNS(null, 'stroke',tile.lines);
        rect.setAttributeNS(null, 'stroke-width',1);
        rect.setAttributeNS(null, 'fill', C_GREY);
        rect.setAttributeNS(null, 'points','0,0, 0,100, 100,0, 100,100');
        grect.appendChild(rect);
        svg.appendChild(grect);
    }
    
    parent.appendChild(svg);
}


const tiles = [
    // Misc
    new Tile(MakeId(),"", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"BBBB", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, C_WHITE, 1, 99),
    // One side
    new Tile(MakeId(),"1BBB", C_ONE, C_BLACK, C_BLACK, C_BLACK, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"2BBB", C_TWO, C_BLACK, C_BLACK, C_BLACK, C_WHITE, C_WHITE, 1, 2),
    new Tile(MakeId(),"JBBB", C_JOKER, C_BLACK, C_BLACK, C_BLACK, C_WHITE, C_WHITE, 1, 0),
    // Two Sides
    new Tile(MakeId(),"11BB", C_ONE, C_ONE, C_BLACK, C_BLACK, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"1B1B", C_ONE, C_BLACK, C_ONE, C_BLACK, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"1BJB", C_ONE, C_BLACK, C_JOKER, C_BLACK, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"22BB", C_TWO, C_TWO, C_BLACK, C_BLACK, C_WHITE, C_WHITE, 1, 2),
    new Tile(MakeId(),"2B2B", C_TWO, C_BLACK, C_TWO, C_BLACK, C_WHITE, C_WHITE, 1, 2),
    new Tile(MakeId(),"2BJB", C_TWO, C_BLACK, C_JOKER, C_BLACK, C_WHITE, C_WHITE, 1, 2),
    new Tile(MakeId(),"1B2B", C_ONE, C_BLACK, C_TWO, C_BLACK, C_WHITE, C_WHITE, 1, 0),
    // Three sides
    new Tile(MakeId(),"111B", C_ONE, C_ONE, C_ONE, C_BLACK, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"1B11", C_ONE, C_BLACK, C_ONE, C_ONE, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"11B1", C_ONE, C_ONE, C_BLACK, C_ONE, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"1JB1", C_ONE, C_JOKER, C_BLACK, C_ONE, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"222B", C_TWO, C_TWO, C_TWO, C_BLACK, C_WHITE, C_WHITE, 1, 2),
    new Tile(MakeId(),"2B22", C_TWO, C_BLACK, C_TWO, C_TWO, C_WHITE, C_WHITE, 1, 2),
    new Tile(MakeId(),"22B2", C_TWO, C_TWO, C_BLACK, C_TWO, C_WHITE, C_WHITE, 1, 2),
    new Tile(MakeId(),"2JB2", C_TWO, C_JOKER, C_BLACK, C_TWO, C_WHITE, C_WHITE, 1, 2),
    new Tile(MakeId(),"1JB2", C_ONE, C_JOKER, C_BLACK, C_TWO, C_WHITE, C_WHITE, 1, 0),
    new Tile(MakeId(),"12JB", C_ONE, C_TWO, C_JOKER, C_BLACK, C_WHITE, C_WHITE, 1, 0),
    // Four sides
    new Tile(MakeId(),"1122", C_ONE, C_ONE, C_TWO, C_TWO, C_WHITE, C_WHITE, 1, 0),
    new Tile(MakeId(),"1212", C_ONE, C_TWO, C_ONE, C_TWO, C_WHITE, C_WHITE, 1, 0),
    new Tile(MakeId(),"1J2J", C_ONE, C_JOKER, C_TWO, C_JOKER, C_WHITE, C_WHITE, 1, 0),
    new Tile(MakeId(),"12JJ", C_ONE, C_TWO, C_JOKER, C_JOKER, C_WHITE, C_WHITE, 1, 0),
];