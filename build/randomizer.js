"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.byteArrayToBigUInt = void 0;
function byteArrayToBigUInt(bytes, max) {
    let UInt = 0n;
    let bit = 1n;
    for (const byte of bytes) {
        UInt = UInt << 8n | BigInt(byte);
        bit <<= 8n;
    }
    while ((bit >>= 1n) && UInt > max) {
        if (UInt & bit)
            UInt ^= bit;
    }
    /*
    while(UInt > max) {
        UInt >>= 1;
    }
    */
    return UInt;
}
exports.byteArrayToBigUInt = byteArrayToBigUInt;
