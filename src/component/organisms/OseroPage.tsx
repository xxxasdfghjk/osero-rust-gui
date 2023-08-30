import OseroBoard from "./OseroBoard";
import { INITIAL_BOARD, PlayerStatus, Turn } from "../../lib/osero";
import { useState } from "react";
import { Box, Button, styled } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { playerTurnAtom } from "../recoil/oseroAtoms";

const OseroPage = () => {
    const [gameState, setGameState] = useState<"Playing" | "Start">("Start");
    const [_, setPlayerTurn] = useRecoilState(playerTurnAtom);
    const onClick = (turn: Turn) => {
        setPlayerTurn(turn);
        setGameState("Playing");
    };

    return (
        <>
            {gameState === "Playing" ? (
                <OseroBoard board={INITIAL_BOARD}></OseroBoard>
            ) : (
                <SContainer>
                    <SBox>
                        <SButton onClick={() => onClick(PlayerStatus.Black)}>先手</SButton>
                        <SButton onClick={() => onClick(PlayerStatus.White)}>後手</SButton>
                    </SBox>
                </SContainer>
            )}
        </>
    );
};

const SContainer = styled("div")({
    background: "#eee",
    margin: "auto 0",
});
const SBox = styled(Box)({
    justifyContent: "space-between",
    display: "flex",
});
const SButton = styled(Button)({
    width: "300px",
    height: "200px",
});

export default OseroPage;
