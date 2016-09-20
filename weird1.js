/* It moves. A random walk featuring triangles.
 *
 * Date: 9-19-2016
 * Author: Matt Godshall
 */

function Weird1(ctx, max_x, max_y) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.color = new ColorPicker(neonCreme);
    this.triangle = new Triangle(ctx);
    this.scale = 60;
    this.max_x = max_x + Math.floor(this.scale / 2);
    this.max_y = max_y + this.scale;
    this.flip = false;
    //this.movement = Math.ceil(this.scale * 1.2);
    this.movement = this.scale;
}

Weird1.prototype._draw = function () {
    if (this.x >= this.max_x) {
        this.x = 0;
    }

    if (this.y >= this.max_y) {
        this.y = 0;
    }

    this.ctx.fillStyle = this.color.alternate();
    if (this.flip) {
        this.triangle.up(this.x, this.y, this.scale);
    } else {
        this.triangle.down(this.x, this.y, this.scale);
    }

    this.flip = !this.flip;

    switch (rand(2)) {
        case 1:
        this.y += this.movement;
        break;

        case 2:
        this.x += Math.floor(this.movement / 2);
        break;
    }
}

Weird1.prototype.run = function() {
    setInterval(this._draw.bind(this), 50);
}

