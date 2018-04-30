import PuzzleBoard from "../elements/puzzle-board";

const Interactions = () => {


    const bindCreatePuzzleActions = () => {

        const formCreatePuzzle = document.getElementById("create-new-puzzle");

        formCreatePuzzle.addEventListener("submit", (ev) => {
            ev.preventDefault();

            const columns = parseInt(formCreatePuzzle[0].value);
            const rows = parseInt(formCreatePuzzle[1].value);

            if(!isNaN(columns) && !isNaN(rows)){
                const newPuzzleBoard = new PuzzleBoard({
                    columns, rows
                });
                newPuzzleBoard.create().scramble();
            }
        })

    };

    bindCreatePuzzleActions();


    const puzzleBoard = new PuzzleBoard({
        rows: 2, columns: 2
    });

    puzzleBoard
        .create()
        .scramble();

};
export default Interactions;