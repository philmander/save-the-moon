import { Sprite } from './Sprite';

export function detectCollision(sprite1: Sprite, sprite2: Sprite): boolean {
    const collision = (
        sprite1.x + sprite1.width > sprite2.x && sprite1.x < sprite2.x + sprite2.width
    ) && (
        sprite1.y + sprite1.height > sprite2.y && sprite1.y < sprite2.y + sprite2.height
    ) 
    return collision;
}

export function moveOrRemove(sprite: Sprite, containingSet: Set<Sprite>, ifAliveCallback?: Function): void {    
    if(sprite.isAlive()) {
        sprite.move();
        if(typeof ifAliveCallback === 'function') {
            ifAliveCallback();
        }
    } else {
        containingSet.delete(sprite);
    }
}

export function randInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}