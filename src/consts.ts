import path from "path";

export const ASSETS_PATH = path.join(__dirname, "..", "assets")

export enum UserCardSpecialTrainingStatus {
    DO_NOTHING = "not_doing",
    DONE = "done"
}