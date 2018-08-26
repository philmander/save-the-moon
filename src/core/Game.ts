import { EventEmitter } from 'eventemitter3';
import { Sprite, FiringSprite, ControllableSprite, SpriteControl } from './Sprite';
import createShelterBlock from '../sprites/ShelterBlock';
import createInvader from '../sprites/Invader';
import createExplosion, { ExplosionSize } from '../sprites/Explosion';
import createGun from '../sprites/Gun';
import { moveOrRemove, detectCollision } from './helpers';
import gameOver from '../sounds/game-over.mp3';

export enum GameStage {
    READY,
    RUNNING,
    FINISHED,
}
export default function() {
    return new Game();
}

class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private buffer: HTMLCanvasElement;
    private bufferCtx: CanvasRenderingContext2D;

    // sets which hold groups of on-screen sprites
    private invaderSet: Set<FiringSprite>;
    private bombSet: Set<Sprite>;
    private missileSet: Set<Sprite>;
    private shelterSet: Set<Sprite>
    private explosionSet: Set<Sprite>

    private gun: FiringSprite & ControllableSprite;

    private invaderInterval = 60 * 2;
    private invaderIncrement = 0;    
    private _score: number = 0;
    
    private _stage: GameStage;
    private paused = false;

    public events = new EventEmitter();

    public get stage(): GameStage {
        return this._stage;
    }

    public get score(): number {
        return this._score;
    }

    constructor() {
        this.handleKeyboard();
    }

    public init() {
        // set up the rendering context
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
		this.canvas.width = parseInt(this.canvas.style.width);
        this.canvas.height = parseInt(this.canvas.style.height);
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

        this.gun = createGun(100, 430);    

        // setup the shelter blocks
        for(let y = 370; y < 394; y += 8) {
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
        
        // reinit game state
        this.updateGameStage(GameStage.READY);
        this.paused = false;
        this._score = 0;
    }

    handleKeyboard() {        
        document.addEventListener('keydown', ev => {
            if(this.stage === GameStage.RUNNING) {                                
                switch (ev.key) {
                    case 'p':
                        this.paused = !this.paused;       
                        this.events.emit('paused', {
                            paused: this.paused,
                        })                                 
                        break;
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
        });
    }

    start() {        
        this.updateGameStage(GameStage.RUNNING);
        this.run();
    }

    run() {    
        if(!this.paused) {
            this.runFrame();
            this.events.emit('frame-done', {
                score: this._score,
                lives: this.gun.strength,
            });
        }

        requestAnimationFrame(() => {
            this.paint();
            if(this._stage === GameStage.RUNNING) {                
                this.run();
            } else if(this._stage === GameStage.FINISHED) {
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

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.buffer, 0, 0);
    }

    runFrame() {      
        // introduce new invaders
        this.invaderIncrement++;
        if(this.invaderIncrement === this.invaderInterval) {            
            this.invaderSet.add(createInvader());
            this.invaderIncrement = 0;
        }

        // invaders
        for(let invader of this.invaderSet) {             
            const bomb = invader.fire();        
            if(bomb) {
                this.bombSet.add(bomb);
            }
   
            moveOrRemove(invader, this.invaderSet);
        }

        // bombs
        for(let bomb of this.bombSet) {
            if(detectCollision(bomb, this.gun)) {
                this.gun.hit();
                bomb.hit();
                this._score += this.gun.scoreModifier;
                this.explosionSet.add(createExplosion(bomb.x, bomb.y, ExplosionSize.LARGE));                
            }

            for(let shelterBlock of this.shelterSet) {
                if(detectCollision(bomb, shelterBlock)) {
                    bomb.hit();
                    shelterBlock.hit();                                        
                    this._score += shelterBlock.scoreModifier;
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
            if(this.gun.isFiring() && this.missileSet.size < 2) {
                this.missileSet.add(this.gun.fire());
            }
            this.gun.control = SpriteControl.NONE;            
        } else {            
            this.updateGameStage(GameStage.FINISHED);
        }

        // missiles
        for(let missile of this.missileSet) {        
            for(let invader of this.invaderSet) {
                if(detectCollision(missile, invader)) {
                    missile.hit();
                    invader.hit();
                    this._score += invader.scoreModifier;
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

        // explosions
        for(let explosion of this.explosionSet) {
            moveOrRemove(explosion, this.explosionSet);
        }
    }

    updateGameStage(stage: GameStage) {
        this._stage = stage;
        this.events.emit('stage-changed', {
            stage,
        });
    }
}