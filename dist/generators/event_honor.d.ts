/// <reference types="node" />
/// <reference types="node" />
type HonorRarity = "highest" | "high" | "middle" | "low";
export declare class EventHonorImage {
    backgroundImage: Buffer;
    rankImage: Buffer;
    frameImage?: Buffer;
    honorRarity: HonorRarity;
    isWorldlinkChapter?: boolean;
    constructor({ backgroundImage, rankImage, frameImage, honorRarity, isWorldlinkChapter }: {
        backgroundImage: Buffer;
        rankImage: Buffer;
        frameImage?: Buffer;
        honorRarity: HonorRarity;
        isWorldlinkChapter?: boolean;
    });
    create(): Promise<Buffer>;
}
export declare class EventHonorSubImage {
    backgroundImage: Buffer;
    rankImage: Buffer;
    frameImage?: Buffer;
    honorRarity: HonorRarity;
    isWorldlinkChapter?: boolean;
    constructor({ backgroundImage, rankImage, frameImage, honorRarity, isWorldlinkChapter }: {
        backgroundImage: Buffer;
        rankImage: Buffer;
        frameImage?: Buffer;
        honorRarity: HonorRarity;
        isWorldlinkChapter?: boolean;
    });
    create(): Promise<Buffer>;
}
export {};
