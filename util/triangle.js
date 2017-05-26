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
    var halfScale = Math.floor(scale / 2);
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x - halfScale,
                    y + halfScale);
    this.ctx.lineTo(x, y + scale);
    this.ctx.lineTo(x + halfScale,
                    y + halfScale);
    this.ctx.fill()
}

Triangle.prototype.hex = function (x, y, scale) {
    var halfScale = Math.floor(scale / 2);
    var quarterScale = Math.floor(scale / 4);
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x - quarterScale, y + halfScale);
    this.ctx.lineTo(x, y + scale);
    this.ctx.lineTo(x + halfScale, y + scale);
    this.ctx.lineTo(x + halfScale + quarterScale, y + halfScale);
    this.ctx.lineTo(x + halfScale, y);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
}
