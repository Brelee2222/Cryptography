import { KeyPair } from "./keyGeneration";
import { modPow } from "./bigIntOperation";

export class Encryption {
    key : KeyPair;

    constructor(key : KeyPair) {
        this.key = key;
    }

    encrypt(data : string, bytesPerElement? : number) : bigint[] {
        bytesPerElement ??= 8;
        let offset = 0;
        const encrypted = [];

        while(offset < data.length) {
            const portion = data.slice(offset, offset += bytesPerElement);

            let encrypt = 0n;
            for(let i = portion.length-1; i != -1; i--) {
                encrypt = encrypt << 8n | BigInt(portion.charCodeAt(i));
            }

            encrypted[encrypted.length] = this.encryptValue(encrypt);
        }

        return encrypted;
    }

    encryptValue(value : bigint) : bigint {
        return modPow(value, this.key.e, this.key.n);
    }
}

export class Decryption {
    key : KeyPair;

    constructor(key : KeyPair) {
        this.key = key;
    }

    decrypt(messages : bigint[]) : string {
        const secrets = [];
        for(let index = 0; index != messages.length; index++) {
            let decrypted = this.decryptValue(messages[index]);

            while(decrypted) {
                secrets[secrets.length] = Number(decrypted & 0xffn);
                decrypted >>= 8n;
            }
        }

        return String.fromCharCode(...secrets);
    }

    decryptValue(value : bigint) : bigint {
        return modPow(value, this.key.d, this.key.n);
    }
}