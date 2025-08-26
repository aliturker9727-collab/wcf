"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emitter = void 0;
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
var Emitter;
(function (Emitter) {
    class Base extends tiny_typed_emitter_1.TypedEmitter {
        constructor(Messages) {
            super();
            Messages.forEach((Message) => {
                super.on(Message.Id, (Data, Socket) => {
                    try {
                        Message.Event(Data, Socket);
                    }
                    catch (error) {
                        console.error(`Error on handling event for ${Message.Id}:`, error);
                    }
                });
            });
        }
    }
    Emitter.Base = Base;
})(Emitter || (exports.Emitter = Emitter = {}));
