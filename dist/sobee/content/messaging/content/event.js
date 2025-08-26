"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const exports_1 = require("../../../../sobee/exports");
var Event;
(function (Event) {
    class Base {
        constructor(Data) {
            this.Content = Data;
        }
        static Deserialize(Data) {
            throw new Error('Deserialization not implemented');
        }
        Serialize() {
            throw new Error('Serialization not implemented');
        }
    }
    Base.Event = () => {
        throw new Error('Event not implemented');
    };
    Event.Base = Base;
    class Parser {
        constructor(Data) {
            this.Size = Data.readUInt32LE(0);
            this.Id = Data.readUInt16LE(4);
            this.Content = new exports_1.Binary.Reader(Data.subarray(6, this.Size + 6));
        }
    }
    Event.Parser = Parser;
})(Event || (exports.Event = Event = {}));
