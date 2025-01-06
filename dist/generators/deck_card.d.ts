/// <reference types="node" />
/// <reference types="node" />
import { UserCard } from "sekai-api";
interface CardData {
    cardRarityType: "rarity_1" | "rarity_2" | "rarity_3" | "rarity_4" | "rarity_birthday";
    attr: "cool" | "cute" | "happy" | "mysterious" | "pure";
}
export default class DeckCardImage {
    private userCard;
    private cardData;
    private memberImage;
    private slot;
    constructor(userCard: UserCard, cardData: CardData, memberImage: Buffer, slot?: number);
    create(): Promise<Buffer>;
}
export {};
