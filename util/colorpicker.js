/* Spits out random colors from a scheme, or sequentially runs through a
 * scheme. Holy shit.
 *
 * Date: 9-19-2016
 * Author: Matt Godshall
 */

var neonCreme= ["#aa1155",
                "#880044",
                "#dd1155",
                "#ffee88",
                "#00cc99"];
var melo = ["#000b2f",
	"#f44e57",
	"#f9bb64",
	"#63193b"]

var yargh = ["#32ba81", "#003fa5", "#320447", "#eaf200"]

var gray = ["#333", "#666", "#999"]
var gray7 = ["#111",
             "#222",
             "#333",
             "#444",
             "#555",
             "#666",
             "#777"]

var cmyk = ["#68DD79",
            "#00BFB2",
            "#E4FF1A",
            "#CC3363",
            "#540D6E"]

var cmyk_alt = ["#68DD79",
                "#00BFB2",
                "#E4FF1A",
                "#CC3363"]

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

