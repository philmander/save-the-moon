import Sprite from '../core/Sprite';
import BaseSprite from '../core/BaseSprite';

export default function(x: number, y: number) {
    return new ShelterBlock(x, y);
}

export class ShelterBlock extends BaseSprite implements Sprite {

    constructor(x: number, y: number) {
        super();

        this._x = x;
        this._y = y;

        this._width = 10;
        this._height = 10;

        this._strength = 2;
    }

    // public move(): void {}
    // }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle =  'rgb(0, 0, 200)';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}