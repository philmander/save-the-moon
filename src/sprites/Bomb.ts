import Sprite from '../core/Sprite';
import BaseSprite from '../core/BaseSprite';

export default function(x: number, y: number) {
    return new Bomb(x, y);
}

export class Bomb extends BaseSprite implements Sprite {

    constructor(x: number, y: number) {
        super();

        this._x = x;
        this._y = y;

        this._dx = 0;
        this._dy = 5;

        this._width = 10;
        this._height = 10;

        this._strength = 1;
    }

    public isAlive(): boolean {
        return super.isAlive() && this.y < 500;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.x + (this.width / 2), this.y + (this.height / 2), this.width / 2, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'rgb(255, 255, 0)';
        ctx.fill();
    }
}