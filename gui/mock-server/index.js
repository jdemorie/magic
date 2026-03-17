import express from "express";
import cors from "cors";
import {server as mockServer} from "./server.js";
import cards from "./card.json" with {type: "json"};

mockServer.listen();

const app = express();
app.use(cors());
app.use(express.json());

let playerOneName = "";
let playerTwoName = "";
let activePlayer = "";
let currentPlayerOneCards = [...cards];
let currentPlayerTwoCards = [...cards];
let playerOneHealth = 10;
let playerTwoHealth = 10;
let playerOneManaSlots = 0;
let playerTwoManaSlots = 0;

app.post('/server/start', (req, res) => {
    setTimeout(() => {
        const p1 = req.query.playerOneName;
        const p2 = req.query.playerTwoName;
        playerOneName = p1;
        playerTwoName = p2;
        activePlayer = playerOneName;
        playerOneManaSlots = 10;
        res.json({message: 'Game started'});
    }, 100);
});

app.put('/server/game/player/play', (req, res) => {
    const playerName = req.query.playerName;
    const cardIndex = req.query.cardIndex;
    if (playerName === playerOneName) {
        if (cardIndex >= 0 && cardIndex < currentPlayerOneCards.length) {
            const mana = currentPlayerOneCards[cardIndex].mana;
            if (playerOneManaSlots < mana) {
                return res.status(400).json({message: 'Not enough mana'});
            }
            playerTwoHealth = Math.max(playerTwoHealth - mana, 0);
            if (playerTwoHealth === 0) {
                return res.status(500).json({message: `${playerOneName} wins!`, errorCode: 1401});
            }
            playerOneManaSlots -= mana;
            currentPlayerOneCards.splice(cardIndex, 1);
        }
    } else if (playerName === playerTwoName) {
        if (cardIndex >= 0 && cardIndex < currentPlayerTwoCards.length) {
            const mana = currentPlayerTwoCards[cardIndex].mana;
            if (playerTwoManaSlots < mana) {
                return res.status(400).json({message: 'Not enough mana'});
            }
            playerOneHealth = Math.max(playerOneHealth - mana, 0);
            if (playerOneHealth === 0) {
                return res.status(500).json({message: `${playerTwoName} wins!`});
            }
            playerTwoManaSlots -= mana;
            currentPlayerTwoCards.splice(cardIndex, 1);
        }
    }
    setTimeout(() => {
        res.json({message: 'Card played'});
    }, 100);
});

app.get('/server/game/player', (req, res) => {
    const playerName = req.query.playerName;
    setTimeout(() => {
        res.json({
            name: playerName,
            health: playerName === playerOneName ? playerOneHealth : playerTwoHealth,
            manaSlots: playerName === playerOneName ? playerOneManaSlots : playerTwoManaSlots,
        });
    }, 100);
});

app.get('/server/game/player/active', (req, res) => {
    setTimeout(() => {
        res.json({name: activePlayer});
    }, 100);
});

app.put('/server/game/player/active', (req, res) => {
    setTimeout(async () => {
        if (activePlayer === playerOneName) {
            activePlayer = playerTwoName;
            playerTwoManaSlots = playerTwoManaSlots === 0 ? 10 : Math.min(playerTwoManaSlots + 1, 10);
            currentPlayerTwoCards = [...currentPlayerTwoCards, {
                "mana": 2
            }];
        } else {
            activePlayer = playerOneName;
            playerOneManaSlots = playerOneManaSlots === 0 ? 10 : Math.min(playerOneManaSlots + 1, 10);
            currentPlayerOneCards = [...currentPlayerOneCards, {
                "mana": 2
            }];
        }
        res.json({message: 'Active player switched'});
    }, 100);
});

app.get('/server/game/player/card', (req, res) => {
    const playerName = req.query.playerName;
    const cards = playerName === playerOneName ? currentPlayerOneCards : currentPlayerTwoCards;
    setTimeout(() => {
        res.json(cards);
    }, 100);
});

app.listen(8080, () => {
    console.log(process.env.NODE_ENV);
    console.log("server started");
});