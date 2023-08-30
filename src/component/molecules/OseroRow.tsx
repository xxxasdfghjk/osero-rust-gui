import { styled } from "@material-ui/core";
import { CellRow } from "../../lib/osero";
import OseroCell from "../atoms/OseroCell";

type Props = {
    rowNum: number;
    row: CellRow;
    onClickCell: (cell: number) => void;
};
const OseroRow = (props: Props) => {
    return (
        <SRow>
            {props.row.map((e, i) => (
                <OseroCell
                    key={`${Math.random()}`}
                    cellstatus={e}
                    cellNum={props.rowNum * 8 + i}
                    onClickCell={() => {
                        props.onClickCell(props.rowNum * 8 + i);
                    }}
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
