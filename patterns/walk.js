/* Walk
 *
 *
 * Date: 5-25-2017
 * Author: Matt Godshall
 */

function Walk(ctx, max_x, max_y, scheme, steps, randomize_origin) {
    this.ctx = ctx;
    this.max_x = max_x;
    this.max_y = max_y;
    this.color = new ColorPicker(scheme);
    this.color_alt = new ColorPicker(yargh);
    this.max_steps = steps;
    this.randomize_origin = randomize_origin;

    this.ctx.lineWidth = 1;
    this.x = 0;
    this.y = 0;
    this.step_size = 10;

    this.reverse = false;
}

Walk.prototype.draw = function () {
    //this._drawLines();
    this.ctx.strokeStyle = this.color_alt.alternate();
    //this.ctx.strokeStyle = "#eee";
    for (var iter = 0; iter < 5; iter++) {
        if (iter > 0) {
            this.randomize_origin = true;
        }
        this._drawRigidLines();
        this.ctx.strokeStyle = tinycolor(this.ctx.strokeStyle).darken(10).toString();
    }
}

Walk.prototype._drawLines = function () {

    var origin_x;
    var origin_y;
    if (this.randomize_origin) {
        origin_x = rand(this.max_x);
        origin_y = rand(this.max_y);
    } else {
        origin_x = 0;
        origin_y = 0;
    }

    this.ctx.beginPath();
    this.ctx.moveTo(origin_x, origin_y);
    this.ctx.strokeStyle = this.color.alternate();
    //this.ctx.fillStyle = this.color.choose();
    for (var step = 0; step < this.max_steps; step++) {
        this.ctx.lineTo(rand(this.max_x), rand(this.max_y));
    }
    //this.ctx.closePath();
    this.ctx.stroke();
    //this.ctx.fill();
}

Walk.prototype._drawRigidLines = function () {

    var origin_x;
    var origin_y;
    if (this.randomize_origin) {
        origin_x = rand(this.max_x);
        origin_y = rand(this.max_y);
    } else {
        origin_x = 0;
        origin_y = 0;
    }

    this.x = origin_x;
    this.y = origin_y;

    this.ctx.beginPath();
    this.ctx.moveTo(origin_x, origin_y);
    //var turn = false;
    for (var step = 0; step < this.max_steps; step++) {
        switch (rand0(3)) {
            case 0:
                this.walkForward();
                //turn = false;
                break;
            case 1:
                //if (!turn) {
                    this.walkLeft();
                 //   turn = true;
                //}
                break;
            case 2:
                //if (!turn) {
                    this.walkRight();
                 //   turn = true;
                //}
        }
    }
    this.ctx.stroke();
}

Walk.prototype.walkForward = function () {
    if (!this.reverse) {
        if (this.y + this.step_size < this.max_y) {
            this.y += this.step_size;
            this.ctx.lineTo(this.x, this.y);
        } else {
            this.reverse = true;
        }
    }

    if (this.reverse) {
        if ((this.y - this.step_size) > 0) {
            this.y -= this.step_size;
            this.ctx.lineTo(this.x, this.y);
        } else {
            this.reverse = false;
        }
    }
}

Walk.prototype.walkLeft = function () {
    if (this.x - this.step_size > 0) {
            this.x -= this.step_size;
            this.ctx.lineTo(this.x, this.y);
    }
}

Walk.prototype.walkRight = function () {
    if (this.x + this.step_size < this.max_x) {
            this.x += this.step_size;
            this.ctx.lineTo(this.x, this.y);
    }
}

Walk.prototype._clear = function () {
    this.ctx.clearRect(0, 0, this.max_x, this.max_y);
}

Walk.prototype.run = function () {
    this._clear();
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.max_x, this.max_y);
    this.draw();
}

