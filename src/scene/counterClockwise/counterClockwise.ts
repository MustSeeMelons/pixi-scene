import * as PIXI from "pixi.js";
import { AbstractGameScene, SceneState } from "../scene";

const MELON = require("../../resources/images/watermelon.png");

const Loader: PIXI.Loader = PIXI.Loader.shared;

export class CounterClockwiseScene extends AbstractGameScene {
    private melon: PIXI.Sprite;

    setup(sceneContainer: PIXI.Container) {
        this.sceneState = SceneState.LOAD;
        this.melon = new PIXI.Sprite(Loader.resources[MELON].texture);
        this.melon.anchor.x = 0.5;
        this.melon.anchor.y = 0.5;

        this.melon.x = this.app.renderer.width / 2;
        this.melon.y = this.app.renderer.height / 2;

        this.melon.interactive = true;
        this.melon.addListener("pointerup", () => {
            this.sceneSwitcher("clockwise");
        });

        sceneContainer.addChild(this.melon);
    }

    preTransitionUpdate(delta: number) {
        this.melon.rotation -= 0.1 * delta;
    }

    sceneUpdate(delta: number) {
        this.melon.rotation -= 0.1 * delta;
    }
}