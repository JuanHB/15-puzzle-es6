class PuzzleControls {

    constructor({puzzleBoard}) {
        this.puzzleBoard = puzzleBoard;
    }

    create(){

        const { id, puzzleContainerElem } = this.puzzleBoard;

        const puzzleControlsElem = document.createElement("div");
        puzzleControlsElem.id = "controls-"+id;
        puzzleControlsElem.classList.add("puzzle-controls");

        const scrambleButtonElem = document.createElement("button");
        scrambleButtonElem.id = "scramble-"+id;
        scrambleButtonElem.innerHTML = "Scramble";
        scrambleButtonElem.classList.add("action");
        scrambleButtonElem.classList.add("scramble");
        scrambleButtonElem.addEventListener("click", () => this.puzzleBoard.scramble());

        const solveButtonElem = document.createElement("button");
        solveButtonElem.id = "solve-"+id;
        solveButtonElem.innerHTML = "Solve";
        solveButtonElem.classList.add("action");
        solveButtonElem.classList.add("solve");
        solveButtonElem.addEventListener("click", () => this.puzzleBoard.solve());

        puzzleControlsElem.appendChild(solveButtonElem);
        puzzleControlsElem.appendChild(scrambleButtonElem);

        puzzleContainerElem
            .appendChild(puzzleControlsElem);

    }

}

export default PuzzleControls;