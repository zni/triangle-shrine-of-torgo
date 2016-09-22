/* Triangle mountains or something.
 *
 * Date: 9-21-2016
 * Author: Matt Godshall
 */

function TriRec(ctx, max_x, max_y, scheme, scale) {
    this.ctx = ctx;
    this.max_x = max_x;
    this.max_y = max_y;
    this.color = new ColorPicker(scheme);
    this.triangle = new Triangle(this.ctx);
    this.scale = scale;
    this.x_offset = Math.floor(this.scale / 2);

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.max_x, this.max_y);
}

TriRec.prototype.draw = function (x) {
    //var x = Math.floor(this.max_x / 2);
    var scale = this.max_y; 
    for (var y = 0; y < (20 * 800); y += 20) {
        this.ctx.fillStyle = this.color.alternate();
        this.triangle.up(x, y, scale);
        scale = Math.floor(scale * 0.95);
    }
}

