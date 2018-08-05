import Sprite from './Sprite';
import { GameStage } from './GameStage';
import createShelterBlock from '../sprites/ShelterBlock';
import createInvader from '../sprites/Invader';
import createExplosion, { ExplosionSize } from '../sprites/Explosion';
import createGun from '../sprites/Gun';
import { moveOrRemove, detectCollision } from './helpers';
import FiringSprite from './FiringSprite';
import ControllableSprite, { SpriteControl }  from './ControllableSprite';
import gameOver from '../sounds/game-over.mp3';

export default class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private buffer: HTMLCanvasElement;
    private bufferCtx: CanvasRenderingContext2D;

    private background: ImageBitmap;

    // sets which hold groups of on-screen sprites
    private invaderSet: Set<FiringSprite>;
    private bombSet: Set<Sprite>;
    private missileSet: Set<Sprite>;
    private shelterSet: Set<Sprite>
    private explosionSet: Set<Sprite>

    private gun: FiringSprite & ControllableSprite;

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

        this.gun = createGun(100, 420);    

        // setup the shelter blocks
        for(let y = 350; y < 380; y += 10) {
            for(let x = 65; x < 145; x += 10) {
                this.shelterSet.add(createShelterBlock(x, y));
            }

            for(let x = 210; x < 290; x += 10) {
                this.shelterSet.add(createShelterBlock(x, y));
            }

            for(let x = 355; x < 435; x += 10) {
                this.shelterSet.add(createShelterBlock(x, y));
            }
        }

        document.addEventListener('keydown', ev => {
            if(this.stage = GameStage.RUNNING) {                
                switch (ev.key) {
                    case 'ArrowLeft':
                        this.gun.control = SpriteControl.MOVE_LEFT;
                        break;
                    case 'ArrowRight':
                        this.gun.control = SpriteControl.MOVE_RIGHT;
                        break;
                    case ' ': // Spacebar
                        this.gun.control = SpriteControl.FIRE;
                        break;
                    default:
                        this.gun.control = SpriteControl.NONE;  
                }
            }
        })
    }

    start() {
        this.stage = GameStage.RUNNING;

        const frameRate = 60;
        this.run(frameRate * 3);
    }

    run(invaderInterval: number, invaderIncrement: number = 0) {    
        // introduce new invaders
        invaderIncrement++;
        if(invaderIncrement === invaderInterval) {            
            this.invaderSet.add(createInvader());
            invaderIncrement = 0;
        }

        // invaders
        for(let invader of this.invaderSet) {             
            const bomb = invader.fire();        
            if(bomb) {
                this.bombSet.add(bomb);
            }
        
            //move        
            moveOrRemove(invader, this.invaderSet);
        }

        // bombs
        for(let bomb of this.bombSet) {
            if(detectCollision(bomb, this.gun)) {
                this.gun.hit();
                bomb.hit();
                this.explosionSet.add(createExplosion(bomb.x, bomb.y, ExplosionSize.LARGE));                
            }

            for(let shelterBlock of this.shelterSet) {
                if(detectCollision(bomb, shelterBlock)) {
                    bomb.hit();
                    shelterBlock.hit();
                    moveOrRemove(shelterBlock, this.shelterSet);                    
                    this.explosionSet.add(createExplosion(bomb.x, bomb.y, ExplosionSize.SMALL));                
                    // if there is one collision, there can't be any more
                    break;
                }
            }
            
            moveOrRemove(bomb, this.bombSet);
        }

        // gun
        if(this.gun.isAlive()) {                   
            this.gun.move();
            if(this.gun.isFiring() && this.missileSet.size < 5) {
                this.missileSet.add(this.gun.fire());
            }
            this.gun.control = SpriteControl.NONE;            
        } else {
            this.stage = GameStage.FINISHED;
        }

        // missiles
        for(let missile of this.missileSet) {        
            for(let invader of this.invaderSet) {
                if(detectCollision(missile, invader)) {
                    missile.hit();
                    invader.hit();

                    // increment score

                    this.explosionSet.add(createExplosion(invader.x, invader.y, ExplosionSize.LARGE));  
                    break;
                }
            }

            for(let shelterBlock of this.shelterSet) {
                if(detectCollision(missile, shelterBlock)) {
                    missile.hit();
                    shelterBlock.hit();
                    moveOrRemove(shelterBlock, this.shelterSet);
                    break;
                }            
            }

            moveOrRemove(missile, this.missileSet);
        }

        for(let explosion of this.explosionSet) {
            moveOrRemove(explosion, this.explosionSet);
        }

        requestAnimationFrame(() => {
            this.paint();
            if(this.stage === GameStage.RUNNING) {                
                this.run(invaderInterval, invaderIncrement);
            } else if(this.stage === GameStage.FINISHED) {
                const audio = new Audio(gameOver);
                audio.volume = 0.75;
                setTimeout(() => {                    
                    audio.play();
                }, 1000);                
            }
        });
    }

    paint() {
        const ctx = this.bufferCtx;
        ctx.clearRect(0, 0, this.buffer.width, this.buffer.height);

        if(this.stage === GameStage.RUNNING) {
            const allSprites = new Set([
                ...this.shelterSet,
                ...this.bombSet,
                ...this.missileSet,
                ...this.invaderSet,
                ...this.explosionSet,
                this.gun,
            ])
            for(let sprite of allSprites) {
                sprite.draw(ctx);
            }
        }

        this.gun.draw(ctx);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.buffer, 0, 0);
    }
}