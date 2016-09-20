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

var gray = ["#333", "#666", "#999"]
var gray7 = ["#111",
             "#222",
             "#333",
             "#444",
             "#555",
             "#666",
             "#777"]

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

