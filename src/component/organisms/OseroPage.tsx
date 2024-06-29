import OseroBoard from "./OseroBoard";
import { useState } from "react";
import { Box, Button, styled } from "@material-ui/core";

const OseroPage = () => {
    const [gameState, setGameState] = useState<"Playing" | "Start">("Start");
    const [playerTurn, setPlayerTurn] = useState<"BLACK" | "WHITE">("BLACK");
    const onClick = (turn: "BLACK" | "WHITE") => {
        setPlayerTurn(turn);
        setGameState("Playing");
    };

    return (
        <>
            {gameState === "Playing" ? (
                <OseroBoard playerTurn={playerTurn}></OseroBoard>
            ) : (
                <SContainer>
                    <SBox>
                        <SButton onClick={() => onClick("BLACK")}>先手</SButton>
                        <SButton onClick={() => onClick("WHITE")}>後手</SButton>
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
