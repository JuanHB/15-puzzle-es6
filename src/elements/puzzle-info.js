class PuzzleInfo {
    constructor ({ puzzleBoard }) {
        this.puzzleBoard = puzzleBoard;
        this.puzzleInfoElem = null;
    }

    create() {

        const { id, puzzleContainerElem } = this.puzzleBoard;

        const puzzleInfoElem = document.createElement("div");
        puzzleInfoElem.id = "info-"+id;
        puzzleInfoElem.classList.add("puzzle-info");

        const puzzleInfoContentMovesLabel = document.createElement("span");
        puzzleInfoContentMovesLabel.innerHTML = "Moves: ";

        const puzzleInfoContentMovesCount = document.createElement("span");
        puzzleInfoContentMovesCount.innerHTML = "0";
        puzzleInfoContentMovesCount.classList.add("shift-cell-count");

        puzzleInfoElem
            .appendChild(puzzleInfoContentMovesLabel)
            .appendChild(puzzleInfoContentMovesCount);

        puzzleContainerElem
            .prepend(puzzleInfoElem);

        this.puzzleInfoElem = puzzleInfoElem;

        return this;
    }

    updateInfo({ shiftCellCount }) {

        const { puzzleInfoElem } = this;
        document.getElementById(puzzleInfoElem.id)
            .getElementsByClassName("shift-cell-count")[0]
            .innerHTML = shiftCellCount.toString();
        return this;

    }
}

export default PuzzleInfo;