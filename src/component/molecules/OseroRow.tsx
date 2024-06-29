import { styled } from "@material-ui/core";
import { CellRow } from "../../lib/osero";
import OseroCell from "../atoms/OseroCell";

type Props = {
    rowNum: number;
    row: CellRow;
    onClickCell: (cell: number) => void;
    lastPlace: number | null;
    reversed: number[];
    placeablePlace: number[];
};
const OseroRow = (props: Props) => {
    return (
        <SRow>
            {props.row.map((e, i) => (
                <OseroCell
                    lastPlace={props.lastPlace === props.rowNum * 8 + i}
                    key={`${Math.random()}`}
                    cellstatus={e}
                    cellNum={props.rowNum * 8 + i}
                    onClickCell={() => {
                        props.onClickCell(props.rowNum * 8 + i);
                    }}
                    reversed={props.reversed.includes(props.rowNum * 8 + i)}
                    placeablePlace={props.placeablePlace.includes(props.rowNum * 8 + i)}
                />
            ))}
        </SRow>
    );
};

const SRow = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
});

export default OseroRow;
