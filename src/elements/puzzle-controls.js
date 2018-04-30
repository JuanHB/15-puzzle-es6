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

        const removeButtonElem = document.createElement("button");
        removeButtonElem.id = "remove-"+id;
        removeButtonElem.innerHTML = "Remove Board";
        removeButtonElem.classList.add("action");
        removeButtonElem.classList.add("remove");
        removeButtonElem.addEventListener("click", () => this.puzzleBoard.remove());

        puzzleControlsElem.appendChild(removeButtonElem);
        puzzleControlsElem.appendChild(scrambleButtonElem);

        puzzleContainerElem
            .appendChild(puzzleControlsElem);

    }

}

export default PuzzleControls;