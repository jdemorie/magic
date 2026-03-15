import express from "express";
import cors from "cors";
import {server as mockServer} from "./server.js";
import playerOneCards from "./card.json" with {type: "json"};
import playerTwoCards from "./card.json" with {type: "json"};

mockServer.listen();

const app = express();
app.use(cors());
app.use(express.json());

let playerOneName = "";
let playerTwoName = "";
let activePlayer = "";
let currentPlayerOneCards = playerOneCards;
let currentPlayerTwoCards = playerTwoCards;
let playerOneHealth = 20;
let playerTwoHealth = 20;
let playerOneManaSlots = 0;
let playerTwoManaSlots = 0;

app.post('/server/start', (req, res) => {
    const p1 = req.query.playerOneName;
    const p2 = req.query.playerTwoName;
    playerOneName = p1;
    playerTwoName = p2;
    activePlayer = playerOneName;
    setTimeout(() => {
        res.json({message: 'Game started'});
    }, 100);
});

app.put('/server/game/player/play', (req, res) => {
    const playerName = req.query.playerName;
    const cardIndex = req.query.cardIndex;
    if (playerName === playerOneName) {
        if (cardIndex >= 0 && cardIndex < currentPlayerOneCards.length) {
            const mana = currentPlayerOneCards[cardIndex].mana;
            playerTwoHealth -= mana;
            playerOneManaSlots -= mana;
            currentPlayerOneCards.splice(cardIndex, 1);
        }
    }
    if (playerName === playerTwoName) {
        if (cardIndex >= 0 && cardIndex < currentPlayerTwoCards.length) {
            const mana = currentPlayerTwoCards[cardIndex].mana;
            playerOneHealth -= mana;
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
    activePlayer = activePlayer === playerOneName ? playerTwoName : playerOneName;
    setTimeout(async () => {
        res.json({message: 'Active player switched'});
    }, 100);
});

app.get('/server/game/card', (req, res) => {
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