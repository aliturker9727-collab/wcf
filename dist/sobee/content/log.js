"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const tslog_1 = require("tslog");
exports.Log = new tslog_1.Logger({
    name: 'Sobee',
    prettyLogTemplate: '{{dateIsoStr}} {{logLevelName}} [{{name}}]: ',
});
