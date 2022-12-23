class Tile
{
    constructor(id, top, right, bottom, left, lines, border, side, player) 
    {  
        this.id = id;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
        this.lines  = lines;
        this.border = border;
        this.side = side;
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

// The complete tile pool
const tiles = [
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("BBBB", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, C_WHITE, 1, 99),
    // One side
    new Tile("1BBB", C_ONE, C_BLACK, C_BLACK, C_BLACK, C_WHITE, C_WHITE, 1, 1),
    new Tile("2BBB", C_TWO, C_BLACK, C_BLACK, C_BLACK, C_WHITE, C_WHITE, 1, 2),
    new Tile("JBBB", C_JOKER, C_BLACK, C_BLACK, C_BLACK, C_WHITE, C_WHITE, 1, 0),
    // Two Sides
    new Tile("11BB", C_ONE, C_ONE, C_BLACK, C_BLACK, C_WHITE, C_WHITE, 1, 1),
    new Tile("1B1B", C_ONE, C_BLACK, C_ONE, C_BLACK, C_WHITE, C_WHITE, 1, 1),
    new Tile("1BJB", C_ONE, C_BLACK, C_JOKER, C_BLACK, C_WHITE, C_WHITE, 1, 1),
    new Tile("22BB", C_TWO, C_TWO, C_BLACK, C_BLACK, C_WHITE, C_WHITE, 1, 2),
    new Tile("2B2B", C_TWO, C_BLACK, C_TWO, C_BLACK, C_WHITE, C_WHITE, 1, 2),
    new Tile("2BJB", C_TWO, C_BLACK, C_JOKER, C_BLACK, C_WHITE, C_WHITE, 1, 2),
    new Tile("1B2B", C_ONE, C_BLACK, C_TWO, C_BLACK, C_WHITE, C_WHITE, 1, 0),
    // Three sides
    new Tile("111B", C_ONE, C_ONE, C_ONE, C_BLACK, C_WHITE, C_WHITE, 1, 1),
    new Tile("1B11", C_ONE, C_BLACK, C_ONE, C_ONE, C_WHITE, C_WHITE, 1, 1),
    new Tile("11B1", C_ONE, C_ONE, C_BLACK, C_ONE, C_WHITE, C_WHITE, 1, 1),
    new Tile("1JB1", C_ONE, C_JOKER, C_BLACK, C_ONE, C_WHITE, C_WHITE, 1, 1),
    new Tile("222B", C_TWO, C_TWO, C_TWO, C_BLACK, C_WHITE, C_WHITE, 1, 2),
    new Tile("2B22", C_TWO, C_BLACK, C_TWO, C_TWO, C_WHITE, C_WHITE, 1, 2),
    new Tile("22B2", C_TWO, C_TWO, C_BLACK, C_TWO, C_WHITE, C_WHITE, 1, 2),
    new Tile("2JB2", C_TWO, C_JOKER, C_BLACK, C_TWO, C_WHITE, C_WHITE, 1, 2),
    new Tile("1JB2", C_ONE, C_JOKER, C_BLACK, C_TWO, C_WHITE, C_WHITE, 1, 0),
    new Tile("12JB", C_ONE, C_TWO, C_JOKER, C_BLACK, C_WHITE, C_WHITE, 1, 0),
    // Four sides
    new Tile("1122", C_ONE, C_ONE, C_TWO, C_TWO, C_WHITE, C_WHITE, 1, 0),
    new Tile("1212", C_ONE, C_TWO, C_ONE, C_TWO, C_WHITE, C_WHITE, 1, 0),
    new Tile("1J2J", C_ONE, C_JOKER, C_TWO, C_JOKER, C_WHITE, C_WHITE, 1, 0),
    new Tile("12JJ", C_ONE, C_TWO, C_JOKER, C_JOKER, C_WHITE, C_WHITE, 1, 0),
];

//The initial grid state
const gridTiles = [
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("1212", C_ONE, C_TWO, C_ONE, C_TWO, C_WHITE, C_WHITE, 1, 0),
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
    new Tile("EMPTY", C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_BLACK, C_WHITE, 1, 99),
];


// DOM ELEMENTS
const gridEl = document.getElementById("grid");
