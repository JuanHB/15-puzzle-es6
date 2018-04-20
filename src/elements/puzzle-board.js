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
        this.rootElem = document.getElementById("root");

        this.id = ["puzzle-", this.constructor._generateHex()].join("");

        this.puzzleBoardElem = null;
        this.puzzleContainerElem = null;

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

        const { id, tileSize, rowsArr, columnsArr, totalCellCount, rootElem, shiftCellCount } = this;

        const puzzleContainerElem = document.createElement("div");
        puzzleContainerElem.id = id;
        puzzleContainerElem.classList.add("puzzle-container");

        const puzzleBoardElem = document.createElement("div");
        puzzleBoardElem.id = "board-"+id;
        puzzleBoardElem.classList.add("puzzle-board-grid");

        const gridRows = rowsArr.map(() => "auto").join(" ");
        const gridColumns = columnsArr.map(() => "auto").join(" ");

        puzzleBoardElem.setAttribute("style", [
            "grid-template-rows:", gridRows,";",
            "grid-template-columns:", gridColumns,";"
        ].join(""));

        let cellNumber = 0;

        // creating cells and placing it on rows and columns
        rowsArr.forEach((row, rowIndex) => {
            const rowCells = [];
            columnsArr.forEach(column => {

                const newCellElem = document.createElement("div");
                newCellElem.id = ["cell-", row, "-", column].join("");
                newCellElem.classList.add("grid-item");

                // adds the cell attributes by checking if the
                // current cell element is not the last one
                if(cellNumber < totalCellCount - 1){
                    cellNumber++;
                    newCellElem.innerHTML = cellNumber.toString();
                    newCellElem.addEventListener("click", () => this.shiftCell(newCellElem));
                    newCellElem.classList.add("number");
                } else {
                    newCellElem.classList.add("empty")
                }
                rowCells
                    .push(newCellElem);
                puzzleBoardElem
                    .appendChild(newCellElem);

            });
            rowsArr[rowIndex] = rowCells;
        });

        // appends the puzzle board to the container
        puzzleContainerElem
            .appendChild(puzzleBoardElem);

        // appends the new crated puzzle to the
        // #root element on the index file
        rootElem
            .appendChild(puzzleContainerElem);

        this.puzzleBoardElem = puzzleBoardElem;
        this.puzzleContainerElem = puzzleContainerElem;

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

    /**
     * Scramble the puzzle, only results in solvable puzzles...
     * @returns {PuzzleBoard}
     */
    scramble() {
        let previousCell, i = 1;
        this.isScrambling = true;
        this.shiftCellCount = 0;
        this.puzzleInfo.updateInfo({ shiftCellCount: this.shiftCellCount });
        const interval = setInterval(() => {
            if(i <= this.totalCellCount){
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

    /**
     * Checks if the puzzle is solvable
     * @returns {boolean}
     */
    isSolvable(){

        const arr = this.rowsArr.map(r => {
            return r.map(c => parseInt(c.innerHTML) || null);
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

        if(cell && !cell.classList.contains("empty")){

            // Tries to get empty adjacent cell
            const emptyCell = this.getEmptyAdjacentCell(cell);
            if(emptyCell){

                const cellIdStr = cell.id;
                const emptyCellIdStr = emptyCell.id;

                this.constructor._swapNodes({a: cell, b: emptyCell});
                this._swapCellOnObj({aId: cellIdStr, bId: emptyCellIdStr});

                if(!this.isScrambling){
                    this.shiftCellCount++;
                    this.puzzleInfo.updateInfo({shiftCellCount: this.shiftCellCount})
                }
            }
        }
    }

    /**
     * Get adjacent cell from the given cell
     * @param cell
     * @returns {*[]}
     */
    getAdjacentCells(cell){

        const
            { rowsArr, rows, columns } = this,
            result = [],
            id = cell.id.split("-").slice(1),
            row = parseInt(id[0]),
            col = parseInt(id[1]);

        const
            // cells from lines above and under
            above  = row > 0 ? rowsArr[row-1] ? rowsArr[row-1][col] : null : null,
            under  = row < rows-1 ? rowsArr[row+1] ? rowsArr[row+1][col] : null : null,
            // cells in the same line
            before = col > 0 ? rowsArr[row][col-1] : null,
            after  = col < columns-1 ? rowsArr[row][col+1] : null;

        if(above) result.push(above);
        if(under) result.push(under);
        if(after) result.push(after);
        if(before) result.push(before);

        return result
    }

    getEmptyAdjacentCell(cell) {
        const adjacentCells = this.getAdjacentCells(cell);
        const filterAdjacentCell = adjacentCells.filter(a => a.classList.contains("empty"))
        return filterAdjacentCell.length ? filterAdjacentCell[0] : null;
    }

    get getEmptyCell() {
        return this.puzzleBoardElem.getElementsByClassName("empty")[0];
    }

    getCell({row, column}) {
        return this.rowsArr[row][column];
    }

    /**
     * ==========================
     * ===== Private methods ====
     * ==========================
     * */

    /**
     * Generate an random HEX string
     * @returns {string}
     * @private
     */
    static _generateHex() {
        return (Math.random()*0xFFFFFF<<0).toString(16);
    }

    /**
     * Generate a random integer
     * @param from
     * @param to
     * @returns {*}
     * @private
     */
    static _rand({from, to}){
        return Math.floor(Math.random() * (to - from + 1)) + from;
    }

    /**
     * Swap DOM nodes
     * @param a
     * @param b
     * @private
     */
    static _swapNodes({a, b}) {
        const
            aId = a.id,
            bId = b.id,
            aParent = a.parentNode,
            aSibling = a.nextSibling === b ? a : a.nextSibling;
        b.parentNode.insertBefore(a, b);
        aParent.insertBefore(b, aSibling);
        a.id = bId;
        b.id = aId;
    }

    /**
     * Swap cells on the object rowsArr property
     * @param aId
     * @param bId
     * @private
     */
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