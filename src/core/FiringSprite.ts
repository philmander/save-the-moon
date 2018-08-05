import Sprite from './Sprite';

export default interface FiringSprite extends Sprite {
    fire(): Sprite;
    isFiring(): boolean;
}