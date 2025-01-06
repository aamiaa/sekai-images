import path from "path"
import sharp from "sharp"
import { ASSETS_PATH } from "../consts"

type HonorRarity = "highest" | "high" | "middle" | "low"

const RarityMap = {
	"highest": 4,
	"high": 3,
	"middle": 2,
	"low": 1
}

export default class EventHonorImage {
	public backgroundImage: Buffer
	public rankImage: Buffer
	public honorRarity: HonorRarity
	public frameName: string

	constructor({backgroundImage, rankImage, honorRarity, frameName}: {backgroundImage: Buffer, rankImage: Buffer, honorRarity: HonorRarity, frameName?: string}) {
		this.backgroundImage = backgroundImage
		this.rankImage = rankImage
		this.honorRarity = honorRarity
		this.frameName = frameName
	}

	public async create() {
		const baseImg = sharp(this.backgroundImage).resize(380, 80, {fit: "fill"})
		const frameImg = await sharp(path.join(ASSETS_PATH, `frame_degree_m_${RarityMap[this.honorRarity]}${this.frameName ? "_" + this.frameName : ""}.png`)).toBuffer()
		const rankImg = await sharp(this.rankImage).toBuffer()

		const rankComposite = this.frameName ? {input: rankImg, left: 0, top: 0} : {input: rankImg, left: 190, top: 1}
		
		const composites = [
			{input: frameImg, left: 0, top: 0},
			rankComposite
		]

		return await baseImg.composite(composites).toBuffer()
	}
}