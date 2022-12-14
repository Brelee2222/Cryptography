import { Randomizer, byteArrayToBigUInt } from "./randomizer";
import crypto from "crypto";
import { log2 } from "./bigIntOperation";

export class Crypto implements Randomizer {
    // bytes are numbers because BigInt has a cap
    nextRandom(max: bigint, bytes?: number) : bigint {
        bytes ??= log2(max, 8n);
        return byteArrayToBigUInt(crypto.randomBytes(bytes), max);
    }
}