class PuzzleInfo {
    constructor ({ puzzleBoard }) {
        this.puzzleBoard = puzzleBoard;

        this.jqPuzzleInfo = null;
        this.jqPuzzleInfoContent = null;
    }

    create() {

        const { id, jqPuzzleContainer, shiftCellCount } = this.puzzleBoard;

        const jqPuzzleInfo = $(document.createElement("div"))
            .attr({id: "info-"+id })
            .addClass("puzzle-info");

        const jqPuzzleInfoContent = $([
            "<span>Moves: </span>",
            "<span class='shift-cell-count'>0</span>"
        ].join(""));

        jqPuzzleInfo.append(jqPuzzleInfoContent);
        jqPuzzleContainer.prepend(jqPuzzleInfo);

        this.jqPuzzleInfo = jqPuzzleInfo;
        this.jqPuzzleInfoContent = jqPuzzleInfoContent;

        return this;
    }

    updateInfo({ shiftCellCount }) {

        const { jqPuzzleInfo } = this;

        $(jqPuzzleInfo)
            .find(".shift-cell-count")
            .text(shiftCellCount.toString());

        return this;

    }
}

export default PuzzleInfo;