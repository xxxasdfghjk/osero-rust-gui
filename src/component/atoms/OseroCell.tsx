import { styled } from "@material-ui/core";
import { CellState, CellStatus } from "../../lib/osero";
import { lastPlaceAtom } from "../recoil/oseroAtoms";
import { useRecoilState } from "recoil";

type Props = {
    cellNum: number;
    cellstatus: CellState;
    onClickCell: () => void;
};
const OseroCell = (props: Props) => {
    const [lastPlace] = useRecoilState(lastPlaceAtom);
    return (
        <SCell style={{ background: props.cellNum === lastPlace ? "yellow" : "#0b692d" }} onClick={props.onClickCell}>
            {props.cellstatus === CellStatus.Black ? (
                <SBlack></SBlack>
            ) : props.cellstatus === CellStatus.White ? (
                <SWhite></SWhite>
            ) : (
                <SEmpty></SEmpty>
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
