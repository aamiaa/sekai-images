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

export class EventHonorImage {
	public backgroundImage: Buffer
	public rankImage: Buffer
	public frameImage?: Buffer
	public honorRarity: HonorRarity
	public isWorldlinkChapter?: boolean

	constructor({backgroundImage, rankImage, frameImage, honorRarity, isWorldlinkChapter}: {backgroundImage: Buffer, rankImage: Buffer, frameImage?: Buffer, honorRarity: HonorRarity, isWorldlinkChapter?: boolean}) {
		this.backgroundImage = backgroundImage
		this.rankImage = rankImage
		this.frameImage = frameImage
		this.honorRarity = honorRarity
		this.isWorldlinkChapter = isWorldlinkChapter
	}

	public async create({format, size}: {format: "png" | "webp", size?: number}) {
		const baseImg = sharp(this.backgroundImage).resize(380, 80, {fit: "fill"})
		
		const framePath = path.join(ASSETS_PATH, `frame_degree_m_${RarityMap[this.honorRarity]}.png`)

		const frameImg = this.frameImage ? await sharp(this.frameImage).toBuffer() : await sharp(framePath).toBuffer()
		const rankImg = await sharp(this.rankImage).toBuffer()

		const frameComposite = {input: frameImg, left: this.honorRarity === "low" ? 8 : 0, top: 0}
		const rankComposite = this.isWorldlinkChapter ? {input: rankImg, left: 0, top: 0} : {input: rankImg, left: 190, top: 1}
		
		const composites = [
			frameComposite,
			rankComposite
		]

		let result = baseImg.composite(composites)
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

export class EventHonorSubImage {
	public backgroundImage: Buffer
	public rankImage: Buffer
	public frameImage?: Buffer
	public honorRarity: HonorRarity
	public isWorldlinkChapter?: boolean

	constructor({backgroundImage, rankImage, frameImage, honorRarity, isWorldlinkChapter}: {backgroundImage: Buffer, rankImage: Buffer, frameImage?: Buffer, honorRarity: HonorRarity, isWorldlinkChapter?: boolean}) {
		this.backgroundImage = backgroundImage
		this.rankImage = rankImage
		this.frameImage = frameImage
		this.honorRarity = honorRarity
		this.isWorldlinkChapter = isWorldlinkChapter
	}

	public async create({format, size}: {format: "png" | "webp", size?: number}) {
		const baseImg = sharp(this.backgroundImage).resize(180, 80, {fit: "fill"})
		
		const framePath = path.join(ASSETS_PATH, `frame_degree_s_${RarityMap[this.honorRarity]}.png`)

		const frameImg = this.frameImage ? await sharp(this.frameImage).toBuffer() : await sharp(framePath).toBuffer()
		const rankImg = await sharp(this.rankImage).toBuffer()

		const frameComposite = {input: frameImg, left: this.honorRarity === "low" ? 8 : 0, top: 0}
		const rankComposite = this.isWorldlinkChapter ? {input: rankImg, left: 0, top: 0} : {input: rankImg, left: 30, top: 42}
		
		const composites = [
			frameComposite,
			rankComposite
		]

		let result = baseImg.composite(composites)
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