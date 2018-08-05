import Sprite from '../core/Sprite';
import BaseSprite from '../core/BaseSprite';
import createBomb, { Bomb } from './Bomb';
import FiringSprite from '../core/FiringSprite';
import sound from '../sounds/invader.mp3';


export default function() {
    return new Invader();
}

export class Invader extends BaseSprite implements FiringSprite {

    private points: Array<Array<number>> = [];

    constructor() {
        super();

        this._width = 30;
        this._height = 15;

        this._dx = 8;
        this._dy = 1;

        if(Math.random() >= 0.5) {
            this._x = 0 
        } else {
            this._x = 500 - this.width;
            this._dx *= -1;
        }
        this._y = 0;

        this._strength = 1;

        this.play(sound);
    }

    public isAlive(): boolean {
        return super.isAlive() && this.y >= 0;
    }

    public move(): void {
        if(this.x + this.width > 500 || this.x < 0) {
            this._dx *= -1;
        } else if(this.y + this.height > 320 || this.y < 0) {
            this._dy *= -1;
        }

        super.move();
    }

    public fire(): Sprite {
        return this.isFiring() ?
            createBomb(this.x + (this.width / 2), this.y) :
            null;
    }

    public isFiring(): boolean {
        return Math.random() >= 0.95;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle =  'gold';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}