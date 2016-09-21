/* Wandering lines.
 *
 * Inspired by Anders Hoff (http://inconvergent.net/generative/linetrace/).
 *
 * Date: 9-19-2016
 * Author: Matt Godshall
 */

function WanderingLines(ctx, max_x, max_y, scheme, scale, randLength) {
    this.ctx = ctx;
    this.max_x = max_x;
    this.max_y = max_y;
    this.color = new ColorPicker(scheme);
    this.scale = scale;
    this.x_offset = Math.floor(this.scale / 2);
    this.randLength = randLength;
}

WanderingLines.prototype.draw = function () {
    for (var x = 0; x < this.max_x; x += this.x_offset) {
        this.ctx.strokeStyle = this.color.choose();
        this._drawLine(x);
    }
}

WanderingLines.prototype._drawLine = function (x) {

    var noise;
    var limit;
    if (this.randLength) {
        limit = randInterval(this.max_y, 20);
    } else {
        limit = this.max_y;
    }

    var noiseRange = Math.floor(this.scale * 0.1);

    this.ctx.beginPath();
    this.ctx.moveTo(x, 0);
    for (var y = 0; y < limit; y += 20) {
        noise = rand0(noiseRange);
        this.ctx.lineTo(x + noise, y);
    } 
    this.ctx.stroke();
}

