import { gcd, perfSqrProd, sqrt } from "./bigIntOperation";

function findFactor(n : bigint) : {a : bigint, b : bigint} {
    const aSqrt = sqrt(n).sqrt;
    const aMin = aSqrt + 1n;
    const aMax = n - 2n;

    const aModSqrs : bigint[] = [];

    // Math thing!! don't worry. I don't know if mod is practical here

    let aSqr = (aSqrt + 1n)**2n - n;

    for(let a = aMin; a != aMax; aSqr += a++) {
        aSqr = (aSqr + a) % n;

        let a2Sqrt = aSqrt;
        for(const a2 of aModSqrs) {
            a2Sqrt++;
            const perfectSqrt = perfSqrProd(aSqr, a2);
            if(perfectSqrt) {
                const aProd = (a * (aMin + a2Sqrt)) % n;

                return {
                    a : gcd(aProd + perfectSqrt, n),
                    b : gcd(aProd - perfectSqrt, n)
                }
            }
        }
    }

    return {
        a : 1n,
        b : n
    }
}