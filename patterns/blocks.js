/* Blocks
 *
 *
 * Date: 5-25-2017
 * Author: Matt Godshall
 */

function Blocks(ctx, max_x, max_y, scheme, scale, randomizeScale) {
    this.ctx = ctx;
    this.max_x = max_x;
    this.max_y = max_y;
    this.color = new ColorPicker(scheme);
    this.color_alt = new ColorPicker(yargh);
    this.scale_upper_limit = scale;
    this.scale = scale;
    this.randomizeScale = randomizeScale;
    this.x_offset = Math.floor(this.scale / 2);

    this.lineWidth = Math.ceil(this.max_x / 4);
    this.ctx.lineWidth = this.lineWidth;
}

Blocks.prototype.draw = function () {
    for (var y = 0; y < this.max_y; y += this.scale) {
        if (this.randomizeScale) {
            this.scale = randInterval(10, this.scale_upper_limit);
        }
        for (var x = 0; x < this.max_x; x += this.scale) {
            this._drawBlock(x, y);
        }
    }
}

Blocks.prototype._drawBar = function (x, width, color, enableGradient) {
    if (randBool() && enableGradient) {
        var gradient = this.ctx.createLinearGradient(x, 0, width + x, 0);
        var init_color = color;
        var end_color = tinycolor(init_color).darken(randInterval(20, 50)).toString();
        gradient.addColorStop(0, init_color);
        gradient.addColorStop(1, end_color);
        this.ctx.fillStyle = gradient;
    } else {
        this.ctx.fillStyle = color;
    }
    this.ctx.fillRect(x, 0, width, this.max_y);
}

Blocks.prototype._drawBlock = function(x, y) {
    var width = this.scale;
    var height = this.scale;
    var vert_width = Math.ceil(width / 16);
    var horiz_height = Math.ceil(height / 16);

    if (randBool()) {
        this.ctx.fillStyle = this.color.alternate();
    } else {
        this.ctx.fillStyle = this.color_alt.alternate();
    }
    this.ctx.fillRect(x, y, vert_width, height);
    this.ctx.fillRect(x, y + (height * (15/16)), width, horiz_height);

    // Good values: 8, 2, 4
    var frac = 8;
    // Original idea used 3, but anything works.
    var inc = 1;
    var color = this.ctx.fillStyle;
    for (var step = inc; step < 8; step += inc) {
        this.ctx.fillStyle = tinycolor(color).darken(step * 15).toString();
        this.ctx.fillRect(x + (width * (step/frac)),
                          y + (height * (step/frac)),
                          vert_width,
                          height - (height * (step/frac)));
    }
}

Blocks.prototype._drawLine = function (x, randLength) {
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

Blocks.prototype._clear = function () {
    this.ctx.clearRect(0, 0, this.max_x, this.max_y);
}

Blocks.prototype.run = function () {
    this._clear();
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.max_x, this.max_y);
    this.draw();
}

