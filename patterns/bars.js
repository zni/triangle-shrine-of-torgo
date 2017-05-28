/* Bars
 *
 *
 * Date: 5-25-2017
 * Author: Matt Godshall
 */

function Bars(ctx, max_x, max_y, scheme, scale, randLength) {
    this.ctx = ctx;
    this.max_x = max_x;
    this.max_y = max_y;
    this.color = new ColorPicker(scheme);
    this.color_alt = new ColorPicker(cmyk);
    this.scale = scale;
    this.x_offset = Math.floor(this.scale / 2);
    this.randLength = randLength;

    this.lineWidth = Math.ceil(this.max_x / 4);
    this.ctx.lineWidth = this.lineWidth;
}

Bars.prototype.draw = function () {
    var offset;
    for (var x = Math.floor(this.ctx.lineWidth / 2); x < this.max_x; x += offset) {
        offset = Math.ceil(this.max_x / randInterval(4, 8));
        this.ctx.lineWidth = offset;
        this.ctx.strokeStyle = this.color.alternate();
        this._drawLine(x, false);
    }

    if (randBool()) {
        // Alpha burning lines.
        this.ctx.lineWidth = 1;
        this.ctx.globalAlpha = 0;
        this.ctx.globalCompositeOperation = 'color-burn';
        for (var x = 0; x < this.max_x; x++) {
            this.ctx.globalAlpha = this.ctx.globalAlpha + 0.001;
            this.ctx.strokeStyle = this.color_alt.alternate();
            if (randBool()) {
                this._drawLine(x, true);
            }
        }
        this.randLength = false;

        // Reset stroke and alpha.
        this.ctx.globalAlpha = 1;
        this.ctx.lineWidth = this.lineWidth;
    }

    if (randBool()) {
        var noise_rounds = rand(5);
        for (var round = 0; round < noise_rounds; round++) {
            // Switch it up (yuk yuk yuk) from just color-dodge and hue.
            switch (rand(5)) {
                case 1:
                    this.ctx.globalCompositeOperation = 'color-dodge';
                    break;
                case 2:
                    this.ctx.globalCompositeOperation = 'hue';
                    break;
                case 3:
                    this.ctx.globalCompositeOperation = 'exclusion';
                    break;
                case 4:
                    this.ctx.globalCompositeOperation = 'difference';
                    break;
                case 5:
                    this.ctx.globalCompositeOperation = 'color-burn';
                    break;
            }
            this._drawChunksRandomSize(0, offset);
        }

        // Lay down a nice chunky base layer of chunks. Real chunky like.
        this.ctx.globalCompositeOperation = 'color-burn';
        this._drawNoise(0);
        // Reset to default composite operation.
        this.ctx.globalCompositeOperation = 'source-over';
    }
}

Bars.prototype._drawChunks = function (x, offset) {
        var start = x - Math.floor(offset / 2);
        var size = 10;
        var amount = this.lineWidth / size;

        // x by default is in the middle of the line width, so subtract it.
        var limit_x = (x - Math.floor(offset / 2)) + offset;
        var limit_y = this.max_y - (size * amount)

        for (var rect_y = this.max_y - size; rect_y > limit_y; rect_y -= size) {
            for (var rect_x = start; rect_x < limit_x; rect_x += size) {
                //this.ctx.fillStyle = tinycolor(this.color_alt.alternate()).saturate(100).toString();
                if (rand0(2) == 1) {
                    this.ctx.fillStyle = this.color_alt.alternate();
                    this.ctx.fillRect(rect_x, rect_y, size, size);
                }
            }
            start += size;
        }

}

Bars.prototype._drawChunksAlt = function (x, offset) {
        var start = x - Math.floor(offset / 2);
        var size = 1;
        var amount = this.lineWidth / size;

        for (var y = this.max_y * (3/4); y < this.max_y; y += size) {
            for (var rect_x = start; rect_x < this.max_x; rect_x += size) {
                //if (rand0(2) == 1) {
                //    this.ctx.fillStyle = tinycolor(this.color_alt.alternate()).saturate(100).toString();
                //} else {
                //    this.ctx.fillStyle = tinycolor(this.color_alt.alternate()).desaturate(100).toString();
                //}
                this.ctx.fillStyle = tinycolor(this.color_alt.alternate()).desaturate(100).toString();
                //if (rand0(2) == 1) {
                    //this.ctx.fillStyle = this.color_alt.alternate();
                    //this.ctx.fillRect(rect_x, Math.abs(Math.cos(y) * 600), size, size);
                    //size = randInterval(1, 10);
                    this.ctx.fillRect(rect_x, y, size, size);
                //}
            }
            //start += size;
        }

}
Bars.prototype._drawNoise = function (x) {
        var size = 1;
        var amount = this.lineWidth / size;
        var jitter;
        var step;

        for (var rect_x = x; rect_x < this.max_x; rect_x += step) {
            // Jitter is good.
            jitter = rand0(100);
            step = randInterval(1, 50);
            for (var y = randInterval(this.max_y * (3/4), this.max_y) - jitter; y < this.max_y; y += size) {
                this.ctx.fillStyle = tinycolor(this.color_alt.alternate()).desaturate(100).toString();
                this.ctx.fillRect(rect_x, y, size, size);
            }
        }

}

Bars.prototype._drawChunksRandomSize = function (x, offset) {
        var start = x - Math.floor(offset / 2);
        var size = randInterval(3, 10);
        var amount = this.lineWidth / size;
        var jitter;

        for (var rect_x = start; rect_x < this.max_x; rect_x += size) {
            // Jitter values between 20 - 60 seem good. Or 200, 200 is also good.
            jitter = rand0(200);
            for (var y = randInterval(this.max_y * (3/4), this.max_y) - jitter; y < this.max_y; y += size) {
                this.ctx.fillStyle = tinycolor(this.color_alt.alternate()).darken(rand(80)).greyscale().toString();
                size = randInterval(3, 10);
                this.ctx.fillRect(rect_x, y, size, size);
            }
        }

}

Bars.prototype._drawLine = function (x, randLength) {

    var noise = 0;
    var limit;
    if (randLength) {
        limit = randInterval(20, this.max_y);
    } else {
        limit = this.max_y;
    }

    this.ctx.beginPath();
    this.ctx.moveTo(x, 0);
    this.ctx.lineTo(x, limit + 20);
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

