"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const consts_1 = require("../consts");
const sekai_api_1 = require("sekai-api");
class LeaderCardImage {
    cardData;
    constructor(data) {
        this.cardData = data;
    }
    async create() {
        const isBirthday = this.cardData.cardRarityType === "rarity_birthday";
        const isTrained = this.cardData.specialTrainingStatus === sekai_api_1.UserCardSpecialTrainingStatus.DONE;
        const rarity = parseInt(this.cardData.cardRarityType.slice(-1));
        const charImg = (0, sharp_1.default)(this.cardData.memberImage);
        const borderImg = await (0, sharp_1.default)(path_1.default.join(consts_1.ASSETS_PATH, isBirthday ? "cardFrame_S_bd.png" : `cardFrame_S_${rarity}.png`)).resize(128, 128, { fit: "fill" }).toBuffer();
        const rectImg = await (0, sharp_1.default)({
            create: {
                width: 128,
                height: 21,
                channels: 4,
                background: { r: 60, g: 60, b: 88 }
            }
        }).png().toBuffer();
        const starImg = await (0, sharp_1.default)(path_1.default.join(consts_1.ASSETS_PATH, isBirthday ? "rarity_birthday.png" : isTrained ? "rarity_star_afterTraining.png" : "rarity_star_normal.png")).resize(18, 18).toBuffer();
        const attributeImg = await (0, sharp_1.default)(path_1.default.join(consts_1.ASSETS_PATH, `icon_attribute_${this.cardData.attr}_64.png`)).resize(26, 28).toBuffer();
        const lvlText = await (0, sharp_1.default)({
            text: {
                text: `<span color="#FFFFFF">Lv.${this.cardData.level}</span>`,
                font: "FOT-RodinNTLG Pro DB",
                fontfile: path_1.default.join(consts_1.ASSETS_PATH, "font", "FOT-RodinNTLGPro-DB.otf"),
                rgba: true,
                dpi: 130
            }
        }).png().toBuffer();
        const composites = [
            { input: rectImg, left: 0, top: 102 },
            { input: borderImg, left: 0, top: 0 },
            { input: lvlText, left: 8, top: 104 },
            { input: attributeImg, left: 2, top: 0 }
        ];
        if (isBirthday) {
            composites.push({ input: starImg, left: 3, top: 83 });
        }
        else {
            for (let i = 0; i < rarity; i++) {
                composites.push({ input: starImg, left: 3 + i * 18, top: 83 });
            }
        }
        if (this.cardData.masteryRank > 0) {
            const mrImg = await (0, sharp_1.default)(path_1.default.join(consts_1.ASSETS_PATH, `masterRank_L_${this.cardData.masteryRank}.png`)).resize(44, 45).toBuffer();
            composites.push({ input: mrImg, left: 83, top: 83 });
        }
        return await charImg.composite(composites).toBuffer();
    }
}
exports.default = LeaderCardImage;
