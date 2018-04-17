import $ from "jquery";

class PuzzleControls {

    constructor({puzzleBoard}) {
        this.puzzleBoard = puzzleBoard;
    }

    create(){

        const { id, jqPuzzleContainer } = this.puzzleBoard;

        const jqPuzzleControls = $(document.createElement("div"))
            .attr({ id: "controls-"+id })
            .addClass("puzzle-controls");

        const jqScrambleButton = $(document.createElement("button"))
            .attr({ id: "scramble-"+id })
            .html("Scramble")
            .click(() => this.puzzleBoard.scramble())
            .addClass("action scramble");

        const jqSolveButton = $(document.createElement("button"))
            .attr({ id: "solve-"+id })
            .html("Solve")
            .click(() => this.puzzleBoard.solve())
            .addClass("action solve");

        jqPuzzleControls
            .append(jqSolveButton, jqScrambleButton);

        jqPuzzleContainer
            .append(jqPuzzleControls);

    }

}

export default PuzzleControls;