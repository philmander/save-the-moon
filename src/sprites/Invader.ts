import BaseSprite from '../core/BaseSprite';
import createBomb, { Bomb } from './Bomb';
import { Sprite, FiringSprite } from '../core/Sprite';
import { randInRange } from '../core/helpers';
import sound from '../sounds/invader.mp3';
import gunImage from '../images/invader.png';

export default function() {
    return new Invader();
}

// could loading an image be any more convoluted?
let bitmap: ImageBitmap = null;
let image = new Image();
image.onload = async function loadImage() {
    bitmap = await createImageBitmap(image, 0, 0, 45, 19);
}
image.src = gunImage;

export class Invader extends BaseSprite implements FiringSprite {

    private _aggressiveness: number;
    private _ammo = 1;

    constructor() {
        super();

        this._width = 45;
        this._height = 19;

        this._dx = randInRange(4, 8);
        this._dy = randInRange(1, 2);

        if(Math.random() >= 0.5) {
            this._x = 0 
        } else {
            this._x = 500 - this.width;
            this._dx *= -1;
        }
        this._y = 0;

        this._strength = 1;
        this._scoreModifier = 500;
        this._aggressiveness = randInRange(93, 98);

        this.play(sound);
    }

    public get ammo() {
        return this._ammo;
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
        return Math.random() >= (this._aggressiveness / 100);
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        if(bitmap) {
            ctx.drawImage(bitmap, this.x, this.y);
        }      
    }
}