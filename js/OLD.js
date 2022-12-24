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