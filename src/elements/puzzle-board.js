import $ from 'jquery';
import PuzzleControls from './puzzle-controls';
import PuzzleInfo from './puzzle-info';
/**
 * Creates a new Puzzle object
 */
class PuzzleBoard {

    /**
     * The class constructor function
     * @param rows {Number} The total number of rows
     * @param columns {Number} The total number of columns
     * @param tileSize {Number} The tile size in pixels, default 80px
     */
    constructor({rows, columns , tileSize = 80}){

        this.rows = rows;
        this.columns = columns;
        this.tileSize = tileSize;
        this.jqRootElem = $("#root");

        this.id = ["puzzle-", this.constructor._generateHex()].join("");

        this.jqPuzzleBoard = null;
        this.jqPuzzleContainer = null;

        this.rowsArr = [...Array(this.rows).keys()];
        this.columnsArr = [...Array(this.columns).keys()];
        this.totalCellCount = this.rows * this.columns;

        this.isScrambling = false;

        this.shiftCellCount = 0;

        this.puzzleInfo = null;
        this.puzzleControls = null;

    }

    /**
     * Creates a new, solved puzzle
     */
    create() {

        const { id, tileSize, rowsArr, columnsArr, totalCellCount, jqRootElem, shiftCellCount } = this;

        const jqPuzzleContainer = $(document.createElement("div"))
            .addClass("puzzle-container")
            .attr({id});

        const jqPuzzleBoard = $(document.createElement("div"))
            .attr({ id:'board-'+id })
            .addClass("puzzle-board-grid");

        let cellNumber = 0;

        // creating cells and placing it on rows and columns
        rowsArr.forEach((row, rowIndex) => {
            const rowCells = [];
            columnsArr.forEach(column => {

                const jqNewCell = $(document.createElement("div"));
                jqNewCell
                    .attr("id", ["cell-", row, "-", column].join(""))
                    .addClass("grid-item");

                // adds the cell attributes by checking if the
                // current cell element is not the last one
                if(cellNumber < totalCellCount - 1){
                    cellNumber++;
                    jqNewCell
                        .html(cellNumber.toString())
                        .click(() => this.shiftCell(jqNewCell))
                        .addClass("number");
                } else {
                    jqNewCell
                        .addClass("empty");
                }
                rowCells.push(jqNewCell);
                jqPuzzleBoard.append(jqNewCell);

            });
            rowsArr[rowIndex] = rowCells;
        });

        // appends the puzzle board to the container
        jqPuzzleContainer.append(jqPuzzleBoard);

        // appends the new crated puzzle to the
        // #root element on the index file
        jqRootElem.append(jqPuzzleContainer);

        this.jqPuzzleBoard = jqPuzzleBoard;
        this.jqPuzzleContainer = jqPuzzleContainer;

        // Creates the controls elements for the puzzle board
        const puzzleControls = new PuzzleControls({puzzleBoard: this});
        this.puzzleControls = puzzleControls.create();

        // creates the puzzle info panel
        const puzzleInfo = new PuzzleInfo({puzzleBoard: this});
        this.puzzleInfo = puzzleInfo
            .create()
            .updateInfo({shiftCellCount});

        return this;
    }

    scramble() {
        let previousCell, i = 1;
        this.isScrambling = true;
        this.shiftCellCount = 0;
        this.puzzleInfo.updateInfo({ shiftCellCount: 0 });
        const interval = setInterval(() => {
            if(i <= 10){
                const adjacent = this.getAdjacentCells(this.getEmptyCell);
                if(previousCell){
                    for(let j = adjacent.length-1; j >= 0; j--){
                        if(adjacent[j].innerHTML === previousCell.innerHTML){
                            adjacent.splice(j, 1);
                        }
                    }
                }
                // Gets random adjacent cell and memorizes it for the next iteration
                previousCell = adjacent[this.constructor._rand({from: 0, to: adjacent.length-1})];
                this.shiftCell(previousCell);
                i++;
            } else {
                clearInterval(interval);

                console.log(this.isSolvable())
                // recursion is bad!! >:(
                if(!this.isSolvable()) {
                    this.scramble();
                } else {
                    this.isScrambling = false;
                }
            }
        }, 5);

        return this;
    }

    solve() {
        console.log("solve");
    }

    isSolvable(){

        const arr = this.rowsArr.map(r => {
            return r.map(c => parseInt(c.text()) || null);
        });

        let inversions = 0;

        for(let i = 0; i < arr.length - 1; i++) {
            // Check if a larger number exists after the current
            // place in the array, if so increment inversions.
            for(let j = i + 1; j < arr.length; j++)
            if(arr[i] > arr[j]) inversions++;

            // Determine if the distance of the blank space from the bottom
            // right is even or odd, and increment inversions if it is odd.
            if(arr[i] === 0 && i % 2 === 1) inversions++;
        }

        // If inversions is even, the puzzle is solvable.
        return (inversions % 2 === 0);
    }

    /**
     * Shifts the given cell to the empty space
     * @param cell
     */
    shiftCell(cell) {

        const jqCell = $(cell);

        if(!jqCell.hasClass("empty")){

            // Tries to get empty adjacent cell
            const jqEmptyCell = $(this.getEmptyAdjacentCell(jqCell));
            if(jqEmptyCell && jqEmptyCell.length){

                const cellIdStr = jqCell.attr("id");
                const emptyCellIdStr = jqEmptyCell.attr("id");

                this.constructor._swapNodes({a: jqCell[0], b: jqEmptyCell[0]});
                this._swapCellOnObj({aId: cellIdStr, bId: emptyCellIdStr});

                if(!this.isScrambling){
                    this.shiftCellCount++;
                    this.puzzleInfo.updateInfo({shiftCellCount: this.shiftCellCount})
                }
            }
        }
    }

    getAdjacentCells(cell){

        const
            { rowsArr, rows, columns } = this,
            id = cell.attr("id").split("-").slice(1),
            row = parseInt(id[0]),
            col = parseInt(id[1]);

        const
            // cells from lines above and under
            above  = row > 0 ? rowsArr[row-1] ? rowsArr[row-1][col] : [] : [],
            under  = row < rows-1 ? rowsArr[row+1] ? rowsArr[row+1][col] : [] : [],
            // cells in the same line
            before = col > 0 ? rowsArr[row][col-1] : [],
            after  = col < columns-1 ? rowsArr[row][col+1] : [];

        return [...above, ...before, ...after, ...under];
    }

    getEmptyAdjacentCell(cell) {
        const adjacentCells = this.getAdjacentCells(cell);
        return adjacentCells.filter(a => a.className.includes("empty"));
    }

    get getEmptyCell() {
        return this.jqPuzzleBoard.find('.empty');
    }

    getCell({row, column}) {
        return this.rowsArr[row][column];
    }

    static _generateHex() {
        return (Math.random()*0xFFFFFF<<0).toString(16);
    }

    static _rand({from, to}){
        return Math.floor(Math.random() * (to - from + 1)) + from;
    }

    static _swapNodes({a, b}) {
        const
            jqA = $(a), jqB = $(b),
            aId = jqA.attr("id"),
            bId = jqB.attr("id"),
            aParent = a.parentNode,
            aSibling = a.nextSibling === b ? a : a.nextSibling;
        b.parentNode.insertBefore(a, b);
        aParent.insertBefore(b, aSibling);
        jqA.attr("id", bId);
        jqB.attr("id", aId);
    }

    _swapCellOnObj({aId, bId}){

        const
            aIdArr = aId.split("-").slice(1),
            bIdArr = bId.split("-").slice(1),
            // preserves the A and B values
            aCell = this.getCell({row: aIdArr[0], column: aIdArr[1]}),
            bCell = this.getCell({row: bIdArr[0], column: bIdArr[1]});

        // swaps A and B inside the rows array
        this.rowsArr[aIdArr[0]][aIdArr[1]] = bCell;
        this.rowsArr[bIdArr[0]][bIdArr[1]] = aCell;

    }

}

export default PuzzleBoard;