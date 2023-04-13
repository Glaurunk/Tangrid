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

// Checks if a placing position is valid by comparing neighboring labels
function CheckPlacement1(index)
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

// Updates the score for a player
function UpdateScore(index,match,player,value)
{
    let p1s = 0;        // p1 score
    let p2s = 0;        // p2 score
    let m = 0;          // number of sides matched
    console.log('m='+m);
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

    for (let i=0; i<match.length; i++) {
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
                m++;
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
                m++;
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
                m++;
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
                m++;
                break;
            case 'JJ':
                if (player == 1) p1s += 3;
                if (player == 2) p2s += 3;
                message += "<br>&bull; Joker match: bonus 3 points";
                m++;
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
        console.log('m='+m);
        if (m == 1)  {
            if (player == 1) p1s *= 2;
            if (player == 2) p2s *= 2;
            message += '<br>&bull; Double Match! Score 2X!';
        }
        else if (m == 2)  {
            if (player == 1) p1s *= 3;
            if (player == 2) p2s *= 3;
            message += '<br>&bull; Triple Match! Score 3X!';

        }
        else if (m == 3)  {
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