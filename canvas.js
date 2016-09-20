var SCALE = 50;

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

function weird1(ctx, x, y) {
    var color = new ColorPicker(neonCreme);
    var triangle = new Triangle(ctx);
    var flip = false;
    for (var m = 0; m < y; m += Math.ceil(SCALE * 1.2)) {
        for (var n = 0; n < x; n += Math.ceil(SCALE * 1.1)) {
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

    //var weird = new Weird1(ctx, max_width, max_height);
    //weird.run();
    var tile = new TriangularTile(ctx, max_width, max_height);
    tile.draw();
}
