import Sprite from './Sprite';

export default interface ControllableSprite extends Sprite {
    control: SpriteControl;
}

export enum SpriteControl {
    NONE,
    MOVE_LEFT,
    MOVE_RIGHT,
    FIRE,
}