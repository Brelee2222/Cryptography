"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modPow = exports.sprp = exports.modInverse = exports.gcd = exports.modular = exports.log = exports.log2 = void 0;
function log2(value, base) {
    base ??= 1n;
    let log = 0;
    while (value) {
        log++;
        value >>= base;
    }
    ;
    return log;
}
exports.log2 = log2;
function log(value, base) {
    let log = 0;
    while (value) {
        log++;
        value /= base;
    }
    return log;
}
exports.log = log;
// Used for gcd and mod inverse
function* modular(value1, value2) {
    do {
        const temp = value2;
        yield temp;
        value2 = value1 % value2;
        value1 = temp;
    } while (value2);
    return value1;
}
exports.modular = modular;
function gcd(value1, value2) {
    const mod = modular(value1, value2);
    let current;
    while (!(current = mod.next()).done)
        ;
    return current.value;
}
exports.gcd = gcd;
function modInverse(a, b) {
    const initB = b;
    const mod = modular(a, b);
    let current;
    let x0 = 0n;
    let x1 = 1n;
    while (!(current = mod.next()).done) {
        const remainder = current.value;
        const q = (b - remainder) / a;
        b = a;
        a = remainder;
        const tempx = x0;
        x0 = x1;
        x1 = tempx - q * x1;
    }
    return x1 < 0 ? x1 + initB : x1;
}
exports.modInverse = modInverse;
//https://en.wikipedia.org/wiki/Probable_prime
function sprp(value, randomizer) {
    let s = -1n;
    let d;
    let targetValue = value - 1n;
    while (!((d = targetValue / (1n << ++s)) & 1n) || (targetValue % (1n << s)))
        ;
    let a = randomizer.nextRandom(targetValue - 3n) + 2n;
    let r = 0n;
    while (r < s) {
        const modPower = modPow(a, d << r++, value);
        if (modPower === targetValue || modPower === 1n)
            return true;
    }
    return false;
}
exports.sprp = sprp;
// Actually is faster than normal pow
function pow(base, exponent) {
    let result = 1n;
    for (let bit = 1n << BigInt(log2(exponent) - 1); bit; bit >>= 1n) {
        result *= result;
        if (exponent & bit) {
            result *= base;
        }
    }
    return result;
}
function modPow(base, exponent, divisor) {
    let result = 1n;
    base %= divisor;
    for (let bit = 1n << BigInt(log2(exponent) - 1); bit && result; bit >>= 1n) {
        result *= result;
        if (exponent & bit) {
            result *= base;
        }
        result %= divisor;
    }
    return result;
}
exports.modPow = modPow;
