"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateKeyPair = exports.parseKeyPair = void 0;
const bigIntOperation_1 = require("./bigIntOperation");
function parseKeyPair(keyPair) {
    return {
        public: `${keyPair.b};${keyPair.n};${keyPair.e}`,
        private: `${keyPair.b};${keyPair.n};${keyPair.d}`
    };
}
exports.parseKeyPair = parseKeyPair;
function generateKeyPair(bitLength, randomizer) {
    const max = 1n << BigInt(bitLength >> 1) - 1n;
    const byteLength = (bitLength >> 3) + (bitLength & 7 ? 1 : 0);
    const p = gnrtPrbblPrm(max, byteLength, randomizer);
    const q = gnrtPrbblPrm(max, byteLength, randomizer);
    const n = p * q;
    const phiN = n - q - p + 1n;
    const maxE = phiN - 3n; // must be more than 1 and less than phiN which is what - 3n scopes
    const phiNByteLength = (0, bigIntOperation_1.log2)(maxE, 8n);
    let e;
    let d;
    do {
        while ((0, bigIntOperation_1.gcd)(e = randomizer.nextRandom(maxE, phiNByteLength) + 2n, phiN) !== 1n)
            ;
    } while (e === (d = (0, bigIntOperation_1.modInverse)(e, phiN)));
    return {
        e,
        n,
        d,
        b: BigInt((0, bigIntOperation_1.log2)(n))
    };
}
exports.generateKeyPair = generateKeyPair;
// generate probable prime
function gnrtPrbblPrm(max, byteLength, randomizer) {
    let n;
    max -= 4n;
    // I chose 4n for I don't know
    while (!(0, bigIntOperation_1.sprp)(n = randomizer.nextRandom(max, byteLength) + 4n, randomizer))
        ;
    return n;
}
