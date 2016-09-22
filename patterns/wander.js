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
        //this.ctx.strokeStyle = this.color.choose();
        if (x >= Math.floor(this.max_x * .75) ||
            x <= Math.floor(this.max_x * .25)) {
            this.ctx.strokeStyle = "#ccc";
        } else {
            this.ctx.strokeStyle = this.color.choose();
        }
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

    //var noiseRange = Math.floor(this.scale * 0.1);
    var noiseRange = Math.floor(this.scale * Math.min(Math.max(Math.random(), 0.1), 0.2));
    var noiseRangePeak = Math.floor(this.scale * Math.min(Math.max(Math.random(), 0.3), 0.8));

    this.ctx.beginPath();
    this.ctx.moveTo(x, 0);
    for (var y = 0; y < limit + 20; y += 20) {
        if (y >= Math.floor(limit * .75)) {
            noise = rand0(noiseRangePeak);
        } else {
            noise = rand0(noiseRange);
        }
        noise = rand0(noiseRange);
        this.ctx.lineTo(x + noise, y);
    } 
    this.ctx.stroke();
}

WanderingLines.prototype._clear = function () {
    this.ctx.clearRect(0, 0, this.max_x, this.max_y);
}

WanderingLines.prototype.run = function () {
    this._clear();
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.max_x, this.max_y);
    this.draw();
}
