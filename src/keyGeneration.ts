import { Randomizer } from "./randomizer";
import { gcd, modInverse, log2, sprp } from "./bigIntOperation";

export type KeyPair = {
    e : bigint, 
    d : bigint, 
    b : bigint, 
    n : bigint
};

export function parseKeyPair(keyPair : KeyPair) : {
    public : string,
    private : string
} {
    return {
        public : `${keyPair.b};${keyPair.n};${keyPair.e}`,
        private : `${keyPair.b};${keyPair.n};${keyPair.d}`
    };
}

export function generateKeyPair(bitLength : number, randomizer : Randomizer) : KeyPair {
    const max = 1n << BigInt(bitLength >> 1) - 1n;
    const byteLength = (bitLength >> 3) + (bitLength & 7 ? 1 : 0);
    const p = gnrtPrbblPrm(max, byteLength, randomizer);
    const q = gnrtPrbblPrm(max, byteLength, randomizer);
    const n = p * q;
    
    const phiN = n - q - p + 1n;
    const maxE = phiN - 3n; // must be more than 1 and less than phiN which is what - 3n scopes
    const phiNByteLength = log2(maxE, 8n);

    let e : bigint;
    let d : bigint;
    do {
        while(gcd(e = randomizer.nextRandom(maxE, phiNByteLength) + 2n, phiN) !== 1n);
    } while(e === (d = modInverse(e, phiN)));

    return {
        e,
        n,
        d,
        b: BigInt(log2(n))
    }
}

// generate probable prime
function gnrtPrbblPrm(max : bigint, byteLength : number, randomizer : Randomizer) : bigint {
    let n : bigint;
    max -= 4n;
    // I chose 4n for I don't know
    while(!sprp(n = randomizer.nextRandom(max, byteLength) + 4n, randomizer));

    return n;
}