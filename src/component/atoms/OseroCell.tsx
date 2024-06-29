import { styled } from "@material-ui/core";
import { CellState, CellStatus } from "../../lib/osero";

type Props = {
    cellNum: number;
    cellstatus: CellState;
    onClickCell: () => void;
    lastPlace: boolean;
    reversed: boolean;
    placeablePlace: boolean;
};
const OseroCell = (props: Props) => {
    const { lastPlace, reversed, placeablePlace } = props;

    return (
        <SCell
            style={{
                background: lastPlace ? "yellow" : placeablePlace ? "#bfcec3" : reversed ? "#976871" : "#0b692d",
            }}
            onClick={props.onClickCell}
        >
            {props.cellstatus === CellStatus.Black ? (
                <SBlack>{props.cellNum}</SBlack>
            ) : props.cellstatus === CellStatus.White ? (
                <SWhite>{props.cellNum}</SWhite>
            ) : (
                <SEmpty>{props.cellNum}</SEmpty>
            )}
        </SCell>
    );
};

const SCell = styled("div")({
    width: "50px",
    height: "50px",
    background: "#0b692d",
    border: "1px #000 solid",
    padding: "4px",
});

const SWhite = styled("div")({
    width: "100%",
    height: "100%",
    background: "white",
    borderRadius: "100px",
    zIndex: 2,
});
const SEmpty = styled("div")({
    width: "100%",
    height: "100%",
    background: "none",
    borderRadius: "100px",
    zIndex: 2,
});
const SBlack = styled("div")({
    width: "100%",
    height: "100%",
    background: "black",
    borderRadius: "100px",
    zIndex: 2,
});

export default OseroCell;
