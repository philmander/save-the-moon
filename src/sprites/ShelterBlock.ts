import { Sprite } from '../core/Sprite';
import BaseSprite from '../core/BaseSprite';

export default function(x: number, y: number) {
    return new ShelterBlock(x, y);
}

export class ShelterBlock extends BaseSprite implements Sprite {

    constructor(x: number, y: number) {
        super();

        this._x = x;
        this._y = y;

        this._width = 8;
        this._height = 6;

        this._strength = 2;
        this._scoreModifier = -10;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'rgb(141, 178, 201)';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}