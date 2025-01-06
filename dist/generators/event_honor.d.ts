/// <reference types="node" />
/// <reference types="node" />
type HonorRarity = "highest" | "high" | "middle" | "low";
export default class EventHonorImage {
    backgroundImage: Buffer;
    rankImage: Buffer;
    honorRarity: HonorRarity;
    frameName: string;
    constructor({ backgroundImage, rankImage, honorRarity, frameName }: {
        backgroundImage: Buffer;
        rankImage: Buffer;
        honorRarity: HonorRarity;
        frameName?: string;
    });
    create(): Promise<Buffer>;
}
export {};
