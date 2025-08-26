"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entry = void 0;
const lodash_1 = __importDefault(require("lodash"));
class Entry {
    constructor(Value = 0) {
        this.Value = Value;
    }
    get value() {
        return this.Value;
    }
    set value(value) {
        this.Value = value;
    }
    toSquad(Splited) {
        const Squad = this.Value - 1;
        return Splited ? (Squad % 11) : Squad;
    }
    static inRange(Value) {
        return lodash_1.default.inRange(Value, 1, 22);
    }
}
exports.Entry = Entry;
