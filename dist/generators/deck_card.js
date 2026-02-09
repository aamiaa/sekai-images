"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const consts_1 = require("../consts");
class DeckCardImage {
    cardData;
    constructor(data) {
        this.cardData = data;
    }
    async create({ format, size }) {
        const isBirthday = this.cardData.cardRarityType === "rarity_birthday";
        const isLeader = this.cardData.slot === 0;
        const isSubleader = this.cardData.slot === 1;
        const isTrained = this.cardData.specialTrainingStatus === consts_1.UserCardSpecialTrainingStatus.DONE;
        const rarity = parseInt(this.cardData.cardRarityType.slice(-1));
        const charImg = (0, sharp_1.default)(this.cardData.memberImage).resize(312, 510);
        const borderImg = await (0, sharp_1.default)(path_1.default.join(consts_1.ASSETS_PATH, isBirthday ? "cardFrame_M_bd.png" : `cardFrame_M_${rarity}.png`)).resize(312, 510, { fit: "fill" }).toBuffer();
        const rectImg = await (0, sharp_1.default)({
            create: {
                width: 312,
                height: 54,
                channels: 4,
                background: { r: 60, g: 60, b: 88 }
            }
        }).png().toBuffer();
        const starImg = await (0, sharp_1.default)(path_1.default.join(consts_1.ASSETS_PATH, isBirthday ? "rarity_birthday.png" : isTrained ? "rarity_star_afterTraining.png" : "rarity_star_normal.png")).resize(44, 44).toBuffer();
        const attributeImg = await (0, sharp_1.default)(path_1.default.join(consts_1.ASSETS_PATH, `icon_attribute_${this.cardData.attr}_64.png`)).toBuffer();
        const lvlText = await (0, sharp_1.default)({
            text: {
                text: `<span color="#FFFFFF">Lv.${this.cardData.level}</span>`,
                font: "FOT-RodinNTLG Pro EB",
                fontfile: path_1.default.join(consts_1.ASSETS_PATH, "font", "FOT-RodinNTLGPro-EB.otf"),
                rgba: true,
                dpi: 170
            }
        }).png().toBuffer();
        const composites = [
            { input: rectImg, left: 0, top: 455 },
            { input: borderImg, left: 0, top: 0 },
            { input: lvlText, left: 15, top: 470 },
            { input: attributeImg, left: 10, top: 0 }
        ];
        if (isBirthday) {
            composites.push({ input: starImg, left: 7, top: 405 });
        }
        else {
            for (let i = 0; i < rarity; i++) {
                composites.push({ input: starImg, left: 7 + i * 44, top: 405 });
            }
        }
        if (this.cardData.masteryRank > 0) {
            const mrImg = await (0, sharp_1.default)(path_1.default.join(consts_1.ASSETS_PATH, `masterRank_L_${this.cardData.masteryRank}.png`)).resize(78, 79).toBuffer();
            composites.push({ input: mrImg, left: 232, top: 430 });
        }
        if (isLeader || isSubleader) {
            const ribbonImg = await (0, sharp_1.default)(path_1.default.join(consts_1.ASSETS_PATH, isLeader ? "label_mark_leader_L_pk.png" : "label_mark_subLeader_L_gr.png")).resize(162, 93).toBuffer();
            composites.push({ input: ribbonImg, left: 150, top: 0 });
        }
        let result = charImg.composite(composites);
        if (size) {
            // This hack is needed as otherwise sharp complains about composite size
            result = (0, sharp_1.default)(await result.toBuffer()).resize(size);
        }
        if (format === "webp") {
            result = result.webp({ nearLossless: true });
        }
        return await result.toBuffer();
    }
}
exports.default = DeckCardImage;
