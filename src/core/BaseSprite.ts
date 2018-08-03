export default abstract class BaseSprite {
    protected _spriteImage: ImageBitmap;
    protected _width: number;
    protected _height: number;

    protected _x: number;
    protected _y: number;
    protected _dx: number;
    protected _dy: number;

    protected _strength: number;

    public get spriteImage() {
        return this._spriteImage;
    }
    
    public get width() {
        return this._width;
    }

    public get height() {
        return this._height;
    }

    public get x() {
        return this._x;
    }

    public get y() {
        return this._y;
    }

    public get strength() {
        return this._strength;
    }

    public kill(): void {
        this._strength = 0;
    }

    public hit(): void {
        this._strength--;
    }

    public isAlive(): boolean {
        return this._strength > 0;
    }

}