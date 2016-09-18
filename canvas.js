var SCALE = 5;

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
    var color = this.scheme[this.choice]
    this.choice = (this.choice + 1) % this.length;
    return color;
}

function scatter(ctx, x, y) {
    for (var n = 0; n < 1280; n++) {
        ctx.fillStyle = colorPicker();
        var new_x = rand0(x);
        var new_y = rand0(y);
        // var size = randInterval(200, 50);
        var size = 1;
        ctx.fillRect(new_x, new_y, size, size);
    }
}

function triangleL(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + SCALE);
    ctx.lineTo(x + SCALE, y);
    ctx.fill()
}

function triangleUp(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - SCALE, y + SCALE);
    ctx.lineTo(x + SCALE, y + SCALE);
    ctx.fill()
}

function triangleDown(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y + SCALE);
    ctx.lineTo(x - SCALE, y);
    ctx.lineTo(x + SCALE, y);
    ctx.fill()
}

function fill(ctx, x, y) {
    for (var n = 0; n < x; n += SCALE) {
        for (var m = 0; m < y; m += SCALE) { 
            ctx.fillStyle = colorPicker();
            var size = 10;
            //ctx.fillRect(n, m, size, size);
            triangleL(ctx, n, m);
        }
    }
}

function weird1(ctx, x, y) {
    var color = new ColorPicker(neonCreme);
    var flip = false;
    for (var m = 0; m < y; m += Math.ceil(SCALE * 1.2)) {
        for (var n = 0; n < x; n += Math.ceil(SCALE * 1.2)) { 
            ctx.fillStyle = color.choose();
            var size = 10;
            //ctx.fillRect(n, m, size, size);
            if (flip) {
                triangleUp(ctx, n, m);
            } else {
                triangleDown(ctx, n, m);
            }

            flip = !flip;
        }
    }
}

function tess(ctx, x, y) {
    var color = new ColorPicker(neonCreme);
    var flip = false;
    for (var m = 0; m < y; m += SCALE - 1) {
        for (var n = 0; n < x; n += SCALE - 1) { 
            ctx.fillStyle = color.alternate();
            var size = 10;
            //ctx.fillRect(n, m, size, size);
            if (flip) {
                triangleUp(ctx, n, m);
            } else {
                triangleDown(ctx, n, m);
            }

            flip = !flip;
        }
    }
}

function setup(element) {
    console.log('element:', element);
    //var max_height = window.innerHeight;
    //var max_width = window.innerWidth;
    var max_height = screen.height;
    var max_width = screen.width;
    element.width = max_width;
    element.height = max_height;
    var ctx = element.getContext("2d");

    // scatter(ctx, max_width, max_height);
    weird1(ctx, max_width, max_height);
}
