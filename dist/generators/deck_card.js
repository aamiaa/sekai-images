"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const consts_1 = require("../consts");
const sekai_api_1 = require("sekai-api");
class DeckCardImage {
    userCard;
    cardData;
    memberImage;
    slot;
    constructor(userCard, cardData, memberImage, slot) {
        this.userCard = userCard;
        this.cardData = cardData;
        this.memberImage = memberImage;
        this.slot = slot;
    }
    async create() {
        const isBirthday = this.cardData.cardRarityType === "rarity_birthday";
        const isLeader = this.slot === 0;
        const isSubleader = this.slot === 1;
        const isTrained = this.userCard.specialTrainingStatus === sekai_api_1.UserCardSpecialTrainingStatus.DONE;
        const rarity = parseInt(this.cardData.cardRarityType.slice(-1));
        const charImg = (0, sharp_1.default)(this.memberImage);
        const borderImg = await (0, sharp_1.default)(path_1.default.join(consts_1.ASSETS_PATH, isBirthday ? "cardFrame_M_bd.png" : `cardFrame_M_${rarity}.png`)).resize(320, 510, { fit: "fill" }).toBuffer();
        const rectImg = await (0, sharp_1.default)({
            create: {
                width: 320,
                height: 53,
                channels: 4,
                background: { r: 60, g: 60, b: 88 }
            }
        }).png().toBuffer();
        const starImg = await (0, sharp_1.default)(path_1.default.join(consts_1.ASSETS_PATH, isBirthday ? "rarity_birthday.png" : isTrained ? "rarity_star_afterTraining.png" : "rarity_star_normal.png")).resize(47, 47).toBuffer();
        const attributeImg = await (0, sharp_1.default)(path_1.default.join(consts_1.ASSETS_PATH, `icon_attribute_${this.cardData.attr}_64.png`)).toBuffer();
        const lvlText = await (0, sharp_1.default)({
            text: {
                text: `<span color="#FFFFFF">Lv.${this.userCard.level}</span>`,
                font: "FOT-RodinNTLG Pro DB",
                fontfile: path_1.default.join(consts_1.ASSETS_PATH, "font", "FOT-RodinNTLGPro-DB.otf"),
                rgba: true,
                dpi: 170
            }
        }).png().toBuffer();
        const composites = [
            { input: rectImg, left: 0, top: 456 },
            { input: borderImg, left: 0, top: 0 },
            { input: lvlText, left: 11, top: 470 },
            { input: attributeImg, left: 11, top: 0 }
        ];
        if (isBirthday) {
            composites.push({ input: starImg, left: 6, top: 401 });
        }
        else {
            for (let i = 0; i < rarity; i++) {
                composites.push({ input: starImg, left: 6 + i * 47, top: 401 });
            }
        }
        if (this.userCard.masterRank > 0) {
            const mrImg = await (0, sharp_1.default)(path_1.default.join(consts_1.ASSETS_PATH, `masterRank_L_${this.userCard.masterRank}.png`)).resize(78, 79).toBuffer();
            composites.push({ input: mrImg, left: 241, top: 430 });
        }
        if (isLeader || isSubleader) {
            const ribbonImg = await (0, sharp_1.default)(path_1.default.join(consts_1.ASSETS_PATH, isLeader ? "label_mark_leader_L_pk.png" : "label_mark_subLeader_L_gr.png")).resize(175, 101).toBuffer();
            composites.push({ input: ribbonImg, left: 145, top: 0 });
        }
        return await charImg.composite(composites).toBuffer();
    }
}
exports.default = DeckCardImage;
