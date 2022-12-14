"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decryption = exports.Encryption = void 0;
const bigIntOperation_1 = require("./bigIntOperation");
class Encryption {
    key;
    constructor(key) {
        this.key = key;
    }
    encrypt(data, bytesPerElement) {
        bytesPerElement ??= 8;
        let offset = 0;
        const encrypted = [];
        while (offset < data.length) {
            const portion = data.slice(offset, offset += bytesPerElement);
            let encrypt = 0n;
            for (let i = portion.length - 1; i != -1; i--) {
                encrypt = encrypt << 8n | BigInt(portion.charCodeAt(i));
            }
            encrypted[encrypted.length] = this.encryptValue(encrypt);
        }
        return encrypted;
    }
    encryptValue(value) {
        return (0, bigIntOperation_1.modPow)(value, this.key.e, this.key.n);
    }
}
exports.Encryption = Encryption;
class Decryption {
    key;
    constructor(key) {
        this.key = key;
    }
    decrypt(messages) {
        const secrets = [];
        for (let index = 0; index != messages.length; index++) {
            let decrypted = this.decryptValue(messages[index]);
            while (decrypted) {
                secrets[secrets.length] = Number(decrypted & 0xffn);
                decrypted >>= 8n;
            }
        }
        return String.fromCharCode(...secrets);
    }
    decryptValue(value) {
        return (0, bigIntOperation_1.modPow)(value, this.key.d, this.key.n);
    }
}
exports.Decryption = Decryption;
