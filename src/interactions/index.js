import PuzzleBoard from "../elements/puzzle-board";

const Interactions = () => {

    /**
     * Binds the interactions from the creation form
     */
    const bindCreatePuzzleActions = () => {

        const formCreatePuzzle = document.getElementById("create-new-puzzle");

        formCreatePuzzle.addEventListener("submit", (ev) => {
            ev.preventDefault();

            const columns = parseInt(formCreatePuzzle[0].value);
            const rows = parseInt(formCreatePuzzle[1].value);
            const tileSize = parseInt(formCreatePuzzle[2].value);

            if(!isNaN(columns) && !isNaN(rows) && (rows > 1 && columns > 1)){
                const newPuzzleBoard = new PuzzleBoard({
                    columns, rows, tileSize
                });
                newPuzzleBoard.create().scramble();
            }
        });

        const puzzleBoard = new PuzzleBoard({rows: 4, columns: 4});
        puzzleBoard.create().scramble();
    };

    bindCreatePuzzleActions();

};
export default Interactions;