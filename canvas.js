var SCALE = 20;

function rand(n) {
    return Math.floor((Math.random() * n) + 1);
}

function rand0(n) {
    return Math.floor((Math.random() * n));
}

function randInterval(n, m) {
    return Math.max(Math.floor((Math.random() * n) + 1), m);
}

var neonCreme= ["#aa1155",
                "#880044",
                "#dd1155",
                "#ffee88",
                "#00cc99"];

function ColorPicker(scheme) {
    this.scheme = scheme;
    this.length = scheme.length;
    this.choice = 0;
}

ColorPicker.prototype.choose = function () {
    return this.scheme[rand0(this.length)];
}

ColorPicker.prototype.alternate = function () {
    var color = this.scheme[this.choice];
    this.choice = (this.choice + 1) % this.length;
    return color;
}

function Triangle(ctx) {
    this.ctx = ctx;
}

Triangle.prototype.topLeft = function (x, y, scale) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x, y + scale);
    this.ctx.lineTo(x + scale, y);
    this.ctx.fill()
}

Triangle.prototype.up = function (x, y, scale) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x - scale, y + scale);
    this.ctx.lineTo(x + scale, y + scale);
    this.ctx.fill()
}

Triangle.prototype.down = function (x, y, scale) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y + scale);
    this.ctx.lineTo(x - scale, y);
    this.ctx.lineTo(x + scale, y);
    this.ctx.fill()
}

function scatter(ctx, x, y) {
    var color = new ColorPicker(neonCreme);
    for (var n = 0; n < 1280; n++) {
        ctx.fillStyle = color.choose();
        var new_x = rand0(x);
        var new_y = rand0(y);
        // var size = randInterval(200, 50);
        var size = 1;
        ctx.fillRect(new_x, new_y, size, size);
    }
}

function fillTriangle(ctx, x, y) {
    var neon = new ColorPicker(neonCreme);
    var bw = new ColorPicker(["#333", "black"]);
    var triangle = new Triangle(ctx);
    for (var n = 0; n < x; n += SCALE) {
        for (var m = 0; m < y; m += SCALE) {
            if ((n % 3) === 0) {
                ctx.fillStyle = neon.alternate();
            } else {
                ctx.fillStyle = bw.alternate();
            }
            triangle.topLeft(n, m, SCALE);
        }
    }
}

function Weird1(ctx, max_x, max_y) {
    var self = this;
    this.ctx = ctx;
    this.max_x = max_x;
    this.max_y = max_y;
    this.x = 0;
    this.y = 0;
    this.color = new ColorPicker(neonCreme);
    this.triangle = new Triangle(ctx);
    this.scale = 10;
    this.flip = false;
}

Weird1.prototype.draw = function () {
    if (this.x >= this.max_x) {
        this.x = 0;
    }

    if (this.y >= this.max_y) {
        this.y = 0;
    }

    this.ctx.fillStyle = this.color.choose();

    if (this.flip) {
        this.triangle.up(this.x, this.y, this.scale);
    } else {
        this.triangle.down(this.x, this.y, this.scale);
    }

    this.flip = !this.flip;

    if (rand0(2) == 0) {
        this.y += Math.ceil(this.scale * 1.2);
    } else {
        this.x += Math.ceil(this.scale * 1.2);
    }
}

Weird1.prototype.run = function() {
    setInterval(this.draw.bind(this), 100);
}

function weird1(ctx, x, y) {
    var color = new ColorPicker(neonCreme);
    var triangle = new Triangle(ctx);
    var flip = false;
    for (var m = 0; m < y; m += Math.ceil(SCALE * 1.2)) {
        for (var n = 0; n < x; n += Math.ceil(SCALE * 1.2)) {
            ctx.fillStyle = color.alternate();
            if (flip) {
                triangle.up(n, m, SCALE);
            } else {
                triangle.down(n, m, SCALE);
            }

            flip = !flip;
        }
    }
}

function tess(ctx, x, y) {
    var color = new ColorPicker(neonCreme);
    var triangle = new Triangle(ctx);
    var flip = false;
    for (var m = 0; m < y; m += SCALE - 1) {
        for (var n = 0; n < x; n += SCALE - 1) {
            ctx.fillStyle = color.alternate();
            if (flip) {
                triangle.up(n, m, SCALE);
            } else {
                triangle.down(n, m, SCALE);
            }
            flip = !flip;
        }
    }
}

function bands1(ctx, x, y) {
    var triangle = new Triangle(ctx);
    var neon = new ColorPicker(neonCreme);
    var flip = false;
    for (var m = 0; m < y + SCALE; m += SCALE - 1) {
        if (m < 200) {
            SCALE = 10;
        } else if (m > 400) {
            SCALE = 50;
        } else {
            SCALE = 20;
        }
        for (var n = 0; n < x + SCALE; n += SCALE - 1) {
            ctx.fillStyle = neon.alternate();

            if (flip) {
                triangle.up(n, m, SCALE);
            } else {
                triangle.down(n, m, SCALE);
            }

            flip = !flip;
        }
    }
}

function bands2(ctx, x, y) {
    var triangle = new Triangle(ctx);
    var neon = new ColorPicker(neonCreme);
    var bw = new ColorPicker(["black", "#333"]);
    var flip = false;
    for (var m = 0; m < y + SCALE; m += SCALE - 1) {
        if (m < 200) {
            SCALE = 10;
        } else if (m > 400) {
            SCALE = 50;
        } else {
            SCALE = 20;
        }
        for (var n = 0; n < x + SCALE; n += SCALE - 1) {
            if (m % 2 === 0) {
                ctx.fillStyle = bw.alternate();
            } else {
                ctx.fillStyle = neon.alternate();
            }

            if (flip) {
                triangle.up(n, m, SCALE);
            } else {
                triangle.down(n, m, SCALE);
            }

            flip = !flip;
        }
    }
}

function bands3(ctx, x, y) {
    var triangle = new Triangle(ctx);
    var neon = new ColorPicker(neonCreme);
    var bw = new ColorPicker(["black", "#333"]);
    var flip = false;
    for (var m = 0; m < y + SCALE; m += SCALE - 1) {
        if (m % 2 === 0) {
            SCALE = 50;
        } else {
            SCALE = 20;
        }
        for (var n = 0; n < x + SCALE; n += SCALE - 1) {
            if (m > 400 || m < 200) {
                ctx.fillStyle = bw.alternate();
            } else {
                ctx.fillStyle = neon.alternate();
            }

            if (flip) {
                triangle.up(n, m, SCALE);
            } else {
                triangle.down(n, m, SCALE);
            }

            flip = !flip;
        }
    }
}

function bands4(ctx, x, y) {
    var triangle = new Triangle(ctx);
    var neon = new ColorPicker(neonCreme);
    var bw = new ColorPicker(["black", "#333"]);
    var flip = false;
    for (var m = 0; m < y + SCALE; m += SCALE - 1) {
        if (m % 5 === 0) {
            SCALE = 50;
        } else {
            SCALE = 20;
        }

        for (var n = 0; n < x + SCALE; n += SCALE - 1) {
            if (m % 2 === 0) {
                ctx.fillStyle = bw.alternate();
            } else {
                ctx.fillStyle = neon.alternate();
            }

            if (flip) {
                triangle.up(n, m, SCALE);
            } else {
                triangle.down(n, m, SCALE);
            }

            flip = !flip;
        }
    }
}

function setup(element) {
    var max_height = screen.height;
    var max_width = screen.width;
    element.width = max_width;
    element.height = max_height;
    var ctx = element.getContext("2d");

    var weird = new Weird1(ctx, max_width, max_height);
    weird.run();
    // weird1(ctx, max_width, max_height);
}
