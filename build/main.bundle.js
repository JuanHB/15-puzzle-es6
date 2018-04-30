/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/elements/puzzle-board.js":
/*!**************************************!*\
  !*** ./src/elements/puzzle-board.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _puzzleControls = __webpack_require__(/*! ./puzzle-controls */ "./src/elements/puzzle-controls.js");

var _puzzleControls2 = _interopRequireDefault(_puzzleControls);

var _puzzleInfo = __webpack_require__(/*! ./puzzle-info */ "./src/elements/puzzle-info.js");

var _puzzleInfo2 = _interopRequireDefault(_puzzleInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a new Puzzle object
 */
var PuzzleBoard = function () {

    /**
     * The class constructor function
     * @param rows {Number} The total number of rows
     * @param columns {Number} The total number of columns
     * @param tileSize {Number} The tile size in pixels, default 80px
     */
    function PuzzleBoard(_ref) {
        var rows = _ref.rows,
            columns = _ref.columns,
            _ref$tileSize = _ref.tileSize,
            tileSize = _ref$tileSize === undefined ? 100 : _ref$tileSize;

        _classCallCheck(this, PuzzleBoard);

        this.rows = rows;
        this.columns = columns;
        this.tileSize = tileSize;
        this.rootElem = document.getElementById("root");

        this.id = ["puzzle-", this.constructor._generateHex()].join("");

        this.puzzleBoardElem = null;
        this.puzzleContainerElem = null;

        this.rowsArr = [].concat(_toConsumableArray(Array(this.rows).keys()));
        this.columnsArr = [].concat(_toConsumableArray(Array(this.columns).keys()));
        this.rowsMatrix = [];
        this.totalCellCount = this.rows * this.columns;

        this.solvedCondition = null;

        this.isSolved = false;

        this.isScrambling = false;
        this.shiftCellCount = 0;

        this.puzzleInfo = null;
        this.puzzleControls = null;
    }

    /**
     * Creates a new, solved puzzle
     */


    _createClass(PuzzleBoard, [{
        key: "create",
        value: function create() {
            var _this = this;

            var id = this.id,
                columns = this.columns,
                rowsArr = this.rowsArr,
                rootElem = this.rootElem,
                tileSize = this.tileSize,
                rowsMatrix = this.rowsMatrix,
                columnsArr = this.columnsArr,
                totalCellCount = this.totalCellCount,
                shiftCellCount = this.shiftCellCount;


            var gridRows = rowsArr.map(function () {
                return "auto";
            }).join(" ");
            var gridColumns = columnsArr.map(function () {
                return "auto";
            }).join(" ");
            var puzzleBoardElem = document.createElement("ul");
            var puzzleContainerElem = document.createElement("div");

            var cellNumber = 0;

            // puzzle container element attributes
            puzzleContainerElem.id = id;
            puzzleContainerElem.classList.add("puzzle-container");

            // puzzle board element attributes and style
            puzzleBoardElem.id = "board-" + id;
            puzzleBoardElem.classList.add("puzzle-board-grid");
            puzzleBoardElem.setAttribute("style", ["max-width:", columns * tileSize + 90, "px;"].join(""));

            // creating cells and placing it on rows and columns
            rowsArr.forEach(function (row, rowIndex) {
                var rowCellsObj = [],
                    rowCellsMatrix = [];
                columnsArr.forEach(function (col) {

                    var newCellElem = document.createElement("li");
                    newCellElem.id = ["cell-", row, "-", col].join("");
                    newCellElem.classList.add("grid-item");
                    newCellElem.setAttribute("style", ["width:", tileSize, "px;", "height:", tileSize, "px;", "line-height:", tileSize, "px;"].join(""));

                    // adds the cell attributes by checking if the
                    // current cell element is not the last one
                    if (cellNumber < totalCellCount - 1) {
                        cellNumber++;
                        newCellElem.innerHTML = cellNumber.toString();
                        newCellElem.classList.add("number");
                        rowCellsMatrix.push(cellNumber);
                    } else {
                        newCellElem.classList.add("empty");
                        rowCellsMatrix.push("empty");
                    }

                    newCellElem.addEventListener("click", function () {
                        return _this.shiftCell(newCellElem);
                    });

                    rowCellsObj.push(newCellElem);
                    puzzleBoardElem.appendChild(newCellElem);
                });
                rowsArr[rowIndex] = rowCellsObj;
                rowsMatrix[rowIndex] = rowCellsMatrix;
            });

            // appends the puzzle board to the container
            puzzleContainerElem.appendChild(puzzleBoardElem);

            // appends the new crated puzzle to the
            // #root element on the index file
            rootElem.appendChild(puzzleContainerElem);

            this.puzzleBoardElem = puzzleBoardElem;
            this.puzzleContainerElem = puzzleContainerElem;

            // Creates the controls elements for the puzzle board
            var puzzleControls = new _puzzleControls2.default({ puzzleBoard: this });
            this.puzzleControls = puzzleControls.create();

            // creates the puzzle info panel
            var puzzleInfo = new _puzzleInfo2.default({ puzzleBoard: this });
            this.puzzleInfo = puzzleInfo.create().updateInfo({ shiftCellCount: shiftCellCount });

            // creates and store the solved condition string
            var arr = Array.from(new Array(totalCellCount), function (val, index) {
                return index + 1;
            });
            arr[arr.length - 1] = "empty";
            this.solvedCondition = arr.join("");

            return this;
        }

        /**
         * Scramble the puzzle, only results in solvable puzzles...
         * @returns {PuzzleBoard}
         */

    }, {
        key: "scramble",
        value: function scramble() {

            this.isSolved = false;
            this.isScrambling = true;
            this.shiftCellCount = 0;
            this.puzzleInfo.updateInfo({ shiftCellCount: this.shiftCellCount });

            var rowsMatrix = this.rowsMatrix,
                rowsArr = this.rowsArr;

            // do the scramble 200 times...

            for (var i = 0; i < 200; i++) {

                var emptyCell = this.getCellPosition("empty");
                var adjacent = this.getAdjacentCells(emptyCell);
                var randomCell = adjacent[this.constructor._rand({ from: 0, to: adjacent.length - 1 })];
                var cellsToSwap = { a: emptyCell, b: randomCell };
                this._swapCellMatrix(cellsToSwap);
            }

            // if is not solvable, runs the scramble again (recursions bad, I know)
            if (!this.checkIfSolvable()) {
                return this.scramble();
            }

            // updating the HTML with the new values for each position
            rowsMatrix.forEach(function (row, rowIndex) {
                row.forEach(function (cell, cellIndex) {
                    var destCellObj = rowsArr[rowIndex][cellIndex];
                    destCellObj.innerText = cell === "empty" ? "" : cell;
                    destCellObj.classList.toggle("number", cell !== "empty");
                    destCellObj.classList.toggle("empty", cell === "empty");
                });
            });

            this.isScrambling = false;

            return this;
        }
    }, {
        key: "remove",
        value: function remove() {
            this.puzzleContainerElem.remove();
        }

        /**
         * Checks if the puzzle is solvable
         * @returns {boolean}
         */

    }, {
        key: "checkIfSolvable",
        value: function checkIfSolvable() {

            var arr = this.rowsMatrix.map(function (r) {
                return r.map(function (c) {
                    return c || null;
                });
            });

            var inversions = 0;

            for (var i = 0; i < arr.length - 1; i++) {
                // Check if a larger number exists after the current
                // place in the array, if so increment inversions.
                for (var j = i + 1; j < arr.length; j++) {
                    if (arr[i] > arr[j]) inversions++;
                } // Determine if the distance of the blank space from the bottom
                // right is even or odd, and increment inversions if it is odd.
                if (arr[i] === 0 && i % 2 === 1) inversions++;
            }

            // If inversions is even, the puzzle is solvable.
            return inversions % 2 === 0;
        }

        /**
         * Checks if the puzzle is solved
         */

    }, {
        key: "checkIfSolved",
        value: function checkIfSolved() {
            var solvedCondition = this.solvedCondition,
                rowsMatrix = this.rowsMatrix;

            var currentCondition = rowsMatrix.map(function (r) {
                return r.map(function (c) {
                    return c;
                }).join("");
            }).join("");

            return currentCondition === solvedCondition;
        }

        /**
         * Shifts the given cell to the empty space
         * @param cellObj
         */

    }, {
        key: "shiftCell",
        value: function shiftCell(cellObj) {

            if (cellObj.classList.contains("empty")) {
                return null;
            }

            var idArr = cellObj.id.split("-"),
                cell = {
                row: parseInt(idArr[1]),
                col: parseInt(idArr[2])
            },
                emptyCell = this.getAdjacentCells(cell).filter(function (c) {
                return c.empty;
            })[0];

            if (emptyCell) {
                var nodesToSwap = {
                    a: cellObj, b: this.getCellObj(emptyCell)
                };
                this.constructor._swapNodes(nodesToSwap);

                var cellToSwap = {
                    a: cell, b: emptyCell
                };
                this._swapCellObj(cellToSwap);
                this._swapCellMatrix(cellToSwap);

                if (!this.isScrambling) {
                    this.shiftCellCount++;
                    this.puzzleInfo.updateInfo({ shiftCellCount: this.shiftCellCount });
                }

                this.isSolved = this.checkIfSolved();

                if (this.isSolved) {
                    alert("yay, you solved it!!");
                }
            }
        }
    }, {
        key: "getAdjacentCells",
        value: function getAdjacentCells(_ref2) {
            var _this2 = this;

            var row = _ref2.row,
                col = _ref2.col;
            var rowsMatrix = this.rowsMatrix,
                rows = this.rows,
                columns = this.columns,
                adjacent = [];

            // cells from lines above and under

            adjacent[0] = row > 0 ? rowsMatrix[row - 1] ? rowsMatrix[row - 1][col] : null : null;
            adjacent[1] = row < rows - 1 ? rowsMatrix[row + 1] ? rowsMatrix[row + 1][col] : null : null;
            // cells in the same line (before and after)
            adjacent[2] = col > 0 ? rowsMatrix[row][col - 1] : null;
            adjacent[3] = col < columns - 1 ? rowsMatrix[row][col + 1] : null;

            return adjacent.filter(function (a) {
                return !!a;
            }).map(function (c) {
                return _this2.getCellPosition(c);
            });
        }
    }, {
        key: "getCellObj",
        value: function getCellObj(_ref3) {
            var row = _ref3.row,
                col = _ref3.col;

            return this.rowsArr[row][col];
        }
    }, {
        key: "getCellPosition",
        value: function getCellPosition(cellNumber) {
            var rowsMatrix = this.rowsMatrix;

            var res = { row: 0, col: 0, empty: false };
            rowsMatrix.forEach(function (r, i) {
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

    }, {
        key: "_swapCellObj",


        /**
         * Swap cells on the object rowsArr property
         * @private
         */
        value: function _swapCellObj(_ref4) {
            var a = _ref4.a,
                b = _ref4.b;


            var
            // preserves the A and B values
            aCell = this.getCellObj(a),
                bCell = this.getCellObj(b);

            // swaps A and B inside the rows cells object array
            this.rowsArr[a.row][a.col] = bCell;
            this.rowsArr[b.row][b.col] = aCell;
        }
    }, {
        key: "_swapCellMatrix",
        value: function _swapCellMatrix(_ref5) {
            var a = _ref5.a,
                b = _ref5.b;

            var rowsMatrix = this.rowsMatrix,
                cellA = rowsMatrix[a.row][a.col],
                cellB = rowsMatrix[b.row][b.col];


            this.rowsMatrix[a.row][a.col] = cellB;
            this.rowsMatrix[b.row][b.col] = cellA;
        }
    }], [{
        key: "_generateHex",
        value: function _generateHex() {
            return (Math.random() * 0xFFFFFF << 0).toString(16);
        }

        /**
         * Generate a random integer
         * @param from
         * @param to
         * @returns {*}
         * @private
         */

    }, {
        key: "_rand",
        value: function _rand(_ref6) {
            var from = _ref6.from,
                to = _ref6.to;

            return Math.floor(Math.random() * (to - from + 1)) + from;
        }

        /**
         * Swap DOM nodes
         * @param a
         * @param b
         * @private
         */

    }, {
        key: "_swapNodes",
        value: function _swapNodes(_ref7) {
            var a = _ref7.a,
                b = _ref7.b;

            var aId = a.id,
                bId = b.id,
                aParent = a.parentNode,
                aSibling = a.nextSibling === b ? a : a.nextSibling;
            b.parentNode.insertBefore(a, b);
            aParent.insertBefore(b, aSibling);
            a.id = bId;
            b.id = aId;
        }
    }]);

    return PuzzleBoard;
}();

exports.default = PuzzleBoard;

/***/ }),

/***/ "./src/elements/puzzle-controls.js":
/*!*****************************************!*\
  !*** ./src/elements/puzzle-controls.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PuzzleControls = function () {
    function PuzzleControls(_ref) {
        var puzzleBoard = _ref.puzzleBoard;

        _classCallCheck(this, PuzzleControls);

        this.puzzleBoard = puzzleBoard;
    }

    _createClass(PuzzleControls, [{
        key: "create",
        value: function create() {
            var _this = this;

            var _puzzleBoard = this.puzzleBoard,
                id = _puzzleBoard.id,
                puzzleContainerElem = _puzzleBoard.puzzleContainerElem;


            var puzzleControlsElem = document.createElement("div");
            puzzleControlsElem.id = "controls-" + id;
            puzzleControlsElem.classList.add("puzzle-controls");

            var scrambleButtonElem = document.createElement("button");
            scrambleButtonElem.id = "scramble-" + id;
            scrambleButtonElem.innerHTML = "Scramble";
            scrambleButtonElem.classList.add("action");
            scrambleButtonElem.classList.add("scramble");
            scrambleButtonElem.addEventListener("click", function () {
                return _this.puzzleBoard.scramble();
            });

            var removeButtonElem = document.createElement("button");
            removeButtonElem.id = "remove-" + id;
            removeButtonElem.innerHTML = "Remove Board";
            removeButtonElem.classList.add("action");
            removeButtonElem.classList.add("remove");
            removeButtonElem.addEventListener("click", function () {
                return _this.puzzleBoard.remove();
            });

            puzzleControlsElem.appendChild(removeButtonElem);
            puzzleControlsElem.appendChild(scrambleButtonElem);

            puzzleContainerElem.appendChild(puzzleControlsElem);
        }
    }]);

    return PuzzleControls;
}();

exports.default = PuzzleControls;

/***/ }),

/***/ "./src/elements/puzzle-info.js":
/*!*************************************!*\
  !*** ./src/elements/puzzle-info.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PuzzleInfo = function () {
    function PuzzleInfo(_ref) {
        var puzzleBoard = _ref.puzzleBoard;

        _classCallCheck(this, PuzzleInfo);

        this.puzzleBoard = puzzleBoard;
        this.puzzleInfoElem = null;
    }

    _createClass(PuzzleInfo, [{
        key: "create",
        value: function create() {
            var _puzzleBoard = this.puzzleBoard,
                id = _puzzleBoard.id,
                puzzleContainerElem = _puzzleBoard.puzzleContainerElem;


            var puzzleInfoElem = document.createElement("div");
            puzzleInfoElem.id = "info-" + id;
            puzzleInfoElem.classList.add("puzzle-info");

            var puzzleInfoContentMovesLabel = document.createElement("span");
            puzzleInfoContentMovesLabel.innerHTML = "Moves: ";

            var puzzleInfoContentMovesCount = document.createElement("span");
            puzzleInfoContentMovesCount.innerHTML = "0";
            puzzleInfoContentMovesCount.classList.add("shift-cell-count");

            puzzleInfoElem.appendChild(puzzleInfoContentMovesLabel).appendChild(puzzleInfoContentMovesCount);

            puzzleContainerElem.prepend(puzzleInfoElem);

            this.puzzleInfoElem = puzzleInfoElem;

            return this;
        }
    }, {
        key: "updateInfo",
        value: function updateInfo(_ref2) {
            var shiftCellCount = _ref2.shiftCellCount;
            var puzzleInfoElem = this.puzzleInfoElem;

            document.getElementById(puzzleInfoElem.id).getElementsByClassName("shift-cell-count")[0].innerHTML = shiftCellCount.toString();
            return this;
        }
    }]);

    return PuzzleInfo;
}();

exports.default = PuzzleInfo;

/***/ }),

/***/ "./src/interactions/index.js":
/*!***********************************!*\
  !*** ./src/interactions/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _puzzleBoard = __webpack_require__(/*! ../elements/puzzle-board */ "./src/elements/puzzle-board.js");

var _puzzleBoard2 = _interopRequireDefault(_puzzleBoard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Interactions = function Interactions() {

    /**
     * Binds the interactions from the creation form
     */
    var bindCreatePuzzleActions = function bindCreatePuzzleActions() {

        var formCreatePuzzle = document.getElementById("create-new-puzzle");

        formCreatePuzzle.addEventListener("submit", function (ev) {
            ev.preventDefault();

            var columns = parseInt(formCreatePuzzle[0].value);
            var rows = parseInt(formCreatePuzzle[1].value);
            var tileSize = parseInt(formCreatePuzzle[2].value);

            if (!isNaN(columns) && !isNaN(rows) && rows > 1 && columns > 1) {
                var newPuzzleBoard = new _puzzleBoard2.default({
                    columns: columns, rows: rows, tileSize: tileSize
                });
                newPuzzleBoard.create().scramble();
            }
        });

        var puzzleBoard = new _puzzleBoard2.default({ rows: 4, columns: 4 });
        puzzleBoard.create().scramble();
    };

    bindCreatePuzzleActions();
};
exports.default = Interactions;

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");

var _interactions = __webpack_require__(/*! ./interactions */ "./src/interactions/index.js");

var _interactions2 = _interopRequireDefault(_interactions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", _interactions2.default);

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map