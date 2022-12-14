import { Randomizer } from "./randomizer";

export function log2(value : bigint, base? : bigint) : number {
    base ??= 1n;
    let log = 0;

    while(value) {
        log++;
        value >>= base;
    };

    return log;
}

export function log(value : bigint, base : bigint) : number {
    let log = 0;

    while(value) {
        log++;
        value /= base;
    }

    return log;
}

// Used for gcd and mod inverse
export function* modular(value1 : bigint, value2 : bigint) : Generator<bigint, bigint, unknown> {
    do {
        const temp = value2;
        yield temp;
        value2 = value1 % value2;
        value1 = temp;
    } while(value2);
    return value1;
}

export function gcd(value1 : bigint, value2 : bigint) : bigint {
    const mod = modular(value1, value2);

    let current : IteratorResult<bigint, bigint>;
    while(!(current = mod.next()).done);

    return current.value;
}

export function modInverse(a : bigint, b : bigint) : bigint {
    const initB = b;

    const mod = modular(a, b);
    let current : IteratorResult<bigint, bigint>;

    let x0 = 0n;
    let x1 = 1n;
    while(!(current = mod.next()).done) {
        const remainder = current.value;
        const q = (b-remainder)/a;
        b = a;
        a = remainder;

        const tempx = x0;
        x0 = x1;
        x1 = tempx - q*x1;
    }

    return x1 < 0 ? x1 + initB : x1;
}

//https://en.wikipedia.org/wiki/Probable_prime
export function sprp(value : bigint, randomizer : Randomizer) : boolean {
    let s = -1n;
    let d : bigint;
    let targetValue = value-1n;
    while(!((d = targetValue / (1n << ++s)) & 1n) || (targetValue % (1n << s)));

    let a = randomizer.nextRandom(targetValue - 3n) + 2n;

    let r = 0n;
    while(r < s) {
        const modPower = modPow(a, d<<r++, value);
        if(modPower === targetValue || modPower === 1n)
            return true;
    }
    return false;
}

// Actually is faster than normal pow
function pow(base : bigint, exponent : bigint) : bigint {
    let result = 1n;
    for(let bit = 1n << BigInt(log2(exponent)-1); bit; bit >>= 1n) {
        result *= result;

        if(exponent & bit) {
            result *= base;
        }
    }

    return result;
}

export function modPow(base : bigint, exponent : bigint, divisor : bigint) : bigint {
    let result = 1n;
    base %= divisor;
    for(let bit = 1n << BigInt(log2(exponent)-1); bit && result; bit >>= 1n) {
        result *= result;

        if(exponent & bit) {
            result *= base;
        }

        result %= divisor;
    }

    return result;
}