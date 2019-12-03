import * as PIXI from "pixi.js";

export enum TransitionType {
    FADE_OUT = "hide_mask",
    FADE_IN = "show_mask"
}

/**
 * Base interface for a scene transition.
 *
 * @export
 * @interface SceneTransition
 */
export interface SceneTransition {
    /**
     * Initializes the transition, can be called multiple times.
     * @param app 
     * @param type 
     * @param sceneContainer 
     */
    init(app: PIXI.Application, type: TransitionType, sceneContainer: PIXI.Container): void;
    update(delta: number, callback: () => void): void;
}


/**
 * Simple transition that can fade into/out of black.
 */
export class SimpleFadeTransition implements SceneTransition {
    private app: PIXI.Application;
    private type: TransitionType;
    private transitionSprite: PIXI.Sprite;
    private updateStep: number;

    constructor(updateStep: number = 0.01) {
        this.updateStep = updateStep;
    }

    init(app: PIXI.Application, type: TransitionType, sceneContainer: PIXI.Container) {
        this.app = app;
        this.type = type;
        this.createTransitionSprite(type);
        sceneContainer.addChild(this.transitionSprite);
    }

    private createTransitionSprite(type: TransitionType) {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0x000000);
        graphics.drawRect(0, 0, this.app.renderer.width, this.app.renderer.height);
        graphics.endFill();
        this.transitionSprite = new PIXI.Sprite(this.app.renderer.generateTexture(graphics, 1, 1));
        const alpha = type === TransitionType.FADE_OUT ? 1 : 0;
        this.transitionSprite.alpha = alpha;
    }

    update(delta: number, callback: () => void) {
        switch (this.type) {
            case TransitionType.FADE_OUT:
                if (this.transitionSprite.alpha > 0) {
                    this.transitionSprite.alpha -= this.updateStep * delta;
                } else {
                    callback();
                }
                break;

            case TransitionType.FADE_IN:
                if (this.transitionSprite.alpha < 1) {
                    this.transitionSprite.alpha += this.updateStep * delta;
                } else {
                    callback();
                }
                break;
        }
    }
}