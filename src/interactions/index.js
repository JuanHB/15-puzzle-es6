import PuzzleBoard from "../elements/puzzle-board";

const Interactions = () => {

    const puzzleBoard = new PuzzleBoard({
        rows: 5, columns: 12
    });

    puzzleBoard
        .create()
        .scramble();

};
export default Interactions;