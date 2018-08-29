import { Sprite } from '../core/Sprite';
import BaseSprite from '../core/BaseSprite';
import shot from '../sounds/shot.mp3';

export default function(x: number, y: number) {
    return new Missile(x, y);
}

export class Missile extends BaseSprite implements Sprite {

    private points: Array<Array<number>> = [];

    constructor(x: number, y: number) {
        super();

        this._x = x;
        this._y = y;

        this._width = 5;
        this._height = 14;

        this._dx = 0;
        this._dy = -15;

        this._strength = 1;        

        this.points[0] = [ x + 0, y + 6 ];
        this.points[1] = [ x + 0, y + 13 ];
        this.points[2] = [ x + 4, y + 13 ];
        this.points[3] = [ x + 4, y + 6 ];
        this.points[4] = [ x + 2, y + 0 ];

        this.play(shot);
    }

    public isAlive(): boolean {
        return super.isAlive() && this.y > 0;
    }

    public move(): void {
        super.move();

        for(let i = 0; i < this.points.length; i++) {
            this.points[i][0] += this._dx;
            this.points[i][1] += this._dy;
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {

        ctx.beginPath();
        ctx.moveTo(this.points[0][0], this.points[0][1]);
        for(let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i][0], this.points[i][1]);
        }
        ctx.closePath();

        ctx.fillStyle =  'rgb(200, 200, 200)';
        ctx.fill();
    }
}