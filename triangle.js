/* Draw triangles. Make a class why not.
 *
 * Date: 9-19-2016
 * Author: Matt Godshall
 */

function Triangle(ctx) {
    this.ctx = ctx;
}

Triangle.prototype.topLeft = function (x, y, scale) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x, y + scale);
    this.ctx.lineTo(x + scale, y);
    this.ctx.fill()
}

Triangle.prototype.up = function (x, y, scale) {
    var halfScale = Math.floor(scale / 2);
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x - halfScale, y + scale);
    this.ctx.lineTo(x + halfScale, y + scale);
    this.ctx.fill()
}

Triangle.prototype.down = function (x, y, scale) {
    var halfScale = Math.floor(scale / 2);
    this.ctx.beginPath();
    this.ctx.moveTo(x, y + scale);
    this.ctx.lineTo(x - halfScale, y);
    this.ctx.lineTo(x + halfScale, y);
    this.ctx.fill()
}

Triangle.prototype.diamond = function (x, y, scale) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x - Math.floor(scale / 2),
                    y + Math.floor(scale / 2));
    this.ctx.lineTo(x, y + scale);
    this.ctx.lineTo(x + Math.floor(scale/2),
                    y + Math.floor(scale / 2));
    this.ctx.fill()
}

