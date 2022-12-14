"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crypto = void 0;
const randomizer_1 = require("./randomizer");
const crypto_1 = __importDefault(require("crypto"));
const bigIntOperation_1 = require("./bigIntOperation");
class Crypto {
    // bytes are numbers because BigInt has a cap
    nextRandom(max, bytes) {
        bytes ??= (0, bigIntOperation_1.log2)(max, 8n);
        return (0, randomizer_1.byteArrayToBigUInt)(crypto_1.default.randomBytes(bytes), max);
    }
}
exports.Crypto = Crypto;
