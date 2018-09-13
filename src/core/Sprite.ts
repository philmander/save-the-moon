import BaseSprite from './BaseSprite';

export interface Sprite extends BaseSprite {
    draw(renderingContext: CanvasRenderingContext2D): void;
}

export interface FiringSprite extends Sprite {
    fire(): Sprite;
    isFiring(): boolean;
}

export interface ControllableSprite extends Sprite {
    control: SpriteControl;
    controlModifier: number;
}

export enum SpriteControl {
    NONE,
    MOVE_LEFT,
    MOVE_RIGHT,
    FIRE,
}