/// <reference types="node" />
/// <reference types="node" />
type HonorRarity = "highest" | "high" | "middle" | "low";
export declare class EventHonorImage {
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
export declare class EventHonorSubImage {
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
