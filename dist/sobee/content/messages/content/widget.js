"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Widget = void 0;
const exports_1 = require("../../../../sobee/exports");
const messaging_1 = require("../../../../sobee/content/messaging");
var Widget;
(function (Widget) {
    /** GClass223 */
    class Decline extends messaging_1.Messaging.Event.Base {
        constructor(Data) {
            super(Data);
            this.Content = Data;
        }
        static Deserialize(Data) {
            if (!(Data instanceof exports_1.Binary.Reader))
                throw new Error('Deserialize requires a Binary.Reader instance');
            return new Decline({
                Reason: Data.readInt32(),
            });
        }
        Serialize() {
            const Data = new exports_1.Binary.Writer();
            Data.writeInt32(this.Content.Reason);
            const Header = new exports_1.Binary.Writer();
            Header.writeUInt32(Data.Content.byteLength + 2);
            Header.writeUInt16(Decline.Id);
            return Buffer.concat([Header.Content, Data.Content]);
        }
    }
    Decline.Id = 11408;
    Decline.Event = (Data) => {
        const Received = Decline.Deserialize(Data);
        // console.log(Class.Id, Received.Content)
    };
    Widget.Decline = Decline;
})(Widget || (exports.Widget = Widget = {}));
