"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const exports_1 = require("../../../../sobee/exports");
var Chat;
(function (Chat) {
    let System;
    (function (System) {
        let Type;
        (function (Type) {
            Type[Type["General"] = 0] = "General";
            Type[Type["Important"] = 1] = "Important";
            Type[Type["SCT"] = 2] = "SCT";
            Type[Type["Anounce"] = 3] = "Anounce";
            Type[Type["Log"] = 4] = "Log";
        })(Type = System.Type || (System.Type = {}));
        /** GClass278 */
        class Send extends exports_1.Messaging.Event.Base {
            constructor(Data) {
                super(Data);
                this.Content = Data;
            }
            static Deserialize(Data) {
                if (!(Data instanceof exports_1.Binary.Reader))
                    throw new Error('Deserialize requires a Binary.Reader instance');
                return new Send({
                    Text: Data.readString(),
                    Type: Data.readInt32(),
                });
            }
            Serialize() {
                const Data = new exports_1.Binary.Writer();
                Data.writeString(this.Content.Text);
                Data.writeInt32(this.Content.Type);
                const Header = new exports_1.Binary.Writer();
                Header.writeUInt32(Data.Content.byteLength + 2);
                Header.writeUInt16(Send.Id);
                return Buffer.concat([Header.Content, Data.Content]);
            }
        }
        Send.Id = 39592;
        Send.Event = (Data) => {
            const Received = Send.Deserialize(Data);
            // console.log(Class.Id, Received.Content)
        };
        System.Send = Send;
    })(System = Chat.System || (Chat.System = {}));
})(Chat || (exports.Chat = Chat = {}));
