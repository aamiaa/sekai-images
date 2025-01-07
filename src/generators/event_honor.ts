import path from "path"
import sharp from "sharp"
import { ASSETS_PATH } from "../consts"
import fs from "fs"

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
		
		let framePath = path.join(ASSETS_PATH, `frame_degree_m_${RarityMap[this.honorRarity]}.png`)
		if(this.frameName) {
			const newPath = path.join(ASSETS_PATH, `frame_degree_m_${RarityMap[this.honorRarity]}_${this.frameName}.png`)
			try {
				await fs.promises.stat(newPath)
				framePath = newPath
			} catch(ex) {}
		}

		const frameImg = await sharp(framePath).toBuffer()
		const rankImg = await sharp(this.rankImage).toBuffer()

		const frameComposite = {input: frameImg, left: this.honorRarity === "low" ? 8 : 0, top: 0}
		const rankComposite = this.frameName ? {input: rankImg, left: 0, top: 0} : {input: rankImg, left: 190, top: 1}
		
		const composites = [
			frameComposite,
			rankComposite
		]

		return await baseImg.composite(composites).toBuffer()
	}
}