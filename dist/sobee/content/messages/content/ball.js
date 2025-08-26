"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ball = void 0;
const exports_1 = require("../../../../sobee/exports");
var Ball;
(function (Ball) {
    /** GClass212 */
    class Update extends exports_1.Messaging.Event.Base {
        constructor(Data) {
            super(Data);
            this.Content = Data;
        }
        static Deserialize(Data) {
            if (!(Data instanceof exports_1.Binary.Reader))
                throw new Error('Deserialize requires a Binary.Reader instance');
            return new Update({
                Position: Data.readVector3(),
                Velocity: Data.readVector3(),
            });
        }
        Serialize() {
            const Data = new exports_1.Binary.Writer();
            Data.writeVector3(this.Content.Position);
            Data.writeVector3(this.Content.Velocity);
            const Header = new exports_1.Binary.Writer();
            Header.writeUInt32(Data.Content.byteLength + 2);
            Header.writeUInt16(Update.Id);
            return Buffer.concat([Header.Content, Data.Content]);
        }
    }
    Update.Id = 11759;
    Update.Event = (Data) => {
        const Received = Update.Deserialize(Data);
        // console.log(Class.Id, Received.Content)
    };
    Ball.Update = Update;
    /** GClass191 */
    class Shoot extends exports_1.Messaging.Event.Base {
        constructor(Data) {
            super(Data);
            this.Content = Data;
        }
        static Deserialize(Data) {
            if (!(Data instanceof exports_1.Binary.Reader))
                throw new Error('Deserialize requires a Binary.Reader instance');
            return new Shoot({
                Animation: Data.readUInt16(),
                Squad: Data.readUInt8(),
                Position: Data.readVector2(),
                Direction: Data.readFloatVector2(),
                Velocity: Data.readVector3(),
                Speed: Data.readFloat(),
            });
        }
        Serialize() {
            const Data = new exports_1.Binary.Writer();
            Data.writeUInt16(this.Content.Animation);
            Data.writeUInt8(this.Content.Squad);
            Data.writeVector2(this.Content.Position);
            Data.writeFloatVector2(this.Content.Direction);
            Data.writeVector3(this.Content.Velocity);
            Data.writeFloat(this.Content.Speed);
            const Header = new exports_1.Binary.Writer();
            Header.writeUInt32(Data.Content.byteLength + 2);
            Header.writeUInt16(Shoot.Id);
            return Buffer.concat([Header.Content, Data.Content]);
        }
    }
    Shoot.Id = 23814;
    Shoot.Event = (Data) => {
        const Received = Shoot.Deserialize(Data);
        // console.log(Class.Id, Received.Content)
    };
    Ball.Shoot = Shoot;
    /** GClass195 */
    class Kickoff extends exports_1.Messaging.Event.Base {
        constructor(Data) {
            super(Data);
            this.Content = Data;
        }
        static Deserialize(Data) {
            if (!(Data instanceof exports_1.Binary.Reader))
                throw new Error('Deserialize requires a Binary.Reader instance');
            return new Kickoff({
                Animation: Data.readUInt16(),
                Velocity: Data.readVector3(),
            });
        }
        Serialize() {
            const Data = new exports_1.Binary.Writer();
            Data.writeUInt16(this.Content.Animation);
            Data.writeVector3(this.Content.Velocity);
            const Header = new exports_1.Binary.Writer();
            Header.writeUInt32(Data.Content.byteLength + 2);
            Header.writeUInt16(Kickoff.Id);
            return Buffer.concat([Header.Content, Data.Content]);
        }
    }
    Kickoff.Id = 15447;
    Kickoff.Event = (Data) => {
        const Received = Kickoff.Deserialize(Data);
        // console.log(Class.Id, Received.Content)
    };
    Ball.Kickoff = Kickoff;
    /** GClass282 */
    class Get extends exports_1.Messaging.Event.Base {
        constructor(Data) {
            super(Data);
            this.Content = Data;
        }
        static Deserialize(Data) {
            if (!(Data instanceof exports_1.Binary.Reader))
                throw new Error('Deserialize requires a Binary.Reader instance');
            return new Get({
                Squad: Data.readUInt8(),
                Position: Data.readVector2(),
                Direction: Data.readFloatVector2(),
                Speed: Data.readFloat(),
            });
        }
        Serialize() {
            const Data = new exports_1.Binary.Writer();
            Data.writeUInt8(this.Content.Squad);
            Data.writeVector2(this.Content.Position);
            Data.writeFloatVector2(this.Content.Direction);
            Data.writeFloat(this.Content.Speed);
            const Header = new exports_1.Binary.Writer();
            Header.writeUInt32(Data.Content.byteLength + 2);
            Header.writeUInt16(Get.Id);
            return Buffer.concat([Header.Content, Data.Content]);
        }
    }
    Get.Id = 11312;
    Get.Event = (Data) => {
        const Received = Get.Deserialize(Data);
        // console.log(Class.Id, Received.Content)
    };
    Ball.Get = Get;
})(Ball || (exports.Ball = Ball = {}));
