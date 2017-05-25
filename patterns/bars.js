/* Bars
 *
 *
 * Date: 5-25-2017
 * Author: Matt Godshall
 */

function Bars(ctx, max_x, max_y, scheme, scale, randLength, enableNoise) {
    this.ctx = ctx;
    this.max_x = max_x;
    this.max_y = max_y;
    this.color = new ColorPicker(scheme);
    this.color_alt = new ColorPicker(gray);
    this.scale = scale;
    this.x_offset = Math.floor(this.scale / 2);
    this.randLength = randLength;
    this.enableNoise = enableNoise;

    this.lineWidth = Math.ceil(this.max_x / 4);
    this.ctx.lineWidth = this.lineWidth;
}

Bars.prototype.draw = function () {
    var offset = this.ctx.lineWidth;
    for (var x = Math.floor(this.ctx.lineWidth / 2); x < this.max_x; x += offset) {
        //this.ctx.strokeStyle = this.color.choose();
        //if (x >= Math.floor(this.max_x * .75) ||
        //    x <= Math.floor(this.max_x * .25)) {
        //    this.ctx.strokeStyle = "#ccc";
        //} else {
        this.ctx.strokeStyle = this.color.alternate();
        this._drawLine(x);

        // Alpha Lines
        this.ctx.lineWidth = 1;
        this.ctx.globalAlpha = 0;
        for (var inner_x = 0; inner_x < x + offset; inner_x++) {
            this.ctx.globalAlpha = this.ctx.globalAlpha + 0.0001;
            this.ctx.strokeStyle = this.color_alt.alternate();
            this._drawLine(inner_x);
        }

        // Reset stroke and alpha.
        this.ctx.globalAlpha = 1;
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = this.lineWidth;

        // Add some gray chunks.
        var start = 0;
        var size = 10;
        var amount = this.lineWidth / size;
        for (var rect_y = this.max_y - size; rect_y > this.max_y - (size * amount); rect_y -= size) {
            for (var rect_x = start; rect_x < this.max_x; rect_x += size) {
                this.ctx.fillStyle = this.color_alt.alternate();
                this.ctx.fillRect(rect_x, rect_y, size, size);
            }
            start += size;
        }
    }
}

Bars.prototype._drawLine = function (x) {

    var noise = 0;
    var limit;
    if (this.randLength) {
        limit = randInterval(this.max_y, 20);
    } else {
        limit = this.max_y;
    }

    var noiseRange = Math.floor(this.scale * 0.1);
    //var noiseRange = Math.floor(this.scale * Math.min(Math.max(Math.random(), 0.1), 0.2));
    var noiseRangePeak = Math.floor(this.scale * Math.min(Math.max(Math.random(), 0.3), 0.8));

    this.ctx.beginPath();
    this.ctx.moveTo(x, 0);
    if (this.enableNoise) {
        for (var y = 0; y < limit + 20; y += 20) {
                if (y >= Math.floor(limit * .75)) {
                    noise = rand0(noiseRangePeak);
                } else {
                    noise = rand0(noiseRange);
                }
                noise = rand0(noiseRange);
            this.ctx.lineTo(x + noise, y);
        } 
    } else {
        this.ctx.lineTo(x, limit + 20);
    }
    this.ctx.stroke();
}

Bars.prototype._clear = function () {
    this.ctx.clearRect(0, 0, this.max_x, this.max_y);
}

Bars.prototype.run = function () {
    this._clear();
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.max_x, this.max_y);
    this.draw();
}

/*
Bars.prototype.draw = function () {
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

Bars.prototype._drawLine = function (x) {

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
*/

