import PuzzleBoard from "../elements/puzzle-board";

const Interactions = () => {

    const puzzleBoard = new PuzzleBoard({
        rows: 4, columns: 4
    });

    puzzleBoard
        .create()
        .scramble();

};
export default Interactions;