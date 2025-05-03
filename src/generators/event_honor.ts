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

export class EventHonorImage {
	public backgroundImage: Buffer
	public rankImage: Buffer
	public frameImage?: Buffer
	public honorRarity: HonorRarity
	public isWorldLink?: boolean

	constructor({backgroundImage, rankImage, frameImage, honorRarity, isWorldLink}: {backgroundImage: Buffer, rankImage: Buffer, frameImage?: Buffer, honorRarity: HonorRarity, isWorldLink?: boolean}) {
		this.backgroundImage = backgroundImage
		this.rankImage = rankImage
		this.frameImage = frameImage
		this.honorRarity = honorRarity
		this.isWorldLink = isWorldLink
	}

	public async create() {
		const baseImg = sharp(this.backgroundImage).resize(380, 80, {fit: "fill"})
		
		const framePath = path.join(ASSETS_PATH, `frame_degree_m_${RarityMap[this.honorRarity]}.png`)

		const frameImg = this.frameImage ? await sharp(this.frameImage).toBuffer() : await sharp(framePath).toBuffer()
		const rankImg = await sharp(this.rankImage).toBuffer()

		const frameComposite = {input: frameImg, left: this.honorRarity === "low" ? 8 : 0, top: 0}
		const rankComposite = this.isWorldLink ? {input: rankImg, left: 0, top: 0} : {input: rankImg, left: 190, top: 1}
		
		const composites = [
			frameComposite,
			rankComposite
		]

		return await baseImg.composite(composites).toBuffer()
	}
}

export class EventHonorSubImage {
	public backgroundImage: Buffer
	public rankImage: Buffer
	public frameImage?: Buffer
	public honorRarity: HonorRarity
	public isWorldLink?: boolean

	constructor({backgroundImage, rankImage, frameImage, honorRarity, isWorldLink}: {backgroundImage: Buffer, rankImage: Buffer, frameImage?: Buffer, honorRarity: HonorRarity, isWorldLink?: boolean}) {
		this.backgroundImage = backgroundImage
		this.rankImage = rankImage
		this.frameImage = frameImage
		this.honorRarity = honorRarity
		this.isWorldLink = isWorldLink
	}

	public async create() {
		const baseImg = sharp(this.backgroundImage).resize(180, 80, {fit: "fill"})
		
		const framePath = path.join(ASSETS_PATH, `frame_degree_s_${RarityMap[this.honorRarity]}.png`)

		const frameImg = this.frameImage ? await sharp(this.frameImage).toBuffer() : await sharp(framePath).toBuffer()
		const rankImg = await sharp(this.rankImage).toBuffer()

		const frameComposite = {input: frameImg, left: this.honorRarity === "low" ? 8 : 0, top: 0}
		const rankComposite = this.isWorldLink ? {input: rankImg, left: 0, top: 0} : {input: rankImg, left: 30, top: 42}
		
		const composites = [
			frameComposite,
			rankComposite
		]

		return await baseImg.composite(composites).toBuffer()
	}
}