function Far() {
    var farTexture = PIXI.Texture.fromImage('./img/11.png')
    PIXI.extras.TilingSprite.call(this, farTexture, 512, 256)
    this.position.x = 0;
    this.position.y = 0;
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;

    this.viewportX = 0;
}
Far.prototype = Object.create(PIXI.extras.TilingSprite.prototype)

Far.DELTA_X = 0.128

Far.prototype.setViewportX = function (newViewportX) {
    this.viewportX = newViewportX;
    this.tilePosition.x -= (this.viewportX * Far.DELTA_X);
};