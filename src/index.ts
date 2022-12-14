import { Decryption, Encryption } from "./cryptography";
import { generateKeyPair, parseKeyPair } from "./keyGeneration";
import { Crypto } from "./randoms";

const keyPair = generateKeyPair(100, new Crypto());

console.log(keyPair);
console.log(parseKeyPair(keyPair));

const e = new Encryption(keyPair);
const encrypted = e.encrypt("Which states border the state of Pennsylvania?");
const d = new Decryption(keyPair);
/*
const d = new Decryption({
    b: 97n,
    n: 85196148381406656342627210697n,
    e: 63857664987040518978646141077n,
    d: 31795132929440201930292158237n
});

const decrypted = d.decrypt([71034641912915303341460964974n,39579183285788280300093957268n,40683718747041007032109932749n,67872519239313527099240740267n,53469942768279451065828743876n,53587036885557873015415001651n]);
*/
const decrypted = d.decrypt(encrypted);
console.log(decrypted);