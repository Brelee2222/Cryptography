"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cryptography_1 = require("./cryptography");
const keyGeneration_1 = require("./keyGeneration");
const randoms_1 = require("./randoms");
const keyPair = (0, keyGeneration_1.generateKeyPair)(255, new randoms_1.Crypto());
console.log(keyPair);
console.log((0, keyGeneration_1.parseKeyPair)(keyPair));
const e = new cryptography_1.Encryption(keyPair);
const encrypted = e.encrypt("Which states border the state of Pennsylvania?");
const d = new cryptography_1.Decryption(keyPair);
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
