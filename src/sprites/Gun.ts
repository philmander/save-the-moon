import Sprite from '../core/Sprite';
import BaseSprite from '../core/BaseSprite';
import createMissile, { Missile } from './Missile';
import FiringSprite from '../core/FiringSprite';
import ControllableSprite, { SpriteControl } from '../core/ControllableSprite';

export default function(x: number, y: number) {
    return new Gun(x, y);
}

export class Gun extends BaseSprite implements FiringSprite, ControllableSprite {

    public control: SpriteControl = SpriteControl.NONE;

    constructor(x: number, y: number) {
        super();

        this._x = x;
        this._y = y;

        this._width = 40;
        this._height = 20;

        this._dx = 15;
        this._dy = 0;

        this._strength = 3;
    }

    private isMoving(): boolean {
        return (
            this.control === SpriteControl.MOVE_LEFT || 
            this.control === SpriteControl.MOVE_RIGHT
        );
    }

    public isFiring(): boolean {
        return this.control === SpriteControl.FIRE;
    }

    public move(): void {
        if(!this.isMoving()) {
            return;
        }

        if(this.x > 0 && this.control === SpriteControl.MOVE_LEFT) {
            this._x -= this._dx;
        } else if(this.x + this.width <= 500 && this.control === SpriteControl.MOVE_RIGHT) {
            this._x += this._dx;
        }
    }

    public fire(): Sprite {
        return createMissile(this.x + (this.width / 2), this.y);
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle =  'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}