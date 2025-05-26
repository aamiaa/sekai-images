import path from "path"
import sharp from "sharp"
import { ASSETS_PATH } from "../consts"
import { UserCardSpecialTrainingStatus } from "sekai-api"

interface CardData {
	level: number,
	masteryRank: number,
	specialTrainingStatus: UserCardSpecialTrainingStatus,
	cardRarityType: "rarity_1" | "rarity_2" | "rarity_3" | "rarity_4" | "rarity_birthday",
	attr: "cool" | "cute" | "happy" | "mysterious" | "pure",
	slot: number,
	memberImage: Buffer
}

export default class DeckCardImage {
	private cardData: CardData

	constructor(data: CardData) {
		this.cardData = data
	}

	public async create() {
		const isBirthday = this.cardData.cardRarityType === "rarity_birthday"
		const isLeader = this.cardData.slot === 0
		const isSubleader = this.cardData.slot === 1
		const isTrained = this.cardData.specialTrainingStatus === UserCardSpecialTrainingStatus.DONE
		const rarity = parseInt(this.cardData.cardRarityType.slice(-1))

		const charImg = sharp(this.cardData.memberImage).resize(312, 510)
		const borderImg = await sharp(path.join(ASSETS_PATH, isBirthday ? "cardFrame_M_bd.png" : `cardFrame_M_${rarity}.png`)).resize(312, 510, {fit: "fill"}).toBuffer()
		const rectImg = await sharp({
			create: {
				width: 312,
				height: 54,
				channels: 4,
				background: {r: 60, g: 60, b: 88}
			}
		}).png().toBuffer()
		const starImg = await sharp(path.join(ASSETS_PATH, isBirthday ? "rarity_birthday.png" : isTrained ? "rarity_star_afterTraining.png" : "rarity_star_normal.png")).resize(44, 44).toBuffer()
		const attributeImg = await sharp(path.join(ASSETS_PATH, `icon_attribute_${this.cardData.attr}_64.png`)).toBuffer()
		const lvlText = await sharp({
			text: {
				text: `<span color="#FFFFFF">Lv.${this.cardData.level}</span>`,
				font: "FOT-RodinNTLG Pro EB",
				fontfile: path.join(ASSETS_PATH, "font", "FOT-RodinNTLGPro-EB.otf"),
				rgba: true,
				dpi: 170
			}
		}).png().toBuffer()

		const composites = [
			{input: rectImg, left: 0, top: 455},
			{input: borderImg, left: 0, top: 0},
			{input: lvlText, left: 15, top: 470},
			{input: attributeImg, left: 10, top: 0}
		]

		if(isBirthday) {
			composites.push({input: starImg, left: 7, top: 405})
		} else {
			for(let i=0;i<rarity;i++) {
				composites.push({input: starImg, left: 7 + i*44, top: 405})
			}
		}

		if(this.cardData.masteryRank > 0) {
			const mrImg = await sharp(path.join(ASSETS_PATH, `masterRank_L_${this.cardData.masteryRank}.png`)).resize(78, 79).toBuffer()
			composites.push({input: mrImg, left: 232, top: 430})
		}

		if(isLeader || isSubleader) {
			const ribbonImg = await sharp(path.join(ASSETS_PATH, isLeader ? "label_mark_leader_L_pk.png" : "label_mark_subLeader_L_gr.png")).resize(162, 93).toBuffer()
			composites.push({input: ribbonImg, left: 150, top: 0})
		}

		return await charImg.composite(composites).toBuffer()
	}
}