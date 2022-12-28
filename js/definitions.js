// The basic entity: Used for managing the deck and drawing the tiles on the screen
class Tile
{
    constructor(label,player=1,facing=1,lines=C_WHITE,border=C_WHITE)
    {
        this.id = MakeId();                                 // a random 12 char string
        this.label = label;                                 // a 4 char string describing the triangle properties
        this.top = this.GetColor(label.substr(0,1));        // the color of the top triangle
        this.right = this.GetColor(label.substr(1,1));      // the color of the right triangle
        this.bottom = this.GetColor(label.substr(2,1));     // the color of the bottom triangle
        this.left = this.GetColor(label.substr(3,1));       // the color of the left triangle
        this.player = player;                               // the player [0=both]
        this.facing = facing;                               // 1 face up, 0 face down
        this.lines = lines;                                 // the color of the inner lines
        this.border = border;                               // the color of the tile border
    }

    GetColor(color)                                         //Returns a hex color code 
    {
        switch(color) {
            case '1':
                return C_ONE;
            case '2':
                return C_TWO;
            case 'J':
                return C_JOKER;
            case 'B':
                return C_BLACK;
            default:
                return C_GREY;
        }
    }
}

// A helper class used to determine a tiles neighbors
class AdjTile
{
    constructor(pos,tile)
    {
        this.pos=pos;           // top/right/bottom/left
        this.tile=tile;         // a tile
    }
}

// A helper class used in scoring
class Pair 
{
    constructor(pos,type)
    {
        this.pos=pos;            // top/right/bottom/left
        this.type=type;          // matching pairs (11,22,1J,J1,2J,J2,JJ)
    }

}

// COLORS
const C_ONE = "#7E67A4";
const C_TWO = "#5B88C4";
const C_JOKER = "#DE9133";
const C_GREY = "#333333";
const C_WHITE = "#ffffff";
const C_BLACK = "#000000";

// SIZES
const GRID_SIZE = 5;
const TILE_SIZE = 100;
const HAND_SIZE = 6;
const P2_THINK_TIME = 3000;

//GLOBALS
let gameStarted = false;
let activePlayer = 1;
let p1Score = 0;
let p2Score = 0;

//TILES
//The initial grid state
const gridTiles = [];
for (let i=0; i<GRID_SIZE*GRID_SIZE; i++) {
    const t = new Tile("BBBB",0,0,C_BLACK);
    gridTiles.push(t);
}
gridTiles[12] = new Tile("1212");
   

// Player one pool of cards
const p1Tiles = [ 
    new Tile("1BBB"),
    new Tile("1BBB"),
    new Tile("JBBB"),
    new Tile("11BB"),
    new Tile("11BB"),
    new Tile("1JBB"),
    new Tile("1B1B"),
    new Tile("1B1B"),
    new Tile("1BJB"),
    new Tile("1B2B"),
    new Tile("111B"),
    new Tile("1B11"),
    new Tile("11B1"),
    new Tile("1JB1"),
    new Tile("1JB2"),
    new Tile("12JB"),
    new Tile("1122"),
    new Tile("1212"),
    new Tile("1J2J"),
    new Tile("12JJ"),
];

// Player two pool of cards
const p2Tiles = [
    new Tile("2BBB", 2, 0),
    new Tile("2BBB", 2, 0),
    new Tile("JBBB", 2, 0),
    new Tile("22BB", 2, 0),
    new Tile("22BB", 2, 0),
    new Tile("2JBB", 2, 0),
    new Tile("2B2B", 2, 0),
    new Tile("2B2B", 2, 0),
    new Tile("2BJB", 2, 0),
    new Tile("222B", 2, 0),
    new Tile("2B22", 2, 0),
    new Tile("22B2", 2, 0),
    new Tile("2JB2", 2, 0),
    new Tile("1JB2", 2, 0),
    new Tile("12JB", 2, 0),
    new Tile("1122", 2, 0),
    new Tile("1212", 2, 0),
    new Tile("1J2J", 2, 0),
    new Tile("12JJ", 2, 0),
];

//Player 1 hand
const p1Hand = [];
const p2Hand = [];

//The selected Tile
let selectedT;
// All the tiles drawn on the screen
let cards;   // populated after the svgs have been drawn to the screen

// DOM ELEMENTS
// DIVS
const homeScreen = document.getElementById("home-screen");
const p1handDiv = document.getElementById("player1-hand");
const p2handDiv = document.getElementById("player2-hand");
const messagesDiv = document.getElementById("messages");
const nowPlaying = document.getElementById("now-playing");
const p1ScoreDiv = document.getElementById("p1-score"); 
const p2ScoreDiv = document.getElementById("p2-score"); 
const p2thinkDiv = document.getElementById('player2-thinking');
// BUTTONS
const startBtn = document.getElementById("start-btn");
const undoBtn = document.getElementById("undo-btn");
const rotateBtn = document.getElementById("rotate-btn");


