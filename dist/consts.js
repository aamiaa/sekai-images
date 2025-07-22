"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCardSpecialTrainingStatus = exports.ASSETS_PATH = void 0;
const path_1 = __importDefault(require("path"));
exports.ASSETS_PATH = path_1.default.join(__dirname, "..", "assets");
var UserCardSpecialTrainingStatus;
(function (UserCardSpecialTrainingStatus) {
    UserCardSpecialTrainingStatus["DO_NOTHING"] = "not_doing";
    UserCardSpecialTrainingStatus["DONE"] = "done";
})(UserCardSpecialTrainingStatus || (exports.UserCardSpecialTrainingStatus = UserCardSpecialTrainingStatus = {}));
