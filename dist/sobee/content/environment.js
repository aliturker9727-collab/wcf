"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
const env_var_1 = require("env-var");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Env = (0, env_var_1.from)(process.env, {});
exports.Environment = {
    Debug: Env.get('DEBUG').required().asBool(),
    Port: Env.get('PORT').required().asPortNumber(),
    Fps: Env.get('FPS').required().asInt(),
};
