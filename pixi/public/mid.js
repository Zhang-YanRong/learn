Far.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Far.prototype.update = function () {
    this.tilePosition.x -= 0.64;
};