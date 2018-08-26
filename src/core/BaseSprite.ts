export default abstract class BaseSprite {
    protected _spriteImage: ImageBitmap;
    protected _width: number;
    protected _height: number;

    protected _x: number;
    protected _y: number;
    protected _dx: number = 0;
    protected _dy: number = 0;

    protected _strength: number;
    protected _scoreModifier = 0;

    protected play(sfx: any): void {
        const audio = new Audio(sfx);
        audio.play();
    }

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

    public get scoreModifier() {
        return this._scoreModifier;
    }

    public move(dx = this._dx, dy = this._dy): void {
        this._x += dx;
        this._y += dy;
    }

    public hit(): void {
        this._strength--;
    }

    public isAlive(): boolean {
        return this._strength > 0;
    }
}