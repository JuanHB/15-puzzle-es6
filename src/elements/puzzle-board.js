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
        this.rowsMatrix = [];
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

        const { id, tileSize, rowsMatrix, rowsArr, columnsArr, totalCellCount, rootElem, shiftCellCount } = this;

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
            const rowCellsObj = [], rowCellsMatrix = [];
            columnsArr.forEach(col => {

                const newCellElem = document.createElement("div");
                newCellElem.id = ["cell-", row, "-", col].join("");
                newCellElem.classList.add("grid-item");

                // adds the cell attributes by checking if the
                // current cell element is not the last one
                if(cellNumber < totalCellCount - 1){
                    cellNumber++;
                    newCellElem.innerHTML = cellNumber.toString();
                    newCellElem.addEventListener("click", () => this.shiftCell(newCellElem));
                    newCellElem.classList.add("number");
                    rowCellsMatrix.push(cellNumber);
                } else {
                    newCellElem.classList.add("empty");
                    rowCellsMatrix.push("empty");
                }
                rowCellsObj.push(newCellElem);
                puzzleBoardElem.appendChild(newCellElem);

            });
            rowsArr[rowIndex] = rowCellsObj;
            rowsMatrix[rowIndex] = rowCellsMatrix;
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

        let i = 1,
            previousCell;
        this.isScrambling = true;
        this.shiftCellCount = 0;
        this.puzzleInfo.updateInfo({ shiftCellCount: this.shiftCellCount });

        const { rowsMatrix } = this;




        const interval = setInterval(() => {
            if(i <= this.totalCellCount){

                const adjacent = this.getAdjacentCells(this.getCellPosition("empty"));

                /*if(previousCell){
                    for(let j = adjacent.length-1; j >= 0; j--){
                        if(adjacent[j].innerHTML === previousCell.innerHTML){
                            adjacent.splice(j, 1);
                        }
                    }
                }*/

                // Gets random adjacent cell and memorizes it for the next iteration
                previousCell = adjacent[this.constructor._rand({from: 0, to: adjacent.length-1})];

                this.shiftCellObj(previousCell);

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
     * @param cellObj
     */
    shiftCell(cellObj) {
        const
            idArr = cellObj.id.split("-"),
            cell = {
                row: parseInt(idArr[1]),
                col: parseInt(idArr[2])
            },
            emptyCell = this.getAdjacentCells(cell).filter(c => c.empty)[0];

        if(emptyCell) {
            const nodesToSwap = {
                a: cellObj, b: this.getCellObj(emptyCell)
            };
            this.constructor._swapNodes(nodesToSwap);

            const cellToSwap = {
                a: cell, b: emptyCell
            };
            this._swapCellObj(cellToSwap);
            this._swapCellMatrix(cellToSwap);

            if(!this.isScrambling){
                this.shiftCellCount++;
                this.puzzleInfo.updateInfo({shiftCellCount: this.shiftCellCount})
            }
        }
    }

    getAdjacentCells({row, col}) {

        const
            { rowsMatrix, rows, columns } = this,
            adjacent = [];

        // cells from lines above and under
        adjacent[0] = row > 0 ? rowsMatrix[row-1] ? rowsMatrix[row-1][col] : null : null;
        adjacent[1] = row < rows-1 ? rowsMatrix[row+1] ? rowsMatrix[row+1][col] : null : null;
        // cells in the same line (before and after)
        adjacent[2] = col > 0 ? rowsMatrix[row][col-1] : null;
        adjacent[3] = col < columns-1 ? rowsMatrix[row][col+1] : null;

        return adjacent.filter(a => !!a).map(c => this.getCellPosition(c));

    }

    getCellObj({row, col}) {
        return this.rowsArr[row][col];
    }

    getCellPosition(cellNumber){
        const { rowsMatrix } = this;
        const res = { row: 0, col: 0, empty: false};
        rowsMatrix.forEach((r,i) => {
            if (r.includes(cellNumber)) {
                res.row = i;
                res.col = r.indexOf(cellNumber);
                res.empty = cellNumber === "empty";
            }
        });
        return res;
    }

    /**
     * Private methods
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
     * @private
     */
    _swapCellObj({a, b}){

        const
            // preserves the A and B values
            aCell = this.getCellObj(a),
            bCell = this.getCellObj(b);

        // swaps A and B inside the rows cells object array
        this.rowsArr[a.row][a.col] = bCell;
        this.rowsArr[b.row][b.col] = aCell;
        // swaps A and B inside the rows and cells matrix
        this.rowsMatrix[a.row][a.col] = parseInt(bCell.innerText) || "empty";
        this.rowsMatrix[b.row][b.col] = parseInt(aCell.innerText) || "empty";

    }

    _swapCellMatrix({a, b}){

        const
            { rowsMatrix } = this,
            cellA = rowsMatrix[a.row][a.col],
            cellB = rowsMatrix[b.row][b.col];

        this.rowsMatrix[a.row][a.col] = cellB;
        this.rowsMatrix[b.row][b.col] = cellA;
    }

}

export default PuzzleBoard;