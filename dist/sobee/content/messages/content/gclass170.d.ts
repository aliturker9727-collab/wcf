import { Binary, type Messages, Messaging } from '../../../../sobee/exports';
export declare class GClass170 extends Messaging.Event.Base {
    static readonly Id = 30546;
    Content: {
        Unk0: number;
        Unk1: boolean;
        Team1Color: number;
        Unk2: number;
        Team2Color: number;
        Unk3: number;
        Unk4: number;
        Unk5: number;
        Unk6: number;
        Unk7: string;
        Scenario: Messages.Scenario.Type;
        Team1Size: number;
        Team2Size: number;
        Team1Name: string;
        Team2Name: string;
        Team1Short: string;
        Team2Short: string;
        Unk8: string;
        Unk9: string;
        Invite: boolean;
        Unk11: number;
        Unk12: number;
        Unk13: number;
        Unk14: number;
        Unk15: number;
        Unk16: number;
        Unk17: number;
        Unk18: number;
        Unk19: number;
        GZipBool: boolean;
        XmlCode: string;
    };
    constructor(Data: typeof GClass170.prototype.Content);
    static Deserialize(Data: Binary.Reader): GClass170;
    Serialize(): Buffer;
    static Event: Messaging.Emitter.Listener;
    static Default(Scenario: Messages.Scenario.Type, Teams: {
        Home: {
            Color: number;
            Size: number;
            Name: {
                Full: string;
                Short: string;
            };
        };
        Away: {
            Color: number;
            Size: number;
            Name: {
                Full: string;
                Short: string;
            };
        };
    }): GClass170;
}
