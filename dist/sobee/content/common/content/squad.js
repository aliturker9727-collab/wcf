"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Squad = void 0;
const lodash_1 = __importDefault(require("lodash"));
const messaging_1 = require("../../../../sobee/content/messaging");
class Squad {
    constructor(Value = 0) {
        this.Value = Value;
    }
    get value() {
        return this.Value;
    }
    set value(value) {
        this.Value = value;
    }
    toEntry(Splited) {
        const Squad = this.Value + 1;
        return Splited ? (Squad % 10) : Squad;
    }
    static inRange(Team, Value) {
        switch (Team) {
            case messaging_1.Messaging.Types.Enums.Sitting.HomePlayer:
                return lodash_1.default.inRange(Value, 0, 10);
            case messaging_1.Messaging.Types.Enums.Sitting.AwayPlayer:
                return lodash_1.default.inRange(Value, 11, 21);
            default:
                return false;
        }
    }
}
exports.Squad = Squad;
