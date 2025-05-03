"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHonorSubImage = exports.EventHonorImage = void 0;
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const consts_1 = require("../consts");
const RarityMap = {
    "highest": 4,
    "high": 3,
    "middle": 2,
    "low": 1
};
class EventHonorImage {
    backgroundImage;
    rankImage;
    frameImage;
    honorRarity;
    isWorldLink;
    constructor({ backgroundImage, rankImage, frameImage, honorRarity, isWorldLink }) {
        this.backgroundImage = backgroundImage;
        this.rankImage = rankImage;
        this.frameImage = frameImage;
        this.honorRarity = honorRarity;
        this.isWorldLink = isWorldLink;
    }
    async create() {
        const baseImg = (0, sharp_1.default)(this.backgroundImage).resize(380, 80, { fit: "fill" });
        const framePath = path_1.default.join(consts_1.ASSETS_PATH, `frame_degree_m_${RarityMap[this.honorRarity]}.png`);
        const frameImg = this.frameImage ? await (0, sharp_1.default)(this.frameImage).toBuffer() : await (0, sharp_1.default)(framePath).toBuffer();
        const rankImg = await (0, sharp_1.default)(this.rankImage).toBuffer();
        const frameComposite = { input: frameImg, left: this.honorRarity === "low" ? 8 : 0, top: 0 };
        const rankComposite = this.isWorldLink ? { input: rankImg, left: 0, top: 0 } : { input: rankImg, left: 190, top: 1 };
        const composites = [
            frameComposite,
            rankComposite
        ];
        return await baseImg.composite(composites).toBuffer();
    }
}
exports.EventHonorImage = EventHonorImage;
class EventHonorSubImage {
    backgroundImage;
    rankImage;
    frameImage;
    honorRarity;
    isWorldLink;
    constructor({ backgroundImage, rankImage, frameImage, honorRarity, isWorldLink }) {
        this.backgroundImage = backgroundImage;
        this.rankImage = rankImage;
        this.frameImage = frameImage;
        this.honorRarity = honorRarity;
        this.isWorldLink = isWorldLink;
    }
    async create() {
        const baseImg = (0, sharp_1.default)(this.backgroundImage).resize(180, 80, { fit: "fill" });
        const framePath = path_1.default.join(consts_1.ASSETS_PATH, `frame_degree_s_${RarityMap[this.honorRarity]}.png`);
        const frameImg = this.frameImage ? await (0, sharp_1.default)(this.frameImage).toBuffer() : await (0, sharp_1.default)(framePath).toBuffer();
        const rankImg = await (0, sharp_1.default)(this.rankImage).toBuffer();
        const frameComposite = { input: frameImg, left: this.honorRarity === "low" ? 8 : 0, top: 0 };
        const rankComposite = this.isWorldLink ? { input: rankImg, left: 0, top: 0 } : { input: rankImg, left: 30, top: 42 };
        const composites = [
            frameComposite,
            rankComposite
        ];
        return await baseImg.composite(composites).toBuffer();
    }
}
exports.EventHonorSubImage = EventHonorSubImage;
