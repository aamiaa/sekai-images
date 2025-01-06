import path from "path"
import sharp from "sharp"
import { ASSETS_PATH } from "../consts"
import { UserCard, UserCardSpecialTrainingStatus } from "sekai-api"

interface CardData {
	cardRarityType: "rarity_1" | "rarity_2" | "rarity_3" | "rarity_4" | "rarity_birthday",
	attr: "cool" | "cute" | "happy" | "mysterious" | "pure"
}

export default class DeckCardImage {
	private userCard: UserCard
	private cardData: CardData
	private memberImage: Buffer
	private slot: number

	constructor(userCard: UserCard, cardData: CardData, memberImage: Buffer, slot?: number) {
		this.userCard = userCard
		this.cardData = cardData
		this.memberImage = memberImage
		this.slot = slot
	}

	public async create() {
		const isBirthday = this.cardData.cardRarityType === "rarity_birthday"
		const isLeader = this.slot === 0
		const isSubleader = this.slot === 1
		const isTrained = this.userCard.specialTrainingStatus === UserCardSpecialTrainingStatus.DONE
		const rarity = parseInt(this.cardData.cardRarityType.slice(-1))

		const charImg = sharp(this.memberImage)
		const borderImg = await sharp(path.join(ASSETS_PATH, isBirthday ? "cardFrame_M_bd.png" : `cardFrame_M_${rarity}.png`)).resize(320, 510, {fit: "fill"}).toBuffer()
		const rectImg = await sharp({
			create: {
				width: 320,
				height: 53,
				channels: 4,
				background: {r: 60, g: 60, b: 88}
			}
		}).png().toBuffer()
		const starImg = await sharp(path.join(ASSETS_PATH, isBirthday ? "rarity_birthday.png" : isTrained ? "rarity_star_afterTraining.png" : "rarity_star_normal.png")).resize(47, 47).toBuffer()
		const attributeImg = await sharp(path.join(ASSETS_PATH, `icon_attribute_${this.cardData.attr}_64.png`)).toBuffer()
		const lvlText = await sharp({
			text: {
				text: `<span color="#FFFFFF">Lv.${this.userCard.level}</span>`,
				font: "FOT-RodinNTLG Pro DB",
				fontfile: path.join(ASSETS_PATH, "font", "FOT-RodinNTLGPro-DB.otf"),
				rgba: true,
				dpi: 170
			}
		}).png().toBuffer()

		const composites = [
			{input: rectImg, left: 0, top: 456},
			{input: borderImg, left: 0, top: 0},
			{input: lvlText, left: 11, top: 470},
			{input: attributeImg, left: 11, top: 0}
		]

		if(isBirthday) {
			composites.push({input: starImg, left: 6, top: 401})
		} else {
			for(let i=0;i<rarity;i++) {
				composites.push({input: starImg, left: 6 + i*47, top: 401})
			}
		}

		if(this.userCard.masterRank > 0) {
			const mrImg = await sharp(path.join(ASSETS_PATH, `masterRank_L_${this.userCard.masterRank}.png`)).resize(78, 79).toBuffer()
			composites.push({input: mrImg, left: 241, top: 430})
		}

		if(isLeader || isSubleader) {
			const ribbonImg = await sharp(path.join(ASSETS_PATH, isLeader ? "label_mark_leader_L_pk.png" : "label_mark_subLeader_L_gr.png")).resize(175, 101).toBuffer()
			composites.push({input: ribbonImg, left: 145, top: 0})
		}

		return await charImg.composite(composites).toBuffer()
	}
}