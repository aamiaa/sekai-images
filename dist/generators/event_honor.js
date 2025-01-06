"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    honorRarity;
    frameName;
    constructor({ backgroundImage, rankImage, honorRarity, frameName }) {
        this.backgroundImage = backgroundImage;
        this.rankImage = rankImage;
        this.honorRarity = honorRarity;
        this.frameName = frameName;
    }
    async create() {
        const baseImg = (0, sharp_1.default)(this.backgroundImage).resize(380, 80, { fit: "fill" });
        const frameImg = await (0, sharp_1.default)(path_1.default.join(consts_1.ASSETS_PATH, `frame_degree_m_${RarityMap[this.honorRarity]}${this.frameName ? "_" + this.frameName : ""}.png`)).toBuffer();
        const rankImg = await (0, sharp_1.default)(this.rankImage).toBuffer();
        const rankComposite = this.frameName ? { input: rankImg, left: 0, top: 0 } : { input: rankImg, left: 190, top: 1 };
        const composites = [
            { input: frameImg, left: 0, top: 0 },
            rankComposite
        ];
        return await baseImg.composite(composites).toBuffer();
    }
}
exports.default = EventHonorImage;
