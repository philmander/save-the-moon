import BaseSprite from './BaseSprite';

export default interface Sprite extends BaseSprite {
    draw(renderingContext: CanvasRenderingContext2D): void;
}