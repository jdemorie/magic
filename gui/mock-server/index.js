import express from "express";
import cors from "cors";
import {server as mockServer} from "./server.js";

import game from "./game.json" with {type: "json"};
import cards from "./card.json" with {type: "json"};

mockServer.listen();

const app = express();

app.use(cors());

app.get('/server/game', (req, res) => {
    setTimeout(() => {
        res.json(game);
    }, 500);
});

app.get('/server/game/card', (req, res) => {
    setTimeout(() => {
        res.json(cards);
    }, 100);
});

app.post('/server/start', (req, res) => {
    setTimeout(() => {
        res.json({message: 'Game started'});
    }, 100);
});

app.listen(8080, () => {
    console.log(process.env.NODE_ENV);
    console.log("server started");
});