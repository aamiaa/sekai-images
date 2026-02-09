import path from "path"
import sharp from "sharp"
import { ASSETS_PATH, UserCardSpecialTrainingStatus } from "../consts"

interface CardData {
	level: number,
	masteryRank: number,
	specialTrainingStatus: UserCardSpecialTrainingStatus,
	cardRarityType: "rarity_1" | "rarity_2" | "rarity_3" | "rarity_4" | "rarity_birthday",
	attr: "cool" | "cute" | "happy" | "mysterious" | "pure",
	memberImage: Buffer
}

export default class LeaderCardImage {
	private cardData: CardData

	constructor(data: CardData) {
		this.cardData = data
	}

	public async create({format, size}: {format: "png" | "webp", size?: number}) {
		const isBirthday = this.cardData.cardRarityType === "rarity_birthday"
		const isTrained = this.cardData.specialTrainingStatus === UserCardSpecialTrainingStatus.DONE
		const rarity = parseInt(this.cardData.cardRarityType.slice(-1))

		const charImg = sharp(this.cardData.memberImage)
		const borderImg = await sharp(path.join(ASSETS_PATH, isBirthday ? "cardFrame_S_bd.png" : `cardFrame_S_${rarity}.png`)).resize(128, 128, {fit: "fill"}).toBuffer()
		const rectImg = await sharp({
			create: {
				width: 128,
				height: 21,
				channels: 4,
				background: {r: 60, g: 60, b: 88}
			}
		}).png().toBuffer()
		const starImg = await sharp(path.join(ASSETS_PATH, isBirthday ? "rarity_birthday.png" : isTrained ? "rarity_star_afterTraining.png" : "rarity_star_normal.png")).resize(18, 18).toBuffer()
		const attributeImg = await sharp(path.join(ASSETS_PATH, `icon_attribute_${this.cardData.attr}_64.png`)).resize(26,28).toBuffer()
		const lvlText = await sharp({
			text: {
				text: `<span color="#FFFFFF">Lv.${this.cardData.level}</span>`,
				font: "FOT-RodinNTLG Pro EB",
				fontfile: path.join(ASSETS_PATH, "font", "FOT-RodinNTLGPro-EB.otf"),
				rgba: true,
				dpi: 115
			}
		}).png().toBuffer()

		const composites = [
			{input: rectImg, left: 0, top: 102},
			{input: borderImg, left: 0, top: 0},
			{input: lvlText, left: 8, top: 105},
			{input: attributeImg, left: 2, top: 0}
		]

		if(isBirthday) {
			composites.push({input: starImg, left: 3, top: 83})
		} else {
			for(let i=0;i<rarity;i++) {
				composites.push({input: starImg, left: 3 + i*18, top: 83})
			}
		}

		if(this.cardData.masteryRank > 0) {
			const mrImg = await sharp(path.join(ASSETS_PATH, `masterRank_L_${this.cardData.masteryRank}.png`)).resize(44, 45).toBuffer()
			composites.push({input: mrImg, left: 83, top: 83})
		}

		let result = charImg.composite(composites)
		if(size) {
			// This hack is needed as otherwise sharp complains about composite size
			result = sharp(await result.toBuffer()).resize(size)
		}
		if(format === "webp") {
			result = result.webp({nearLossless: true})
		}
		return await result.toBuffer()
	}
}