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
    selectedT = tile;
    const card = document.getElementById(tile.id.toString());
    cards.forEach(card => card.classList.remove('selected'));
    card.classList.add('selected');
    console.log("selected tile " + card.dataset.label + " with id " + card.id);
}

// Rotates the selected tile clockwise by 90 degrees
function RotateTile()
{
    if (!selectedT) DisplayMessage('Please select a tile first!');
}




//Keyboard Input
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

