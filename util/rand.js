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

function randInterval(n, m) {
    return Math.max(rand(n), m);
}

function randBool() {
    return Boolean(rand0(2));
}
