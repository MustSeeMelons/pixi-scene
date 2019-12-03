import * as PIXI from "pixi.js";
import "./resources/css/styles.css";
import { ClockwiseScene } from "./scene/clockwise/clockwise";
import { CounterClockwiseScene } from "./scene/counterClockwise/counterClockwise";
import { Engine } from "./engine/engine";
import { SimpleFadeTransition } from "./transition/transition";

const MELON = require("./resources/images/watermelon.png");

const Loader: PIXI.Loader = PIXI.Loader.shared;
Loader.add(MELON).load(setup);

const app = new PIXI.Application({
    antialias: true
});

app.stage.interactive = true;

document.body.appendChild(app.view);

function setup() {
    const engine: Engine = new Engine(app, [
        {
            index: 0,
            name: "clockwise",
            gameScene: new ClockwiseScene(),
            fadeInTransition: new SimpleFadeTransition(0.1),
            fadeOutTransition: new SimpleFadeTransition()
        },
        {
            index: 1,
            name: "counterClockwise",
            gameScene: new CounterClockwiseScene(),
            fadeInTransition: new SimpleFadeTransition(0.1),
            fadeOutTransition: new SimpleFadeTransition()
        }]);

    app.ticker.add(delta => {
        engine.update(delta);
    });
}