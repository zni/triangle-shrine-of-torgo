/* Triangular tiling. The future is now.
 *
 * Date: 9-19-2016
 * Author: Matt Godshall
 */

function TriangularTile(ctx, max_x, max_y, scheme) {
    this.ctx = ctx;
    this.max_x = max_x;
    this.max_y = max_y;
    this.color = new ColorPicker(scheme);
    this.triangle = new Triangle(ctx);
    this.scale = 50;
    this.x_offset = Math.floor(this.scale / 2);
    this.y_offset = this.scale - 1;
}

TriangularTile.prototype.draw = function () {
    var flip = false;
    for (var y = 0; y < this.max_y; y += this.y_offset) {
        flip = !flip;
        this.color.alternate();
        for (var x = 0; x < this.max_x; x += this.x_offset) {
            this.ctx.fillStyle = this.color.alternate();
            if (flip) {
                this.triangle.up(x, y, this.scale);
            } else {
                this.triangle.down(x, y, this.scale);
            }

            flip = !flip;
        }
    }
}

