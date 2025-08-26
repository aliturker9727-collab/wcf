"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sobee_1 = require("./sobee");
if (sobee_1.Sobee.Environment.Debug)
    sobee_1.Sobee.Log.info('Debug mode enabled');
const Hub = new sobee_1.Sobee.Network.Socket.Hub(sobee_1.Sobee.Environment.Port, [
    sobee_1.Sobee.Messages.Scenario.Control.Information,
    sobee_1.Sobee.Messages.Information,
    sobee_1.Sobee.Messages.GClass236,
    sobee_1.Sobee.Messages.GClass237,
    sobee_1.Sobee.Messages.GClass238,
    sobee_1.Sobee.Messages.GClass260,
]);
