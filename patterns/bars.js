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
    this.color_alt = new ColorPicker(gray7.concat(cmyk));
    this.scale = scale;
    this.x_offset = Math.floor(this.scale / 2);
    this.randLength = randLength;

    this.lineWidth = Math.ceil(this.max_x / 8);
    this.ctx.lineWidth = this.lineWidth;
}

Bars.prototype.draw = function () {
    var offset = this.ctx.lineWidth;
    for (var x = Math.floor(this.ctx.lineWidth / 2); x < this.max_x; x += offset) {
        //this.ctx.strokeStyle = tinycolor(this.color.alternate()).saturate(100).toString();
        this.ctx.strokeStyle = this.color.alternate();
        this._drawLine(x, false);

        // Alpha Lines
        this.ctx.lineWidth = 1;
        this.ctx.globalAlpha = 0;
        this.ctx.globalCompositeOperation = 'color-burn';
        for (var inner_x = 0; inner_x < x + offset; inner_x += this.ctx.lineWidth) {
            this.ctx.globalAlpha = this.ctx.globalAlpha + 0.001;
            this.ctx.strokeStyle = this.color_alt.alternate();
            if (rand0(2)) {
                this._drawLine(inner_x, true);
            }
        }
        this.randLength = false;

        // Reset stroke and alpha.
        this.ctx.globalAlpha = 1;
        this.ctx.lineWidth = this.lineWidth;

        //this.ctx.globalCompositeOperation = 'color-burn';
        //this.ctx.globalCompositeOperation = 'difference';
        this.ctx.globalCompositeOperation = 'exclusion';
        this._drawChunksAlt(x, offset);
        this.ctx.globalCompositeOperation = 'source-over';

        // Add some chunks.
        this.ctx.globalAlpha = 1;
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = this.lineWidth;
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
        var size = 10;
        var amount = this.lineWidth / size;

        for (var y = this.max_y / 2; y < this.max_y; y += size) {
            for (var rect_x = start; rect_x < this.max_x; rect_x += size) {
                if (rand0(2) == 1) {
                    this.ctx.fillStyle = tinycolor(this.color_alt.alternate()).saturate(100).toString();
                } else {
                    this.ctx.fillStyle = tinycolor(this.color_alt.alternate()).desaturate(100).toString();
                }
                //if (rand0(2) == 1) {
                    //this.ctx.fillStyle = this.color_alt.alternate();
                    //this.ctx.fillRect(rect_x, Math.abs(Math.cos(y) * 600), size, size);
                    this.ctx.fillRect(rect_x, y, size, size);
                //}
            }
            //start += size;
        }

}

Bars.prototype._drawLine = function (x, randLength) {

    var noise = 0;
    var limit;
    if (randLength) {
        limit = randInterval(this.max_y, 20);
        //limit = Math.abs(Math.sin(x) * 500);
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

