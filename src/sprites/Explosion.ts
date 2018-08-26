import { Sprite } from '../core/Sprite';
import BaseSprite from '../core/BaseSprite';
import soundLarge from '../sounds/explosion-large.mp3';
import soundSmall from '../sounds/explosion-small.mp3';

export default function(x: number, y: number, size: ExplosionSize) {
    return new Explosion(x, y, size);
}

export enum ExplosionSize {
    SMALL = 35,
    LARGE = 80,
}

enum ExplosionColor {
    ORANGE = 'rgb(255, 220, 0)',
    YELLOW = 'rgb(255, 50, 0)',
}

export class Explosion extends BaseSprite implements Sprite {

    size: ExplosionSize;
    frame: number = 0;
    color: ExplosionColor = ExplosionColor.ORANGE;
    points: Array<Array<number>> = [];
    variance: number = 1;
    drawCount = 0;

    constructor(x: number, y: number, size: ExplosionSize) {
        super();

        this._x = x;
        this._y = y;

        this._dx = 0;
        this._dy = 10;

        this._width = 10;
        this._height = 10;

        this.variance = 0;

        // strength for an explosion simulates 20 frames
        this._strength = 20;

        this.size = size;                

        if(this.size === ExplosionSize.LARGE) {
            this.play(soundLarge);
        } else {
            this.play(soundSmall);
        }
    }

    public move(): void {
        if(this.drawCount % 4 === 0) {            
            this.color = this.color === ExplosionColor.ORANGE ? 
                ExplosionColor.YELLOW : ExplosionColor.ORANGE;    
        }        
        if(this.drawCount % 2 === 0) {
            this.variance = 20 + Math.floor(Math.random() * (this.size -1));            
        }        

        const v = this.variance;

        const dx1 = Math.round(Math.sin(toRadians(72)) * v);
        const dy1 = Math.round(Math.cos(toRadians(72)) * v);
        
        const dx2 = Math.round(Math.sin(toRadians(36)) * v);
        const dy2 = Math.round(Math.cos(toRadians(36)) * v);

        this.points[0] = [ this.x, this.y - v ];
        this.points[1] = [ this.x + dx2, this.y + dy2 ];
        this.points[2] = [ this.x - dx1, this.y - dy1 ];
        this.points[3] = [ this.x + dx1, this.y - dy1 ];
        this.points[4] = [ this.x - dx2, this.y + dy2 ];         
        
        this.hit();
    }

    public draw(ctx: CanvasRenderingContext2D): void {         
        ctx.beginPath();
        ctx.moveTo(this.points[0][0], this.points[0][1]);
        for(let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i][0], this.points[i][1]);
        }
        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.fill();

        this.drawCount++;
    }
}

function toRadians (angle: number) {
    return angle * (Math.PI / 180);
  }