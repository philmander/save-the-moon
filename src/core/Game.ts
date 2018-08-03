import Sprite from './Sprite';
import { GameStage } from './GameSage';
import ShelterBlock from '../sprites/ShelterBlock';

export default class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private buffer: HTMLCanvasElement;
    private bufferCtx: CanvasRenderingContext2D;

    private background: ImageBitmap;

    // sets which hold groups of on-screen sprites
    private invaderSet: Set<Sprite>;
    private bombSet: Set<Sprite>;
    private missileSet: Set<Sprite>;
    private shelterSet: Set<Sprite>
    private explosionSet: Set<Sprite>

    private stage: GameStage;

    init() {
        // set up the rendering context
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
		this.canvas.width = parseInt(this.canvas.style.width);
        this.canvas.height = parseInt(this.canvas.style.height);
        this.canvas.style.backgroundColor = 'black';
        this.ctx = this.canvas.getContext('2d');

        // set up a rendering buffer 
        this.buffer = <HTMLCanvasElement>document.createElement('canvas');
        this.buffer.width = this.canvas.width;
        this.buffer.height = this.canvas.height;
        this.bufferCtx = this.buffer.getContext('2d');  
        
        // create sets for holding sprites
        this.invaderSet = new Set();
        this.bombSet = new Set();
        this.missileSet = new Set();
        this.shelterSet = new Set();
        this.explosionSet = new Set();

        // draw the shelter blocks
        for(let y = 350; y < 380; y += 10) {
            for(let x = 65; x < 145; x += 10) {
                this.shelterSet.add(new ShelterBlock(x, y));
            }

            for(let x = 210; x < 290; x += 10) {
                this.shelterSet.add(new ShelterBlock(x, y));
            }

            for(let x = 355; x < 435; x += 10) {
                this.shelterSet.add(new ShelterBlock(x, y));
            }
        }
    }

    start() {
        this.stage = GameStage.RUNNING;

        this.run();
    }

    run() {        
        requestAnimationFrame(() => {
            this.paint();
            if(this.stage === GameStage.RUNNING) {                
                this.run()
            }
        });
    }

    paint() {
        const ctx = this.bufferCtx;
        ctx.clearRect(0, 0, this.buffer.width, this.buffer.height);

        if(this.stage === GameStage.RUNNING) {
            for(let shelterBlock of this.shelterSet) {
                shelterBlock.draw(ctx);
            }
        }

        this.ctx.drawImage(this.buffer, 0, 0);
    }
}