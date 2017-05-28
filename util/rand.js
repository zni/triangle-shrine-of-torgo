/* Random functions of questionable usefulness.
 *
 * Date: 9-19-2016
 * Author: Matt Godshall
 */

function rand(n) {
    return Math.floor((Math.random() * n) + 1);
}

function rand0(n) {
    return Math.floor((Math.random() * n));
}

// from http://stackoverflow.com/a/1527820/2272910
function randInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randBool() {
    return Boolean(rand0(2));
}
