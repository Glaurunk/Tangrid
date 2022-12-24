class Tile
{
    constructor(id, label, top, right, bottom, left, lines, border, facing, player) 
    {  
        this.id = id;
        this.label = label;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
        this.lines  = lines;
        this.border = border;
        this.facing = facing;
        this.player = player
    }
}

// COLORS
const C_ONE = "#fa6400";
const C_TWO = "#9600fa";
const C_JOKER = "#af1414";
const C_GREY = "#333333";
const C_WHITE = "#ffffff";
const C_BLACK = "#000000";

// SIZES
const GRID_SIZE = 5;
const TILE_SIZE = 100;
const HAND_SIZE = 6;

//TILES
// The complete tile set
const tiles = [
    // Misc
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
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

//The initial grid state
const gridTiles = [
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"1212", C_ONE, C_TWO, C_ONE, C_TWO, C_WHITE, C_WHITE, 1, 0),
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile(MakeId(),"EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
];

// Player one pool of cards
const p1Tiles = [ 
    new Tile(MakeId(),"1BBB", C_ONE, C_BLACK, C_BLACK, C_BLACK, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"1BBB", C_ONE, C_BLACK, C_BLACK, C_BLACK, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"JBBB", C_JOKER, C_BLACK, C_BLACK, C_BLACK, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"11BB", C_ONE, C_ONE, C_BLACK, C_BLACK, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"11BB", C_ONE, C_ONE, C_BLACK, C_BLACK, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"1B1B", C_ONE, C_BLACK, C_ONE, C_BLACK, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"1B1B", C_ONE, C_BLACK, C_ONE, C_BLACK, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"1BJB", C_ONE, C_BLACK, C_JOKER, C_BLACK, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"1B2B", C_ONE, C_BLACK, C_TWO, C_BLACK, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"111B", C_ONE, C_ONE, C_ONE, C_BLACK, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"1B11", C_ONE, C_BLACK, C_ONE, C_ONE, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"11B1", C_ONE, C_ONE, C_BLACK, C_ONE, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"1JB1", C_ONE, C_JOKER, C_BLACK, C_ONE, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"1JB2", C_ONE, C_JOKER, C_BLACK, C_TWO, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"12JB", C_ONE, C_TWO, C_JOKER, C_BLACK, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"1122", C_ONE, C_ONE, C_TWO, C_TWO, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"1212", C_ONE, C_TWO, C_ONE, C_TWO, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"1J2J", C_ONE, C_JOKER, C_TWO, C_JOKER, C_WHITE, C_WHITE, 1, 1),
    new Tile(MakeId(),"12JJ", C_ONE, C_TWO, C_JOKER, C_JOKER, C_WHITE, C_WHITE, 1, 1),
];

// Player two pool of cards
const p2Tiles = [
    new Tile(MakeId(),"2BBB", C_TWO, C_BLACK, C_BLACK, C_BLACK, C_WHITE, C_WHITE, 0, 2),
    new Tile(MakeId(),"2BBB", C_TWO, C_BLACK, C_BLACK, C_BLACK, C_WHITE, C_WHITE, 0, 2),
    new Tile(MakeId(),"JBBB", C_JOKER, C_BLACK, C_BLACK, C_BLACK, C_WHITE, C_WHITE, 0, 2),
    new Tile(MakeId(),"22BB", C_TWO, C_TWO, C_BLACK, C_BLACK, C_WHITE, C_WHITE, 0, 2),
    new Tile(MakeId(),"22BB", C_TWO, C_TWO, C_BLACK, C_BLACK, C_WHITE, C_WHITE, 0, 2),
    new Tile(MakeId(),"2B2B", C_TWO, C_BLACK, C_TWO, C_BLACK, C_WHITE, C_WHITE, 0, 2),
    new Tile(MakeId(),"2B2B", C_TWO, C_BLACK, C_TWO, C_BLACK, C_WHITE, C_WHITE, 0, 2),
    new Tile(MakeId(),"2BJB", C_TWO, C_BLACK, C_JOKER, C_BLACK, C_WHITE, C_WHITE, 0, 2),
    new Tile(MakeId(),"222B", C_TWO, C_TWO, C_TWO, C_BLACK, C_WHITE, C_WHITE, 0, 2),
    new Tile(MakeId(),"2B22", C_TWO, C_BLACK, C_TWO, C_TWO, C_WHITE, C_WHITE, 0, 2),
    new Tile(MakeId(),"22B2", C_TWO, C_TWO, C_BLACK, C_TWO, C_WHITE, C_WHITE, 0, 2),
    new Tile(MakeId(),"2JB2", C_TWO, C_JOKER, C_BLACK, C_TWO, C_WHITE, C_WHITE, 0, 2),
    new Tile(MakeId(),"1JB2", C_ONE, C_JOKER, C_BLACK, C_TWO, C_WHITE, C_WHITE, 0, 2),
    new Tile(MakeId(),"12JB", C_ONE, C_TWO, C_JOKER, C_BLACK, C_WHITE, C_WHITE, 0, 2),
    new Tile(MakeId(),"1122", C_ONE, C_ONE, C_TWO, C_TWO, C_WHITE, C_WHITE, 0, 2),
    new Tile(MakeId(),"1212", C_ONE, C_TWO, C_ONE, C_TWO, C_WHITE, C_WHITE, 0, 2),
    new Tile(MakeId(),"1J2J", C_ONE, C_JOKER, C_TWO, C_JOKER, C_WHITE, C_WHITE, 0, 2),
    new Tile(MakeId(),"12JJ", C_ONE, C_TWO, C_JOKER, C_JOKER, C_WHITE, C_WHITE, 0, 2),
];

//Player 1 hand
const p1Hand = [];
const p2Hand = [];

//The selected Tile
let selectedT;


// DOM ELEMENTS
const p1handDiv = document.getElementById("player1-hand");
const p2handDiv = document.getElementById("player2-hand");
const messagesDiv = document.getElementById("messages");
let cards;   // populated after the svgs have been drawn to the screen