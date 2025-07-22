import { UserCardSpecialTrainingStatus } from "../consts";
interface CardData {
    level: number;
    masteryRank: number;
    specialTrainingStatus: UserCardSpecialTrainingStatus;
    cardRarityType: "rarity_1" | "rarity_2" | "rarity_3" | "rarity_4" | "rarity_birthday";
    attr: "cool" | "cute" | "happy" | "mysterious" | "pure";
    slot: number;
    memberImage: Buffer;
}
export default class DeckCardImage {
    private cardData;
    constructor(data: CardData);
    create(): Promise<Buffer<ArrayBufferLike>>;
}
export {};
