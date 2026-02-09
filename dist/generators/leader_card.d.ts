import { UserCardSpecialTrainingStatus } from "../consts";
interface CardData {
    level: number;
    masteryRank: number;
    specialTrainingStatus: UserCardSpecialTrainingStatus;
    cardRarityType: "rarity_1" | "rarity_2" | "rarity_3" | "rarity_4" | "rarity_birthday";
    attr: "cool" | "cute" | "happy" | "mysterious" | "pure";
    memberImage: Buffer;
}
export default class LeaderCardImage {
    private cardData;
    constructor(data: CardData);
    create({ format, size }: {
        format: "png" | "webp";
        size?: number;
    }): Promise<Buffer>;
}
export {};
